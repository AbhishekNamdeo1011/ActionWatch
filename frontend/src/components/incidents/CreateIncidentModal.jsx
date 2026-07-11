import Card from "@/components/common/Card";
import IncidentForm from "@/components/incidents/IncidentForm";
import { useCreateIncident } from "@/hooks/useCreateIncident";

const CreateIncidentModal = ({
    open,
    onClose,
}) => {

    const mutation = useCreateIncident();

    if (!open) return null;

    const handleSubmit = async (values) => {

    

            await mutation.mutateAsync(values);

            onClose();

        

    };

    return (

       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">

    <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">

        <Card
            title="Create New Incident"
            subtitle="Report a new production incident."
            action={
                <button
                    onClick={onClose}
                    className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-background"
                >
                    Close
                </button>
            }
        >
            <IncidentForm
                defaultValues={{
                    title: "",
                    description: "",
                    severity: "P2",
                    status: "open",
                    service: "",
                    detectedBy: "monitor",
                    affectedUsers: 0,
                    errorLogs: "",
                }}
                onSubmit={handleSubmit}
                isSubmitting={mutation.isPending}
            />
        </Card>

    </div>

</div>

    );

};

export default CreateIncidentModal;