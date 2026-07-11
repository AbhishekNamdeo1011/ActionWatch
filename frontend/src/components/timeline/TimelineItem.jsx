import {
    Clock3,
    User,
    AlertTriangle,
    CheckCircle2,
} from "lucide-react";

const TimelineItem = ({ event }) => {

    const icon = () => {

        switch (event.eventType) {

            case "created":

                return <Clock3 size={18} />;

            case "assigned":

                return <User size={18} />;

            case "resolved":

                return <CheckCircle2 size={18} />;

            default:

                return <AlertTriangle size={18} />;

        }

    };

    return (

        <div className="relative flex gap-5">

            <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">

                {icon()}

            </div>

            <div className="flex-1 rounded-xl border border-border bg-card p-5">

                <div className="flex items-center justify-between">

                    <h4 className="font-semibold">

                        {event.message}

                    </h4>

                    <span className="text-xs text-muted">

                        {new Date(

                            event.createdAt

                        ).toLocaleString()}

                    </span>

                </div>

                {

                    event.author && (

                        <p className="mt-2 text-sm text-muted">

                            By {event.author.username}

                        </p>

                    )

                }

            </div>

        </div>

    );

};

export default TimelineItem;