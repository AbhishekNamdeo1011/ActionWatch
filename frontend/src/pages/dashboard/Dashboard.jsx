import { useState, lazy, Suspense } from "react";
import {
    ShieldAlert,
    Server,
    Activity,
    Clock,
    Plus,
} from "lucide-react";

import { useQueryClient } from "@tanstack/react-query";

import PageHeader from "@/components/common/PageHeader";

import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";

import StatsCard from "@/components/dashboard/StatsCard";
import RecentIncidents from "@/components/dashboard/RecentIncidents";
import ServiceHealth from "@/components/dashboard/ServiceHealth";
import ActiveIncidents from "@/components/dashboard/ActiveIncidents";

import { useDashboard } from "@/hooks/dashboard/useDashboard";
import useSocket from "@/hooks/useSocket";

const CreateIncidentModal = lazy(() =>
    import("@/components/incidents/CreateIncidentModal")
);

const Dashboard = () => {

    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    useSocket("incident:created", () => {

        queryClient.invalidateQueries({

            queryKey: ["dashboard"],

        });

    });

    const {

        data,

        isLoading,

        error,

    } = useDashboard();

    if (isLoading) {

        return <DashboardSkeleton />;

    }

    if (error) {

        return (

            <div className="flex h-60 items-center justify-center">

                <h2 className="text-lg font-medium text-red-500">

                    Failed to load dashboard.

                </h2>

            </div>

        );

    }

    return (

        <>

            <PageHeader

                title="Dashboard"

                description="Monitor incidents, services and infrastructure."

                action={

                    <button
                        onClick={() => setOpen(true)}
                        className="flex h-11 items-center gap-2 rounded-xl bg-primary px-5 font-medium text-white transition hover:bg-primary-hover"
                    >

                        <Plus size={18} />

                        New Incident

                    </button>

                }

            />

            {/* Stats */}

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

            {/* Row 2 */}

            <div className="mt-8 grid gap-6 lg:grid-cols-2">

                <RecentIncidents

                    incidents={data.recentIncidents}

                />

                <ServiceHealth

                    healthy={data.healthyServices}

                    unhealthy={data.unhealthyServices}

                />

            </div>

            {/* Active Incidents */}

            <div className="mt-6">

                <ActiveIncidents

                    incidents={data.activeIncidents}

                />

            </div>

            {/* Modal */}

            <Suspense fallback={null}>

                {

                    open && (

                        <CreateIncidentModal

                            open={open}

                            onClose={() => setOpen(false)}

                        />

                    )

                }

            </Suspense>

        </>

    );

};

export default Dashboard;