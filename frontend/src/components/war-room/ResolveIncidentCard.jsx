import Card from "@/components/common/Card";
import { CheckCircle2 } from "lucide-react";
import { useUpdateIncident } from "@/hooks/incidents/useUpdateIncident";

const ResolveIncidentCard = ({ incident }) => {

    const updateIncident = useUpdateIncident();

    const handleResolve = () => {

        if (

            !window.confirm(

                "Are you sure you want to resolve this incident?"

            )

        ) {

            return;

        }

        updateIncident.mutate({

            id: incident._id,

            payload: {

                status: "resolved",

                resolvedAt: new Date().toISOString(),

            },

        });

    };

    return (

        <Card title="Resolve Incident">

            {

                incident.status === "resolved"

                ? (

                    <div className="rounded-xl bg-green-500/10 p-6 text-center">

                        <CheckCircle2

                            className="mx-auto mb-3 text-green-500"

                            size={42}

                        />

                        <h3 className="text-lg font-semibold">

                            Incident Resolved

                        </h3>

                        <p className="mt-2 text-muted">

                            This incident has already been resolved.

                        </p>

                    </div>

                )

                : (

                    <div className="space-y-4">

                        <p className="text-muted">

                            Once resolved, this incident will disappear from

                            active monitoring and move into history.

                        </p>

                        <button

                            onClick={handleResolve}

                            disabled={updateIncident.isPending}

                            className="w-full rounded-xl bg-green-600 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"

                        >

                            {

                                updateIncident.isPending

                                    ? "Resolving..."

                                    : "Resolve Incident"

                            }

                        </button>

                    </div>

                )

            }

        </Card>

    );

};

export default ResolveIncidentCard;