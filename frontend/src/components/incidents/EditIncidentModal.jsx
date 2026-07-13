import Card from "@/components/common/Card";
import IncidentForm from "./IncidentForm";
import { useUpdateIncident } from "@/hooks/incidents/useUpdateIncident";

const EditIncidentModal = ({
    incident,
    open,
    onClose,
}) => {

    const mutation = useUpdateIncident();

    if (!open) return null;

    const handleSubmit = async (values) => {

        await mutation.mutateAsync({

            id: incident._id,

            payload: values,

        });

        onClose();

    };

    return (

        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
            onClick={onClose}
        >

            <div
                className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl"
                onClick={(e) => e.stopPropagation()}
            >

                <Card
                    title="Edit Incident"
                    subtitle="Update incident details."
                    action={
                        <button
                            onClick={onClose}
                            className="rounded-lg border border-border px-3 py-2 text-sm transition hover:bg-background"
                        >
                            Close
                        </button>
                    }
                >

                    <div className="max-h-[70vh] overflow-y-auto pr-2">

                    <IncidentForm

                        defaultValues={{

                            title: incident.title,

                            description: incident.description,

                            severity: incident.severity,

                            status: incident.status,

                                service: incident.service?._id || "",

                                detectedBy: incident.detectedBy,

                                affectedUsers: incident.affectedUsers,

                                errorLogs: incident.errorLogs,

                        }}

                        onSubmit={handleSubmit}

                        isSubmitting={mutation.isPending}

                    />

                    </div>

                </Card>

            </div>

        </div>

    );

};

export default EditIncidentModal;