import { Plus } from "lucide-react";
import { useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import ServiceGrid from "@/components/services/ServiceGrid";
import { lazy } from "react";
import { Suspense } from "react";
const CreateServiceModal = lazy(() =>
    import("@/components/services/CreateServiceModal")
);import { useQueryClient } from "@tanstack/react-query";
import useSocket from "@/hooks/useSocket";
const Services = () => {
     const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
useSocket("service:updated", () => {

    queryClient.invalidateQueries({

        queryKey: ["services"],

    });

});
   

    return (

        <>

            <PageHeader
                title="Services"
                description="Manage monitored services."
                action={
                    <button
                        onClick={() => setOpen(true)}
                        className="flex h-11 items-center gap-2 rounded-xl bg-primary px-5 font-medium text-white transition hover:bg-primary-hover"
                    >
                        <Plus size={18} />
                        New Service
                    </button>
                }
            />

            <ServiceGrid />

            <Suspense fallback={null}>

    <CreateServiceModal
        open={open}
        onClose={() => setOpen(false)}
    />

</Suspense>

        </>

    );

};

export default Services;