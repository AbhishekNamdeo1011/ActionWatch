import Card from "@/components/common/Card";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const STATUS_COLORS = {
    UP: "#22c55e",
    DOWN: "#ef4444",
    MAINTENANCE: "#f59e0b",
};

const ServiceHealthChart = ({ data }) => {

    return (

        <Card
            title="Service Health"
            subtitle="Overall health status of monitored services."
        >

            <div className="h-[350px]">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="count"
                            nameKey="status"
                            innerRadius={70}
                            outerRadius={120}
                            paddingAngle={4}
                        >

                            {

                                data.map((entry) => (

                                    <Cell
                                        key={entry.status}
                                        fill={
                                            STATUS_COLORS[
                                                entry.status
                                            ] || "#3b82f6"
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

export default ServiceHealthChart;