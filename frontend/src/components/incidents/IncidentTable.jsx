import Card from "@/components/common/Card";
import IncidentStatusBadge from "./IncidentStatusBadge";
import IncidentSeverityBadge from "./IncidentSeverityBadge";
import IncidentActions from "./IncidentActions";
const IncidentTable = ({ incidents }) => {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
         <thead>

    <tr className="border-b border-border">

        <th className="pb-4 text-left font-semibold">
            Incident
        </th>

        <th className="pb-4 text-left font-semibold">
            Severity
        </th>

        <th className="pb-4 text-left font-semibold">
            Status
        </th>

        <th className="pb-4 text-left font-semibold">
            Created
        </th>

        <th className="pb-4 text-right font-semibold">
            Actions
        </th>

    </tr>

</thead>

         <tbody>

    {incidents.length === 0 ? (

        <tr>

            <td
                colSpan={5}
                className="py-12 text-center text-muted"
            >
                No incidents found.
            </td>

        </tr>

    ) : (

        incidents.map((incident) => (

            <tr
                key={incident._id}
                className="border-b border-border transition-colors hover:bg-background/60"
            >

                {/* Title */}

                <td className="py-5">

                    <div className="space-y-1">

                        <h4 className="font-medium text-foreground">

                            {incident.title}

                        </h4>

                        <p className="text-sm text-muted">

                            {incident.service?.name || "No Service"}

                        </p>

                    </div>

                </td>

                {/* Severity */}

                <td>

                    <IncidentSeverityBadge
                        severity={incident.severity}
                    />

                </td>

                {/* Status */}

                <td>

                    <IncidentStatusBadge
                        status={incident.status}
                    />

                </td>

                {/* Created */}

                <td className="text-sm text-muted">

                    {new Date(
                        incident.createdAt
                    ).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}

                </td>

                {/* Actions */}

                <td className="text-right">

                    <IncidentActions
                        incident={incident}
                    />

                </td>

            </tr>

        ))

    )}

</tbody>
        </table>
      </div>
    </Card>
  );
};

export default IncidentTable;
