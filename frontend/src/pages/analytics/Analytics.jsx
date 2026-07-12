import { lazy, Suspense } from "react";

import PageHeader from "@/components/common/PageHeader";
import ComponentLoader from "@/components/common/ComponentLoader";

import { useAnalytics } from "@/hooks/useAnalytics";

const SeverityChart = lazy(() =>
    import("@/components/analytics/SeverityChart")
);
const AnalyticsOverview = lazy(() =>
    import("@/components/analytics/AnalyticsOverview")
);



const StatusChart = lazy(() =>
    import("@/components/analytics/StatusChart")
);

const MonthlyIncidentChart = lazy(() =>
    import("@/components/analytics/MonthlyIncidentsChart")
);

const ServiceHealthChart = lazy(() =>
    import("@/components/analytics/ServiceHealthChart")
);

const Analytics = () => {

    const {

        data,

        isLoading,

        error,

    } = useAnalytics();

    if (isLoading) {

        return <ComponentLoader />;

    }

    if (error) {
        return (
            <h2 className="text-red-500">
                Failed to load analytics.
            </h2>
        );
    }

    return (

        <div className="space-y-8">

            <PageHeader

                title="Analytics"

                description="System insights and incident trends."

            />

            {/* ================= KPI Cards ================= */}

            <Suspense fallback={<ComponentLoader />}>

    <AnalyticsOverview
        data={data}
    />

</Suspense>

            {/* ================= Charts Row 1 ================= */}

            <div className="grid gap-6 xl:grid-cols-2">

                <Suspense fallback={<ComponentLoader />}>

                    <SeverityChart

                        data={data.incidentsBySeverity}

                    />

                </Suspense>

                <Suspense fallback={<ComponentLoader />}>

                    <StatusChart

                        data={data.incidentsByStatus}

                    />

                </Suspense>

            </div>

            {/* ================= Charts Row 2 ================= */}

            <div className="grid gap-6 xl:grid-cols-2">

                <Suspense fallback={<ComponentLoader />}>

                    <MonthlyIncidentChart

                        data={data.monthlyIncidents}

                    />

                </Suspense>

                <Suspense fallback={<ComponentLoader />}>

                    <ServiceHealthChart

                        data={data.serviceHealth}

                    />

                </Suspense>

            </div>

        </div>

    );

};

export default Analytics;