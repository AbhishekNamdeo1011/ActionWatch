import Card from "@/components/common/Card";

const AIInsights = () => {

    return (

        <Card
            title="AI Insights"
            subtitle="Generated recommendations"
        >

            <div className="space-y-5">

                <div className="rounded-xl border border-warning bg-warning/10 p-4">

                    <h4 className="font-medium text-warning">

                        High Risk

                    </h4>

                    <p className="mt-2 text-sm text-muted">

                        Database latency has increased by 37% during the last
                        hour.

                    </p>

                </div>

                <div className="rounded-xl border border-info bg-info/10 p-4">

                    <h4 className="font-medium text-info">

                        Recommendation

                    </h4>

                    <p className="mt-2 text-sm text-muted">

                        Scale database replicas and restart cache workers to
                        reduce response time.

                    </p>

                </div>

            </div>

        </Card>

    );

};

export default AIInsights;