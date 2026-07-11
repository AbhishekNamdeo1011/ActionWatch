import Card from "@/components/common/Card";
import {
    Brain,
    Sparkles,
} from "lucide-react";

const AIAnalysisCard = ({ incident }) => {

    return (

        <Card title="AI Investigation">

            <div className="space-y-6">

                <div>

                    <div className="mb-2 flex items-center gap-2">

                        <Brain size={18} />

                        <h3 className="font-semibold">

                            AI Summary

                        </h3>

                    </div>

                    <p className="text-muted">

                        {

                            incident.aiSummary ||

                            "AI summary has not been generated."

                        }

                    </p>

                </div>

                <div>

                    <div className="mb-2 flex items-center gap-2">

                        <Sparkles size={18} />

                        <h3 className="font-semibold">

                            Recommendations

                        </h3>

                    </div>

                    {

                        incident.aiRecommendations?.length ?

                        (

                            <ul className="list-disc space-y-2 pl-5">

                                {

                                    incident.aiRecommendations.map(

                                        (item, index) => (

                                            <li key={index}>

                                                {item}

                                            </li>

                                        )

                                    )

                                }

                            </ul>

                        )

                        :

                        (

                            <p className="text-muted">

                                No recommendations available.

                            </p>

                        )

                    }

                </div>

            </div>

        </Card>

    );

};

export default AIAnalysisCard;