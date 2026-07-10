import Card from "@/components/common/Card";

const timeline = [
    {
        id: 1,
        title: "Database latency detected",
        user: "AI Monitor",
        time: "2 min ago",
        color: "bg-danger",
    },
    {
        id: 2,
        title: "Incident acknowledged",
        user: "Abhishek",
        time: "5 min ago",
        color: "bg-warning",
    },
    {
        id: 3,
        title: "War room created",
        user: "System",
        time: "8 min ago",
        color: "bg-info",
    },
    {
        id: 4,
        title: "Service recovered",
        user: "Auto Recovery",
        time: "18 min ago",
        color: "bg-success",
    },
];

const IncidentTimeline = () => {

    return (

        <Card
            title="Incident Timeline"
            subtitle="Recent activity"
        >

            <div className="space-y-6">

                {timeline.map((item) => (

                    <div
                        key={item.id}
                        className="flex gap-4"
                    >

                        <div className="flex flex-col items-center">

                            <div
                                className={`h-3 w-3 rounded-full ${item.color}`}
                            />

                            <div className="mt-1 h-full w-px bg-border" />

                        </div>

                        <div className="pb-6">

                            <h4 className="font-medium text-foreground">

                                {item.title}

                            </h4>

                            <p className="mt-1 text-sm text-muted">

                                {item.user}

                            </p>

                            <span className="text-xs text-muted">

                                {item.time}

                            </span>

                        </div>

                    </div>

                ))}

            </div>

        </Card>

    );

};

export default IncidentTimeline;