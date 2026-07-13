import Card from "@/components/common/Card";

const incidents = [

    {
        id: 1,
        title: "Database latency increased",
        severity: "Critical",
        time: "5 min ago",
    },

    {
        id: 2,
        title: "API Gateway timeout",
        severity: "High",
        time: "18 min ago",
    },

    {
        id: 3,
        title: "Redis memory warning",
        severity: "Medium",
        time: "42 min ago",
    },

    {
        id: 4,
        title: "Background Worker restarted",
        severity: "Low",
        time: "1 hr ago",
    },

];

const badgeColors = {
    Critical: "bg-red-500/20 text-red-400",
    High: "bg-orange-500/20 text-orange-400",
    Medium: "bg-yellow-500/20 text-yellow-400",
    Low: "bg-green-500/20 text-green-400",
};

const RecentIncidents = () => {

    return (

        <Card

            title="Recent Incidents"

            subtitle="Latest infrastructure alerts"

        >

<div className="flex flex-col gap-4">
                {incidents.map((incident) => (

                    <div
                        key={incident._id}
className="flex w-full items-center justify-between rounded-xl border border-border p-4 transition hover:bg-background"                    >

                        <div>

                            <h4 className="font-medium text-foreground">

                                {incident.title}

                            </h4>

                            <p className="mt-1 text-xs text-muted">

                                {incident.time}

                            </p>

                        </div>

                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${badgeColors[incident.severity]}`}>

                            {incident.severity}

                        </span>

                    </div>

                ))}

            </div>

        </Card>

    );

};

export default RecentIncidents;