import { lazy, Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "@/hooks/auth/useAuth";
import useSocket from "@/hooks/useSocket";

import { useIncident } from "@/hooks/incidents/useIncident";
import { useTimeline } from "@/hooks/useTimeline";
import { useSimilarIncidents } from "@/hooks/similarIncidents/useSimilarIncidents";
import { usePostmortem } from "@/hooks/postmortem/usePostmortem";

import { useGenerateRootCause } from "@/hooks/ai/useGenerateRootCause";
import { useGeneratePostmortem } from "@/hooks/postmortem/useGeneratePostmortem";

import AssignResponderModal from "@/components/responders/AssignResponderModal";
import WarRoomSkeleton from "@/components/skeletons/WarRoomSkeleton";

const WarRoomHeader = lazy(() =>
    import("@/components/war-room/WarRoomHeader")
);

const CommandCenterCard = lazy(() =>
    import("@/components/war-room/CommandCenterCard")
);

const TimelineCard = lazy(() =>
    import("@/components/war-room/TimelineCard")
);

const ServiceHealthCard = lazy(() =>
    import("@/components/war-room/ServiceHealthCard")
);

const AIAnalysisCard = lazy(() =>
    import("@/components/war-room/AIAnalysisCard")
);

const PostmortemCard = lazy(() =>
    import("@/components/war-room/PostmortemCard")
);

const RespondersCard = lazy(() =>
    import("@/components/war-room/RespondersCard")
);

const SimilarIncidentsCard = lazy(() =>
    import("@/components/war-room/SimilarIncidentsCard")
);

const LiveLogsCard = lazy(() =>
    import("@/components/war-room/LiveLogsCard")
);

const ResolveIncidentCard = lazy(() =>
    import("@/components/war-room/ResolveIncidentCard")
);

const WarRoom = () => {

    const { incidentId } = useParams();

    const { user } = useAuth();

    const queryClient = useQueryClient();

    const [assignOpen, setAssignOpen] = useState(false);

    /*
    ==========================================
    Socket Helpers
    ==========================================
    */

    const refreshIncident = () => {

        queryClient.invalidateQueries({

            queryKey: ["incident", incidentId],

        });

    };

    useSocket("incident:updated", () => {

        refreshIncident();

        toast.info("Incident updated.");

    });

    useSocket("incident:ai-generated", () => {

        refreshIncident();

        toast.success("AI analysis completed.");

    });

    useSocket("timeline:created", () => {

        queryClient.invalidateQueries({

            queryKey: ["timeline", incidentId],

        });

        toast.success("New timeline activity.");

    });

    useSocket("postmortem:generated", () => {

        queryClient.invalidateQueries({

            queryKey: ["postmortem", incidentId],

        });

        toast.success("AI Postmortem generated.");

    });

    /*
    ==========================================
    Queries
    ==========================================
    */

    const {

        data: incident,

        isLoading,

    } = useIncident(incidentId);

    const {

        data: timeline = [],

    } = useTimeline(incidentId);

    const {

        data: similarIncidents = [],

    } = useSimilarIncidents(incidentId);

    const {

        data: postmortem,

    } = usePostmortem(incidentId);

    /*
    ==========================================
    AI Mutations
    ==========================================
    */

    const generateRootCause = useGenerateRootCause();

    const generatePostmortem = useGeneratePostmortem();

    /*
    ==========================================
    Actions
    ==========================================
    */

    const handleRefresh = async () => {

        await Promise.all([

            queryClient.invalidateQueries({

                queryKey: ["incident", incidentId],

            }),

            queryClient.invalidateQueries({

                queryKey: ["timeline", incidentId],

            }),

        ]);

        toast.success("War Room refreshed.");

    };

    const handleGenerateAI = () => {

        generateRootCause.mutate(incidentId);

    };

    const handleGeneratePostmortem = () => {

        generatePostmortem.mutate(incidentId);

    };

    /*
    ==========================================
    Loading
    ==========================================
    */

    if (isLoading) {

        return <WarRoomSkeleton />;

    }

    /*
    ==========================================
    UI
    ==========================================
    */

    return (

        <Suspense fallback={<WarRoomSkeleton />}>

            <div className="space-y-6">

                {/* Header */}

                <WarRoomHeader incident={incident} />

                {/* Command Center */}

         <div className="space-y-6">

    {

        user?.role !== "viewer" && (

            <CommandCenterCard

                incident={incident}

                onAssign={() => setAssignOpen(true)}

                onGenerateAI={handleGenerateAI}

                onGeneratePostmortem={handleGeneratePostmortem}

                onRefresh={handleRefresh}

                generatingAI={generateRootCause.isPending}

                generatingPostmortem={generatePostmortem.isPending}

            />

        )

    }

    <TimelineCard

        timeline={timeline}

        incidentId={incidentId}

    />

</div>

                {/* Service + AI */}

    <div className="flex flex-col gap-6">
    <ServiceHealthCard incident={incident} />
    <AIAnalysisCard incident={incident} />
    <PostmortemCard postmortem={postmortem} />
</div>

                {/* Responders */}

                <RespondersCard

                    responders={incident?.assignedTo || []}

                    incidentId={incident?._id}

                />

                {/* Similar Incidents */}

                <SimilarIncidentsCard

                    incidents={similarIncidents}

                />

                {/* Logs */}

                <LiveLogsCard

                    logs={incident?.errorLogs}

                />

                {/* Resolve */}

                {

                    user?.role !== "viewer" && (

                        <ResolveIncidentCard

                            incident={incident}

                        />

                    )

                }

                {/* Assign Modal */}

                <AssignResponderModal

                    open={assignOpen}

                    onClose={() => setAssignOpen(false)}

                    incident={incident}

                />

            </div>

        </Suspense>

    );

};

export default WarRoom;