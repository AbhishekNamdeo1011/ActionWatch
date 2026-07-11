import { lazy, Suspense, useState } from "react";
import { useParams } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useIncident } from "@/hooks/useIncident";
import { useTimeline } from "@/hooks/useTimeline";
import { useGenerateRootCause } from "@/hooks/useGenerateRootCause";
import { useGeneratePostmortem } from "@/hooks/useGeneratePostmortem";

import PageLoader from "@/components/common/PageLoader";

const WarRoomHeader = lazy(() =>
    import("@/components/war-room/WarRoomHeader")
);

const CommandCenterCard = lazy(() =>
    import("@/components/war-room/CommandCenterCard")
);

const ServiceHealthCard = lazy(() =>
    import("@/components/war-room/ServiceHealthCard")
);

const TimelineCard = lazy(() =>
    import("@/components/war-room/TimelineCard")
);

const RespondersCard = lazy(() =>
    import("@/components/war-room/RespondersCard")
);

const LiveLogsCard = lazy(() =>
    import("@/components/war-room/LiveLogsCard")
);

const AIAnalysisCard = lazy(() =>
    import("@/components/war-room/AIAnalysisCard")
);

const ResolveIncidentCard = lazy(() =>
    import("@/components/war-room/ResolveIncidentCard")
);

const WarRoom = () => {

    const { incidentId } = useParams();

    const queryClient = useQueryClient();

    const [assignOpen, setAssignOpen] = useState(false);

    const {

        data: incident,

        isLoading,

    } = useIncident(incidentId);

    const {

        data: timeline = [],

    } = useTimeline(incidentId);

    const generateRootCause = useGenerateRootCause();

    const generatePostmortem = useGeneratePostmortem();

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

    if (isLoading) {

        return <PageLoader />;

    }

    return (

        <Suspense fallback={<PageLoader />}>

            <div className="space-y-6">

                {/* ================= Header ================= */}

                <WarRoomHeader incident={incident} />

                {/* ================= Command Center ================= */}

                <div className="grid gap-6 xl:grid-cols-3">

                    <CommandCenterCard

                        onAssign={() => setAssignOpen(true)}

                        onGenerateAI={handleGenerateAI}

                        onGeneratePostmortem={handleGeneratePostmortem}

                        onRefresh={handleRefresh}

                    />

                    <div className="xl:col-span-2">

                        <TimelineCard

                            timeline={timeline}

                        />

                    </div>

                </div>

                {/* ================= Service + AI ================= */}

                <div className="grid gap-6 xl:grid-cols-2">

                    <ServiceHealthCard

                        incident={incident}

                    />

                    <AIAnalysisCard

                        incident={incident}

                    />

                </div>

                {/* ================= Responders ================= */}

                <RespondersCard

                    responders={incident.assignedTo}

                />

                {/* ================= Logs ================= */}

                <LiveLogsCard

                    logs={incident.errorLogs}

                />

                {/* ================= Resolve ================= */}

                <ResolveIncidentCard

                    incident={incident}

                />

                {/*
                ==========================================
                Assign Responder Modal
                Uncomment once integrated
                ==========================================

                <AssignResponderModal
                    open={assignOpen}
                    onClose={() => setAssignOpen(false)}
                    incident={incident}
                />
                */}

            </div>

        </Suspense>

    );

};

export default WarRoom;