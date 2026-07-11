import { lazy, Suspense, useState } from "react";
import { Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import PageHeader from "@/components/common/PageHeader";
import IncidentFilters from "@/components/incidents/IncidentFilters";
import IncidentTable from "@/components/incidents/IncidentTable";
import ComponentLoader from "@/components/common/ComponentLoader";

import { useIncidents } from "@/hooks/useIncidents";
import useSocket from "@/hooks/useSocket";

const CreateIncidentModal = lazy(() =>
    import("@/components/incidents/CreateIncidentModal")
);

const Incidents = () => {

    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    useSocket("incident:updated", () => {

        queryClient.invalidateQueries({
            queryKey: ["incidents"],
        });

    });

    const {

        data,
        isLoading,
        error,

    } = useIncidents();

    if (isLoading) {

        return <h2>Loading...</h2>;

    }

    if (error) {

        return <h2>Something went wrong.</h2>;

    }

    return (

        <>

            <PageHeader

                title="Incidents"

                description="Manage and monitor incidents."

                action={

                    <button
                        onClick={() => setOpen(true)}
                        className="flex h-11 items-center gap-2 rounded-xl bg-primary px-5 font-medium text-white"
                    >

                        <Plus size={18} />

                        New Incident

                    </button>

                }

            />

            <IncidentFilters />

            <div className="mt-6">

                <IncidentTable incidents={data} />

            </div>

            <Suspense fallback={<ComponentLoader />}>

                <CreateIncidentModal

                    open={open}

                    onClose={() => setOpen(false)}

                />

            </Suspense>

        </>

    );

};

export default Incidents;