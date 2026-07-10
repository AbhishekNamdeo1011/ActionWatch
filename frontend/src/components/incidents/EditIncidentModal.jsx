import Card from "@/components/common/Card";
import IncidentForm from "./IncidentForm";
import { useUpdateIncident } from "@/hooks/useUpdateIncident";

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

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-2xl">

                <Card title="Edit Incident">

                    <IncidentForm

                        defaultValues={{

                            title: incident.title,

                            description: incident.description,

                            severity: incident.severity,

                            status: incident.status,

                        }}

                        onSubmit={handleSubmit}

                        isSubmitting={mutation.isPending}

                    />

                </Card>

            </div>

        </div>

    );

};

export default EditIncidentModal;