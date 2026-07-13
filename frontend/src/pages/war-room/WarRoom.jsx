import { lazy, Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { socket } from "@/lib/socket";
import { useEffect } from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import useSocket from "@/hooks/sockets/useSocket";

import { useIncident } from "@/hooks/incidents/useIncident";
import { useTimeline } from "@/hooks/timeline/useTimeline";
import { useSimilarIncidents } from "@/hooks/similarIncidents/useSimilarIncidents";
import { usePostmortem } from "@/hooks/postmortem/usePostmortem";

import { useGenerateRootCause } from "@/hooks/ai/useGenerateRootCause";
import { useGeneratePostmortem } from "@/hooks/postmortem/useGeneratePostmortem";

import WarRoomSkeleton from "@/components/skeletons/WarRoomSkeleton";

import WarRoomHeader from "@/components/war-room/WarRoomHeader";
import CommandCenterCard from "@/components/war-room/CommandCenterCard";
import TimelineCard from "@/components/war-room/TimelineCard";
import ServiceHealthCard from "@/components/war-room/ServiceHealthCard";
import AIAnalysisCard from "@/components/war-room/AIAnalysisCard";
import PostmortemCard from "@/components/war-room/PostmortemCard";
import RespondersCard from "@/components/war-room/RespondersCard";
import SimilarIncidentsCard from "@/components/war-room/SimilarIncidentsCard";
import LiveLogsCard from "@/components/war-room/LiveLogsCard";
import ResolveIncidentCard from "@/components/war-room/ResolveIncidentCard";

const AssignResponderModal = lazy(
  () => import("@/components/responders/AssignResponderModal"),
);





const WarRoom = () => {
  

  const { incidentId } = useParams();

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const [assignOpen, setAssignOpen] = useState(false);

  /*
    ==========================================
    Refresh Helpers
    ==========================================
    */

  const refreshIncident = () => {
    queryClient.invalidateQueries({
      queryKey: ["incident", incidentId],
    });
  };

  const refreshTimeline = () => {
    queryClient.invalidateQueries({
      queryKey: ["timeline", incidentId],
    });
  };

  const refreshPostmortem = () => {
    queryClient.invalidateQueries({
      queryKey: ["postmortem", incidentId],
    });
  };

  /*
    ==========================================
    Socket Events
    ==========================================
    */
useEffect(() => {

    socket.emit(

        "join-incident",

        incidentId

    );

    return () => {

        socket.emit(

            "leave-incident",

            incidentId

        );

    };

}, [incidentId]);
  useSocket("incident:updated", () => {
    refreshIncident();

    toast.info("Incident updated.");
  });

  useSocket("incident:ai-generated", () => {
    refreshIncident();

    toast.success("AI Analysis Generated.");
  });

  useSocket("timeline:created", () => {
    refreshTimeline();

    toast.success("Timeline Updated.");
  });

  useSocket("postmortem:generated", () => {
    refreshPostmortem();

    toast.success("Postmortem Generated.");
  });

  /*
    ==========================================
    Queries
    ==========================================
    */

  const {
    data: incident,

    isLoading,

    isError,
  } = useIncident(incidentId);

  const { data: timeline = [] } = useTimeline(incidentId);

  const { data: similarIncidents = [] } = useSimilarIncidents(incidentId);

  const { data: postmortem } = usePostmortem(incidentId);

  /*
    ==========================================
    Mutations
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

      queryClient.invalidateQueries({
        queryKey: ["postmortem", incidentId],
      }),
    ]);

    toast.success("War Room Refreshed.");
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
    Error
    ==========================================
    */

  if (isError || !incident) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <h2 className="text-xl font-semibold text-red-500">
          Failed to load War Room.
        </h2>
      </div>
    );
  }

  /*
    ==========================================
    UI
    ==========================================
    */

  return (
    <>
      <div className="space-y-6">
        {/* Header */}

        <WarRoomHeader incident={incident} />

        {/* Command Center */}

        <div className="space-y-6">
          {user?.role !== "viewer" && (
            <CommandCenterCard
              incident={incident}
              onAssign={() => setAssignOpen(true)}
              onGenerateAI={handleGenerateAI}
              onGeneratePostmortem={handleGeneratePostmortem}
              onRefresh={handleRefresh}
              generatingAI={generateRootCause.isPending}
              generatingPostmortem={generatePostmortem.isPending}
            />
          )}

          <TimelineCard timeline={timeline} incidentId={incidentId} />
        </div>

        {/* Health */}

        <div className="space-y-6">
          <ServiceHealthCard incident={incident} />

          <AIAnalysisCard incident={incident} />

          <PostmortemCard postmortem={postmortem} />
        </div>

        {/* Responders */}

        <RespondersCard
          responders={incident.assignedTo || []}
          incidentId={incident._id}
        />

        {/* Similar Incidents */}

        <SimilarIncidentsCard incidents={similarIncidents} />

        {/* Logs */}

        <LiveLogsCard logs={incident.errorLogs} />

        {/* Resolve */}

        {user?.role !== "viewer" && <ResolveIncidentCard incident={incident} />}
      </div>

      {/* Lazy Modal */}

      {assignOpen && (
        <Suspense fallback={null}>
          <AssignResponderModal
            open={assignOpen}
            onClose={() => setAssignOpen(false)}
            incident={incident}
          />
        </Suspense>
      )}
    </>
  );
};

export default WarRoom;
