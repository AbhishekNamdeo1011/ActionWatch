import PageHeader from "@/components/common/PageHeader";

import AnalyticsOverview from "@/components/analytics/AnalyticsOverview";
import SeverityChart from "@/components/analytics/SeverityChart";
import StatusChart from "@/components/analytics/StatusChart";
import MonthlyIncidentChart from "@/components/analytics/MonthlyIncidentsChart";
import ServiceHealthChart from "@/components/analytics/ServiceHealthChart";

import AnalyticsSkeleton from "@/components/skeletons/AnalyticsSkeleton";

import { useAnalytics } from "@/hooks/responder/useAnalytics";

const Analytics = () => {

    const {

        data,

        isLoading,

        error,

    } = useAnalytics();

    if (isLoading) {

        return <AnalyticsSkeleton />;

    }

    if (error) {

        return (

            <div className="flex h-60 items-center justify-center">

                <h2 className="text-lg font-medium text-red-500">

                    Failed to load analytics.

                </h2>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <PageHeader

                title="Analytics"

                description="System insights and incident trends."

            />

            {/* KPI Cards */}

            <AnalyticsOverview

                data={data}

            />

            {/* Charts Row 1 */}

            <div className="grid gap-6 xl:grid-cols-2">

                <SeverityChart

                    data={data.incidentsBySeverity}

                />

                <StatusChart

                    data={data.incidentsByStatus}

                />

            </div>

            {/* Charts Row 2 */}

            <div className="grid gap-6 xl:grid-cols-2">

                <MonthlyIncidentChart

                    data={data.monthlyIncidents}

                />

                <ServiceHealthChart

                    data={data.serviceHealth}

                />

            </div>

        </div>

    );

};

export default Analytics;