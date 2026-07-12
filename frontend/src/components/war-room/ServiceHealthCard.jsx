import Card from "@/components/common/Card";
import {
    Server,
    Activity,
    Timer,
} from "lucide-react";

const ServiceHealthCard = ({ incident }) => {

    return (

        <Card title="Service Health">

            <div className="space-y-5">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <Server size={20} />

                        <span className="font-medium">

                            {incident.service?.name}

                        </span>

                    </div>

                    <span className="rounded-full bg-red-500/10 px-3 py-1 text-sm font-semibold text-red-500">

                        DOWN

                    </span>

                </div>

                <div className="grid gap-4 sm:grid-cols-2">

                    <div className="rounded-xl border border-border p-4">

                        <div className="flex items-center gap-2">

                            <Activity size={18} />

                            <p className="text-sm text-muted">

                                HTTP Status

                            </p>

                        </div>

                        <h3 className="mt-2 text-2xl font-bold">

                            503

                        </h3>

                    </div>

                    <div className="rounded-xl border border-border p-4">

                        <div className="flex items-center gap-2">

                            <Timer size={18} />

                            <p className="text-sm text-muted">

                                Response Time

                            </p>

                        </div>

                        <h3 className="mt-2 text-2xl font-bold">

                            --

                        </h3>

                    </div>

                </div>

            </div>

        </Card>

    );

};

export default ServiceHealthCard;