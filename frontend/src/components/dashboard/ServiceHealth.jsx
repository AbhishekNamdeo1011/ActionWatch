import Card from "@/components/common/Card";

const services = [
    {
        id: 1,
        name: "Authentication API",
        uptime: "99.98%",
        status: "Healthy",
    },
    {
        id: 2,
        name: "Payment Service",
        uptime: "99.91%",
        status: "Healthy",
    },
    {
        id: 3,
        name: "Notification Queue",
        uptime: "97.40%",
        status: "Warning",
    },
    {
        id: 4,
        name: "AI Service",
        uptime: "84.12%",
        status: "Down",
    },
];

const statusStyles = {
    Healthy: "bg-success/15 text-success",
    Warning: "bg-warning/15 text-warning",
    Down: "bg-danger/15 text-danger",
};

const dotStyles = {
    Healthy: "bg-success",
    Warning: "bg-warning",
    Down: "bg-danger",
};

const ServiceHealth = () => {

    return (

        <Card
            title="Service Health"
            subtitle="Current status of monitored services"
        >

<div className="flex flex-col gap-4">
                {services.map((service) => (

                    <div
                        key={service.id}
className="flex w-full items-center justify-between rounded-xl border border-border p-4 transition hover:bg-background"                    >

                        <div className="flex items-center gap-4">

                            <div className={`h-3 w-3 rounded-full ${dotStyles[service.status]}`} />

                            <div>

                                <h4 className="font-medium text-foreground">

                                    {service.name}

                                </h4>

                                <p className="mt-1 text-xs text-muted">

                                    Uptime: {service.uptime}

                                </p>

                            </div>

                        </div>

                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[service.status]}`}>

                            {service.status}

                        </span>

                    </div>

                ))}

            </div>

        </Card>

    );

};

export default ServiceHealth;