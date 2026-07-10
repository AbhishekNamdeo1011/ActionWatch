import {
    ShieldAlert,
    Server,
    Activity,
    Clock,
    Plus,
} from "lucide-react";

import PageHeader from "@/components/common/PageHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentIncidents from "@/components/dashboard/RecentIncidents";
import ServiceHealth from "@/components/dashboard/ServiceHealth";
import ActiveIncidents from "@/components/dashboard/ActiveIncidents";
import { useDashboard } from "@/hooks/useDashboard";

const Dashboard = () => {

    const {

        data,

        isLoading,

        error,

    } = useDashboard();

    if (isLoading) {

        return <h2>Loading Dashboard...</h2>;

    }

    if (error) {

        return <h2>Something went wrong.</h2>;

    }

    return (

        <>

            <PageHeader

                title="Dashboard"

                description="Monitor incidents, services and infrastructure."

                action={

                    <button className="flex h-11 items-center gap-2 rounded-xl bg-primary px-5 font-medium text-white transition hover:bg-primary-hover">

                        <Plus size={18} />

                        New Incident

                    </button>

                }

            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                <StatsCard

                    title="Open Incidents"

                    value={data.openIncidents}

                    change="+15%"

                    icon={ShieldAlert}

                />

                <StatsCard

                    title="Healthy Services"

                    value={data.healthyServices}

                    change="+4%"

                    icon={Server}

                />

                <StatsCard

                    title="Resolved Incidents"

                    value={data.resolvedIncidents}

                    change="+11%"

                    icon={Activity}

                />

                <StatsCard

                    title="Average MTTR"

                    value={`${data.averageMTTR} min`}

                    change="-8%"

                    icon={Clock}

                />

            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">

                <RecentIncidents

                    incidents={data.recentIncidents}

                />

                <ServiceHealth

                    healthy={data.healthyServices}

                    unhealthy={data.unhealthyServices}

                />

            </div>

            <div className="mt-6">

                <ActiveIncidents

                    incidents={data.activeIncidents}

                />

            </div>

        </>

    );

};

export default Dashboard;