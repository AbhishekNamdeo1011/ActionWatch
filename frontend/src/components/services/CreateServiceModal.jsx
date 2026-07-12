import Card from "@/components/common/Card";
import ServiceForm from "./ServiceForm";
import { useCreateService } from "@/hooks/services/useCreateService";

const CreateServiceModal = ({
    open,
    onClose,
}) => {

    const mutation = useCreateService();

    if (!open) return null;

    const handleSubmit = async (values) => {

        try {

            await mutation.mutateAsync(values);

            onClose();

        } catch (error) {
            // Toast handled in hook
        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">

            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">

                <Card
                    title="Create Service"
                    subtitle="Add a service to monitor."
                    action={
                        <button
                            onClick={onClose}
                            className="rounded-lg border border-border px-3 py-2 text-sm"
                        >
                            Close
                        </button>
                    }
                >

                    <ServiceForm

                        defaultValues={{

                            name: "",

                            description: "",

                            url: "",

                            method: "GET",

                            expectedStatus: 200,

                            interval: 60,

                            timeout: 5000,

                            failureThreshold: 3,

                        }}

                        onSubmit={handleSubmit}

                        isSubmitting={mutation.isPending}

                    />

                </Card>

            </div>

        </div>

    );

};

export default CreateServiceModal;