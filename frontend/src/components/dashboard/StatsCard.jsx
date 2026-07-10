import { TrendingUp } from "lucide-react";

const StatsCard = ({
    title,
    value,
    change,
    icon: Icon,
}) => {

    return (

        <div className="rounded-2xl border border-border bg-surface p-6 transition hover:border-primary">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-muted">

                        {title}

                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-foreground">

                        {value}

                    </h2>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-background">

                    <Icon size={26} />

                </div>

            </div>

            <div className="mt-6 flex items-center gap-2 text-sm">

                <TrendingUp
                    size={16}
                    className="text-success"
                />

                <span className="font-semibold text-success">

                    {change}

                </span>

                <span className="text-muted">

                    this week

                </span>

            </div>

        </div>

    );

};

export default StatsCard;