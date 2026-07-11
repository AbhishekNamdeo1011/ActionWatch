import TimelineItem from "./TimelineItem";

const Timeline = ({ events }) => {

    if (!events.length) {

        return (

            <div className="py-12 text-center text-muted">

                No timeline activity yet.

            </div>

        );

    }

    return (

        <div className="relative">

            <div className="absolute left-5 top-0 h-full w-px bg-border" />

            <div className="space-y-8">

                {events.map((event) => (

                    <TimelineItem

                        key={event._id}

                        event={event}

                    />

                ))}

            </div>

        </div>

    );

};

export default Timeline;