import { useParams } from "react-router-dom";

import Card from "@/components/common/Card";
import IncidentInfoCard from "@/components/incidents/IncidentInfoCard";
import { useIncident } from "@/hooks/useIncident";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { lazy, Suspense } from "react";
import ComponentLoader from "@/components/common/ComponentLoader";
import Timeline from "@/components/timeline/Timeline";
import { useTimeline } from "@/hooks/useTimeline";
const EditIncidentModal = lazy(
  () => import("@/components/incidents/EditIncidentModal"),
);
const IncidentDetails = () => {
  const { incidentId } = useParams();
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useIncident(incidentId);
const incident = data;
const {

    data: timeline = [],

} = useTimeline(incidentId);
  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <h2 className="text-lg font-medium">Loading Incident...</h2>
      </div>
    );
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
      {/* ================= Header ================= */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{incident.title}</h1>

          <p className="mt-2 text-muted">Incident Details</p>
        </div>

        <button
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-white"
          onClick={() => setOpen(true)}
        >
          <Pencil size={18} />
          Edit
        </button>
      </div>

      {/* ================= Overview ================= */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <IncidentInfoCard label="Status" value={incident.status} />

        <IncidentInfoCard label="Severity" value={incident.severity} />

        <IncidentInfoCard label="Service" value={incident.service} />

        <IncidentInfoCard label="Detected By" value={incident.detectedBy} />
      </div>

      {/* ================= Description ================= */}

      <Card title="Description">
        <p className="leading-7 text-muted">
          {incident.description || "No description available."}
        </p>
      </Card>

      {/* ================= Error Logs ================= */}

      <Card title="Error Logs">
        <pre className="overflow-auto rounded-xl bg-background p-4 text-sm whitespace-pre-wrap">
          {incident.errorLogs || "No logs available."}
        </pre>
      </Card>

      {/* ================= AI Recommendations ================= */}

      <Card title="AI Recommendations">
        {incident.aiRecommendations && incident.aiRecommendations.length > 0 ? (
          <ul className="list-disc space-y-2 pl-5">
            {incident.aiRecommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No AI recommendations available.</p>
        )}
      </Card>

      {/* ================= Root Causes ================= */}

      <Card title="Possible Root Causes">
        {incident.aiRootCauses && incident.aiRootCauses.length > 0 ? (
          <ul className="list-disc space-y-2 pl-5">
            {incident.aiRootCauses.map((cause, index) => (
              <li key={index}>{cause}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No root causes generated.</p>
        )}
      </Card>

      {/* ================= Assigned Responders ================= */}

      <Card title="Assigned Responders">
        {incident.assignedTo && incident.assignedTo.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {incident.assignedTo.map((user) => (
              <div
                key={user._id}
                className="rounded-xl border border-border bg-background p-5 transition hover:border-primary"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {user.username}
                    </h3>

                    <p className="mt-1 text-sm text-muted">{user.email}</p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="mt-4">
                  <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
                    {user.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-border">
            <p className="text-muted">No responders assigned.</p>
          </div>
        )}
      </Card>

      {/* ================= Timeline ================= */}
<Card title="Activity Timeline">

    <Timeline

        events={timeline}

    />

</Card>
      <Suspense fallback={<ComponentLoader />}>
        <EditIncidentModal
          open={open}
          onClose={() => setOpen(false)}
          incident={incident}
        />
      </Suspense>
    </div>
  );
};

export default IncidentDetails;
