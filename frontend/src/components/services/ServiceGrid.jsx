import { useServices } from "@/hooks/useServices";
import ServiceCard from "./ServiceCard";

const ServiceGrid = () => {

    const {
        data = [],
        isLoading,
        error,
    } = useServices();

    if (isLoading) {

        return (
            <div className="py-20 text-center">
                Loading services...
            </div>
        );

    }

    if (error) {

        return (
            <div className="py-20 text-center text-red-500">
                Failed to load services.
            </div>
        );

    }

    if (!data.length) {

        return (
            <div className="rounded-2xl border border-dashed border-border py-20 text-center">

                <h3 className="text-lg font-semibold">

                    No Services Found

                </h3>

                <p className="mt-2 text-muted">

                    Create your first monitored service.

                </p>

            </div>
        );

    }

    return (

        <div className="grid gap-6 lg:grid-cols-3">

            {data.map((service) => (

                <ServiceCard
                    key={service._id}
                    service={service}
                />

            ))}

        </div>

    );

};

export default ServiceGrid;