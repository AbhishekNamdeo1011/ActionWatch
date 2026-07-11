import Card from "@/components/common/Card";

const LiveLogsCard = ({ logs }) => {

    return (

        <Card title="Live Logs">

            <pre className="max-h-96 overflow-auto rounded-xl bg-black p-5 font-mono text-sm text-green-400">

                {

                    logs ||

                    "No logs available."

                }

            </pre>

        </Card>

    );

};

export default LiveLogsCard;