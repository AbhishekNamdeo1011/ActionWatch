import {
    Globe,
    Clock3,
    Activity,
    Pencil,
    Trash2,
    Power,
} from "lucide-react";

import { Link } from "react-router-dom";
import ServiceActions from "./ServiceActions";
const statusColors = {
    UP: "bg-green-500",
    DOWN: "bg-red-500",
    DEGRADED: "bg-yellow-500",
};

const ServiceCard = ({ service }) => {

    return (

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-card transition hover:border-primary hover:shadow-lg">

            {/* Header */}

            <div className="flex items-start justify-between">

                <div>

                    <Link
                        to={`/services/${service._id}`}
                        className="text-lg font-semibold text-foreground hover:text-primary"
                    >

                        {service.name}

                    </Link>

                    <p className="mt-1 text-sm text-muted">

                        {service.method}

                    </p>

                </div>

                <span
                    className={`h-3 w-3 rounded-full ${
                        statusColors[service.currentStatus] ||
                        "bg-gray-400"
                    }`}
                />

            </div>

            {/* URL */}

            <div className="mt-5 flex items-center gap-3">

                <Globe
                    size={18}
                    className="text-primary"
                />

                <p className="truncate text-sm text-muted">

                    {service.url}

                </p>

            </div>

            {/* Response Time */}

            <div className="mt-4 flex items-center gap-3">

                <Clock3
                    size={18}
                    className="text-primary"
                />

                <span className="text-sm">

                    {service.lastResponseTime ?? "--"} ms

                </span>

            </div>

            {/* Last Checked */}

            <div className="mt-4 flex items-center gap-3">

                <Activity
                    size={18}
                    className="text-primary"
                />

                <span className="text-sm text-muted">

                    {service.lastCheckedAt
                        ? new Date(
                              service.lastCheckedAt
                          ).toLocaleString()
                        : "Never Checked"}

                </span>

            </div>

            {/* Status */}

            <div className="mt-6 flex items-center justify-between rounded-xl bg-background px-4 py-3">

                <span className="text-sm font-medium">

                    Monitoring

                </span>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                        service.currentStatus === "UP"
                            ? "bg-green-600"
                            : service.currentStatus === "DOWN"
                            ? "bg-red-600"
                            : "bg-yellow-600"
                    }`}
                >

                    {service.currentStatus}

                </span>

            </div>

            {/* Footer */}

            <ServiceActions service={service} />

        </div>

    );

};

export default ServiceCard;