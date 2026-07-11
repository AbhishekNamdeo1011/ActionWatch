import Card from "@/components/common/Card";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const COLORS = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
];

const SeverityChart = ({ data }) => {

    return (

        <Card
            title="Incidents by Severity"
            subtitle="Distribution of incidents based on severity."
        >

            <div className="h-[350px]">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="count"
                            nameKey="severity"
                            innerRadius={70}
                            outerRadius={120}
                            paddingAngle={3}
                        >

                            {

                                data.map((entry, index) => (

                                    <Cell
                                        key={entry.severity}
                                        fill={
                                            COLORS[
                                                index % COLORS.length
                                            ]
                                        }
                                    />

                                ))

                            }

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </Card>

    );

};

export default SeverityChart;