import { useState } from "react";
import {
    Pencil,
    Trash2,
    Power,
} from "lucide-react";

import { lazy, Suspense } from "react";

const EditServiceModal = lazy(() =>
    import("./EditServiceModal")
);import { useDeleteService } from "@/hooks/services/useDeleteService";
import { useToggleMonitoring } from "@/hooks/useToggleMonitoring";

const ServiceActions = ({ service }) => {

    const [editOpen, setEditOpen] = useState(false);

    const deleteMutation = useDeleteService();

    const toggleMutation = useToggleMonitoring();

    const handleDelete = async () => {

        const confirmed = window.confirm(

            `Delete "${service.name}"?`

        );

        if (!confirmed) return;

        await deleteMutation.mutateAsync(service._id);

    };

    const handleToggle = async () => {

        await toggleMutation.mutateAsync(service._id);

    };

    return (

        <>

            <div className="mt-6 flex justify-between gap-2">

                <button
                    onClick={() => setEditOpen(true)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-sm hover:bg-background"
                >

                    <Pencil size={16} />

                    Edit

                </button>

                <button
                    onClick={handleToggle}
                    disabled={toggleMutation.isPending}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-sm hover:bg-background"
                >

                    <Power size={16} />

                    {service.isActive ? "Disable" : "Enable"}

                </button>

                <button
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500 px-3 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-white"
                >

                    <Trash2 size={16} />

                    Delete

                </button>

            </div>

           <Suspense fallback={null}>

    <EditServiceModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        service={service}
    />

</Suspense>

        </>

    );

};

export default ServiceActions;