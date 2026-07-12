import { lazy, Suspense, useState } from "react";
import { Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/hooks/auth/useAuth";
import { useIncidents } from "@/hooks/incidents/useIncidents";
import useSocket from "@/hooks/useSocket";

import PageHeader from "@/components/common/PageHeader";
import IncidentFilters from "@/components/incidents/IncidentFilters";
import IncidentTable from "@/components/incidents/IncidentTable";
import IncidentSkeleton from "@/components/skeletons/IncidentSkeleton.jsx";

const CreateIncidentModal = lazy(() =>
    import("@/components/incidents/CreateIncidentModal")
);

const Incidents = () => {

    const [open, setOpen] = useState(false);

    const [filters, setFilters] = useState({

        search: "",

        status: "",

        severity: "",

        service: "",

    });

    const { user } = useAuth();

    const queryClient = useQueryClient();

    useSocket("incident:created", () => {

        queryClient.invalidateQueries({

            queryKey: ["incidents"],

        });

    });

    useSocket("incident:updated", () => {

        queryClient.invalidateQueries({

            queryKey: ["incidents"],

        });

    });

    useSocket("incident:resolved", () => {

        queryClient.invalidateQueries({

            queryKey: ["incidents"],

        });

    });

    const {

        data: incidents = [],

        isLoading,

        error,

    } = useIncidents(filters);

    if (isLoading) {

        return <IncidentSkeleton />;

    }

    if (error) {

        return (

            <div className="flex h-96 items-center justify-center">

                <h2 className="text-lg font-semibold text-red-500">

                    Failed to load incidents.

                </h2>

            </div>

        );

    }

    return (

        <>

            <PageHeader

                title="Incidents"

                description="Manage and monitor incidents."

                action={

                    user?.role !== "viewer" && (

                        <button

                            onClick={() => setOpen(true)}

                            className="flex h-11 items-center gap-2 rounded-xl bg-primary px-5 font-medium text-white hover:bg-primary-hover"

                        >

                            <Plus size={18} />

                            New Incident

                        </button>

                    )

                }

            />

            <div className="mt-6">

                <IncidentFilters

                    filters={filters}

                    setFilters={setFilters}

                />

            </div>

            <div className="mt-6">

                <IncidentTable

                    incidents={incidents}

                />

            </div>

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

export default Incidents;