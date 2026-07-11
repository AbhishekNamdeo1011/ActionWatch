import Card from "@/components/common/Card";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
} from "recharts";

const StatusChart = ({ data }) => {

    return (

        <Card
            title="Incidents by Status"
            subtitle="Current incident distribution."
        >

            <div className="h-[350px]">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 20,
                            left: 0,
                            bottom: 10,
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="status"
                            tick={{
                                fontSize: 13,
                            }}
                        />

                        <YAxis
                            allowDecimals={false}
                            tick={{
                                fontSize: 13,
                            }}
                        />

                        <Tooltip
                            cursor={{
                                fill: "rgba(255,255,255,0.05)",
                            }}
                        />

                        <Bar
                            dataKey="count"
                            radius={[8, 8, 0, 0]}
                        >

                            {data.map((entry) => {

                                let color = "#3b82f6";

                                if (entry.status === "open") {

                                    color = "#ef4444";

                                } else if (entry.status === "investigating") {

                                    color = "#f59e0b";

                                } else if (entry.status === "resolved") {

                                    color = "#22c55e";

                                }

                                return (

                                    <Cell
                                        key={entry.status}
                                        fill={color}
                                    />

                                );

                            })}

                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </Card>

    );

};

export default StatusChart;