import Card from "@/components/common/Card";
import ServiceForm from "./ServiceForm";
import { useUpdateService } from "@/hooks/useUpdateService";

const EditServiceModal = ({
    open,
    onClose,
    service,
}) => {

    const mutation = useUpdateService();

    if (!open || !service) return null;

    const handleSubmit = async (values) => {

        try {

            await mutation.mutateAsync({

                serviceId: service._id,

                payload: values,

            });

            onClose();

        } catch {

            // handled in hook

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">

            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">

                <Card
                    title="Edit Service"
                    subtitle="Update monitored service."
                    action={
                        <button
                            onClick={onClose}
                            className="rounded-lg border border-border px-3 py-2"
                        >
                            Close
                        </button>
                    }
                >

                    <ServiceForm

                        defaultValues={{

                            name: service.name,

                            description: service.description,

                            url: service.url,

                            method: service.method,

                            expectedStatus: service.expectedStatus,

                            interval: service.interval,

                            timeout: service.timeout,

                            failureThreshold: service.failureThreshold,

                        }}

                        onSubmit={handleSubmit}

                        isSubmitting={mutation.isPending}

                    />

                </Card>

            </div>

        </div>

    );

};

export default EditServiceModal;