import Card from "@/components/common/Card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SimilarIncidentsCard = ({ incidents = [] }) => {

    return (

        <Card
            title="Similar Incidents"
            subtitle="Previously resolved incidents with similar characteristics."
        >

            {

                incidents.length ? (

                    <div className="space-y-4">

                        {

                            incidents.map((incident) => (

                                <div
                                    key={incident._id}
                                    className="rounded-xl border border-border p-4"
                                >

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <h3 className="font-semibold">

                                                {incident.title}

                                            </h3>

                                            <p className="mt-1 text-sm text-muted">

                                                {incident.service?.name || "Unknown Service"}

                                            </p>

                                        </div>

                                        <span
                                            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium"
                                        >

                                            {incident.severity}

                                        </span>

                                    </div>

                                    <div className="mt-4 flex justify-end">

                                        <Link
                                            to={`/incidents/${incident._id}`}
                                            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                                        >

                                            View Incident

                                            <ArrowRight size={16} />

                                        </Link>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                ) : (

                    <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border">

                        <p className="text-muted">

                            No similar incidents found.

                        </p>

                    </div>

                )

            }

        </Card>

    );

};

export default SimilarIncidentsCard;