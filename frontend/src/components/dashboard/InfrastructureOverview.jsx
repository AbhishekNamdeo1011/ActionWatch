import Card from "@/components/common/Card";

const services = [
    {
        name: "Authentication",
        latency: "43 ms",
        uptime: "99.98%",
        cpu: 32,
    },
    {
        name: "Gateway",
        latency: "76 ms",
        uptime: "99.90%",
        cpu: 61,
    },
    {
        name: "Database",
        latency: "120 ms",
        uptime: "99.45%",
        cpu: 84,
    },
    {
        name: "Redis",
        latency: "28 ms",
        uptime: "99.99%",
        cpu: 18,
    },
];

const InfrastructureOverview = () => {

    return (

        <Card
            title="Infrastructure Overview"
            subtitle="Current service metrics"
        >

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b border-border text-left text-sm text-muted">

                            <th className="pb-4">Service</th>

                            <th className="pb-4">Latency</th>

                            <th className="pb-4">CPU</th>

                            <th className="pb-4">Uptime</th>

                        </tr>

                    </thead>

                    <tbody>

                        {services.map((service) => (

                            <tr
                                key={service.name}
                                className="border-b border-border last:border-none"
                            >

                                <td className="py-5 font-medium">

                                    {service.name}

                                </td>

                                <td>{service.latency}</td>

                                <td>

                                    <div className="w-40 rounded-full bg-background">

                                        <div
                                            className="h-2 rounded-full bg-primary"
                                            style={{
                                                width: `${service.cpu}%`,
                                            }}
                                        />

                                    </div>

                                </td>

                                <td>{service.uptime}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </Card>

    );

};

export default InfrastructureOverview;