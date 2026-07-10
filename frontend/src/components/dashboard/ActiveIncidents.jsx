import Card from "@/components/common/Card";
import { AlertTriangle } from "lucide-react";

const severityColors = {
    P0: "bg-red-500 text-white",
    P1: "bg-orange-500 text-white",
    P2: "bg-yellow-500 text-black",
    P3: "bg-blue-500 text-white",
};

const statusColors = {
    investigating: "text-yellow-500",
    identified: "text-blue-500",
    monitoring: "text-purple-500",
    resolved: "text-green-500",
};

const ActiveIncidents = ({ incidents = [] }) => {

    return (

        <Card
            title="Active Incidents"
            subtitle="Currently unresolved incidents"
        >

            {incidents.length === 0 ? (

                <div className="flex h-40 items-center justify-center text-muted">

                    No active incidents 🎉

                </div>

            ) : (

                <div className="space-y-4">

                    {incidents.map((incident) => (

                        <div
                            key={incident._id}
                            className="flex items-center justify-between rounded-xl border border-border bg-background p-4 transition hover:border-primary"
                        >

                            {/* Left */}

                            <div className="flex items-start gap-4">

                                <div className="rounded-lg bg-red-500/10 p-2">

                                    <AlertTriangle
                                        size={18}
                                        className="text-red-500"
                                    />

                                </div>

                                <div>

                                    <h4 className="font-semibold text-foreground">

                                        {incident.title}

                                    </h4>

                                    <p className="mt-1 text-sm text-muted">

                                        Service:

                                        {" "}

                                        {incident.service?.name || "Unknown"}

                                    </p>

                                    <p className="text-xs text-muted">

                                        Created by{" "}

                                        {incident.createdBy?.username || "System"}

                                    </p>

                                </div>

                            </div>

                            {/* Right */}

                            <div className="flex flex-col items-end gap-2">

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                        severityColors[incident.severity] ||
                                        "bg-gray-500 text-white"
                                    }`}
                                >

                                    {incident.severity}

                                </span>

                                <span
                                    className={`text-sm font-medium ${
                                        statusColors[incident.status] ||
                                        "text-muted"
                                    }`}
                                >

                                    {incident.status}

                                </span>

                                <span className="text-xs text-muted">

                                    {new Date(
                                        incident.createdAt
                                    ).toLocaleString()}

                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </Card>

    );

};

export default ActiveIncidents;