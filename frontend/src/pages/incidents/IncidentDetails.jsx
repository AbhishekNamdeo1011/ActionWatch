import { useState, lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";

import Card from "@/components/common/Card";
import IncidentInfoCard from "@/components/incidents/IncidentInfoCard";
import Timeline from "@/components/timeline/Timeline";

import IncidentDetailsSkeleton from "@/components/skeletons/IncidentDetailsSkeleton";
import { useIncident } from "@/hooks/incidents/useIncident";
import { useTimeline } from "@/hooks/timeline/useTimeline";
import { useAuth } from "@/hooks/auth/useAuth";

const EditIncidentModal = lazy(
  () => import("@/components/incidents/EditIncidentModal"),
);

const IncidentDetails = () => {
  const { incidentId } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const {
    data: incident,

    isLoading,

    error,
  } = useIncident(incidentId);

  const { data: timeline = [] } = useTimeline(incidentId);

  const canEdit = user?.role !== "viewer";

  if (isLoading) {
    return <IncidentDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <h2 className="text-lg font-medium text-red-500">
          Failed to load incident.
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{incident.title}</h1>

          <p className="mt-2 text-muted">Incident Details</p>
        </div>

        {canEdit && (
          <div className="flex gap-3">
           <button
    onClick={() => {

       

        navigate(`/war-room/${incident._id}`);

    }}
    className="rounded-xl bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700"
>
    Open War Room
</button>

            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-white"
            >
              <Pencil size={18} />
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Overview */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <IncidentInfoCard label="Status" value={incident.status} />

        <IncidentInfoCard label="Severity" value={incident.severity} />

        <IncidentInfoCard label="Service" value={incident.service?.name} />

        <IncidentInfoCard label="Detected By" value={incident.detectedBy} />
      </div>

      {/* Description */}

      <Card title="Description">
        <p className="leading-7 text-muted">
          {incident.description || "No description available."}
        </p>
      </Card>

      {/* Error Logs */}

      <Card title="Error Logs">
        <pre className="overflow-auto whitespace-pre-wrap rounded-xl bg-background p-4 text-sm">
          {incident.errorLogs || "No logs available."}
        </pre>
      </Card>

      {/* AI Recommendations */}

      <Card title="AI Recommendations">
        {incident.aiRecommendations?.length ? (
          <ul className="list-disc space-y-2 pl-5">
            {incident.aiRecommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No AI recommendations available.</p>
        )}
      </Card>

      {/* Root Causes */}

      <Card title="Possible Root Causes">
        {incident.aiRootCauses?.length ? (
          <ul className="space-y-4">
            {incident.aiRootCauses.map((cause) => (
              <li
                key={cause._id}
                className="rounded-xl border border-border p-4"
              >
                <h3 className="font-semibold">{cause.cause}</h3>

                <p className="mt-2 text-sm text-muted">{cause.reasoning}</p>

                <div className="mt-4 flex justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs">
                    Confidence {cause.confidence}%
                  </span>
                </div>

                <div className="mt-4 rounded-xl bg-green-500/10 p-3">
                  <p className="font-semibold">Suggested Fix</p>

                  <p className="mt-2">{cause.suggestedFix}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No root causes generated.</p>
        )}
      </Card>

      {/* Responders */}

      <Card title="Assigned Responders">
        {incident.assignedTo?.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {incident.assignedTo.map((responder) => (
              <div
                key={responder._id}
                className="rounded-xl border border-border bg-background p-5"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{responder.username}</h3>

                    <p className="text-sm text-muted">{responder.email}</p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                    {responder.username

                      ?.charAt(0)

                      .toUpperCase()}
                  </div>
                </div>

                <span className="mt-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs capitalize text-primary">
                  {responder.role}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-border">
            <p className="text-muted">No responders assigned.</p>
          </div>
        )}
      </Card>

      {/* Timeline */}

      <Card title="Activity Timeline">
        <Timeline events={timeline} />
      </Card>

      <Suspense fallback={null}>
        {open && (
          <EditIncidentModal
            open={open}
            onClose={() => setOpen(false)}
            incident={incident}
          />
        )}
      </Suspense>
    </div>
  );
};

export default IncidentDetails;
