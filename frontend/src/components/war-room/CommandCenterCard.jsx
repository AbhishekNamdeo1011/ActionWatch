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
}) => {

    return (

        <Card title="Command Center">

            <div className="grid gap-3">

                <button
    onClick={onGenerateAI}
    className="flex items-center gap-3 rounded-xl border border-border p-3 transition hover:border-primary"
>
    <Brain size={18} />
    Generate AI Analysis
</button>

<button
    onClick={onGeneratePostmortem}
    className="flex items-center gap-3 rounded-xl border border-border p-3 transition hover:border-primary"
>
    <FileText size={18} />
    Generate Postmortem
</button>

<button
    onClick={onRefresh}
    className="flex items-center gap-3 rounded-xl border border-border p-3 transition hover:border-primary"
>
    <RefreshCw size={18} />
    Refresh Data
</button>

            </div>

        </Card>

    );

};

export default CommandCenterCard;