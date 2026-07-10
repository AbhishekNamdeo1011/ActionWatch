import { Plus } from "lucide-react";

import PageHeader from "@/components/common/PageHeader";
import IncidentFilters from "@/components/incidents/IncidentFilters";
import IncidentTable from "@/components/incidents/IncidentTable";

import { useIncidents } from "@/hooks/useIncidents";
const Incidents = () => {

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

                    <button className="flex h-11 items-center gap-2 rounded-xl bg-primary px-5 font-medium text-white">

                        <Plus size={18} />

                        New Incident

                    </button>

                }

            />

            <IncidentFilters />

            <div className="mt-6">

                <IncidentTable

                    incidents={data}

                />

            </div>

        </>

    );

};

export default Incidents;