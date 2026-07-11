import {
    ShieldAlert,
    AlertTriangle,
    CheckCircle2,
    Server,
} from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";

const AnalyticsOverview = ({ data }) => {

    const totalIncidents =
        data.incidentsByStatus.reduce(
            (sum, item) => sum + item.count,
            0
        );

    const resolved =
        data.incidentsByStatus.find(
            (item) => item.status === "resolved"
        )?.count || 0;

    const critical =
        data.incidentsBySeverity.find(
            (item) => item.severity === "P0"
        )?.count || 0;

    const totalServices =
        data.serviceHealth.reduce(
            (sum, item) => sum + item.count,
            0
        );

    return (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <StatsCard
                title="Total Incidents"
                value={totalIncidents}
                icon={ShieldAlert}
            />

            <StatsCard
                title="Critical"
                value={critical}
                icon={AlertTriangle}
            />

            <StatsCard
                title="Resolved"
                value={resolved}
                icon={CheckCircle2}
            />

            <StatsCard
                title="Services"
                value={totalServices}
                icon={Server}
            />

        </div>

    );

};

export default AnalyticsOverview;