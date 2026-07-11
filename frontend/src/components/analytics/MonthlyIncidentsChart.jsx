import Card from "@/components/common/Card";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const MonthlyIncidentChart = ({ data }) => {
const formatMonth = (value) => {

    const date = new Date(`${value}-01`);

    return date.toLocaleString("default", {
        month: "short",
    });

};
    return (

        <Card
            title="Monthly Incidents"
            subtitle="Incident trend over time."
        >

            <div className="h-[350px]">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart
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
                            dataKey="month"
                            tickFormatter={formatMonth}
                        />

                        <YAxis
                            allowDecimals={false}
                        />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{
                                r: 5,
                            }}
                            activeDot={{
                                r: 8,
                            }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </Card>

    );

};

export default MonthlyIncidentChart;