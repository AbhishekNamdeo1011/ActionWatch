import Card from "@/components/common/Card";
import {
    Users,
    Shield,
    UserCheck,
    Eye,
} from "lucide-react";

const UserStats = ({ users = [] }) => {

    const totalUsers = users.length;

    const admins = users.filter(
        (user) => user.role === "admin"
    ).length;

    const responders = users.filter(
        (user) => user.role === "responder"
    ).length;

    const viewers = users.filter(
        (user) => user.role === "viewer"
    ).length;

    const stats = [

        {
            title: "Total Users",
            value: totalUsers,
            icon: Users,
            color: "text-primary",
        },

        {
            title: "Admins",
            value: admins,
            icon: Shield,
            color: "text-blue-500",
        },

        {
            title: "Responders",
            value: responders,
            icon: UserCheck,
            color: "text-yellow-500",
        },

        {
            title: "Viewers",
            value: viewers,
            icon: Eye,
            color: "text-green-500",
        },

    ];

    return (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {

                stats.map((item) => {

                    const Icon = item.icon;

                    return (

                        <Card
                            key={item.title}
                            className="p-6"
                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-muted">

                                        {item.title}

                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold">

                                        {item.value}

                                    </h2>

                                </div>

                                <div
                                    className={`rounded-xl bg-background p-3 ${item.color}`}
                                >

                                    <Icon size={24} />

                                </div>

                            </div>

                        </Card>

                    );

                })

            }

        </div>

    );

};

export default UserStats;