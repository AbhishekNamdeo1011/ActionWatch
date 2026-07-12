import Card from "@/components/common/Card";
import {
    UserPlus,
    Brain,
    FileText,
    RefreshCw,
} from "lucide-react";

const CommandCenterCard = ({
    onAssign,
    onGenerateAI,
    onGeneratePostmortem,
    onRefresh,
    generatingAI,
    generatingPostmortem,
}) => {

    return (

        <Card
            title="Command Center"
            subtitle="Manage incident operations."
        >

            <div className="grid gap-3">

                <button
                    onClick={onAssign}
                    className="flex items-center gap-3 rounded-xl border border-border p-3 transition hover:border-primary hover:bg-background"
                >
                    <UserPlus size={18} />
                    Assign Responders
                </button>

                <button
                    onClick={onGenerateAI}
                    disabled={generatingAI}
                    className="flex items-center gap-3 rounded-xl border border-border p-3 transition hover:border-primary hover:bg-background disabled:opacity-50"
                >
                    <Brain size={18} />

                    {generatingAI
                        ? "Generating AI..."
                        : "Generate AI Analysis"}

                </button>

                <button
                    onClick={onGeneratePostmortem}
                    disabled={generatingPostmortem}
                    className="flex items-center gap-3 rounded-xl border border-border p-3 transition hover:border-primary hover:bg-background disabled:opacity-50"
                >
                    <FileText size={18} />

                    {generatingPostmortem
                        ? "Generating..."
                        : "Generate Postmortem"}

                </button>

                <button
                    onClick={onRefresh}
                    className="flex items-center gap-3 rounded-xl border border-border p-3 transition hover:border-primary hover:bg-background"
                >
                    <RefreshCw size={18} />
                    Refresh Data
                </button>

            </div>

        </Card>

    );

};

export default CommandCenterCard;