import Card from "@/components/common/Card";
import Timeline from "@/components/timeline/Timeline";

const TimelineCard = ({ timeline }) => {

    return (

        <Card title="Live Timeline">

            <Timeline events={timeline} />

        </Card>

    );

};

export default TimelineCard;