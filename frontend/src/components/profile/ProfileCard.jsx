import Card from "@/components/common/Card";

const ROLE_COLORS = {
    owner: "bg-red-500/10 text-red-500",
    admin: "bg-blue-500/10 text-blue-500",
    responder: "bg-yellow-500/10 text-yellow-500",
    viewer: "bg-green-500/10 text-green-500",
};

const ProfileCard = ({ user }) => {

    if (!user) return null;

    return (

        <Card
            title="Profile"
            subtitle="Your account information."
        >

            <div className="flex flex-col items-center">

                {/* Avatar */}

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-bold text-white">

                    {user.username?.charAt(0).toUpperCase()}

                </div>

                {/* Username */}

                <h2 className="mt-5 text-2xl font-bold">

                    {user.username}

                </h2>

                {/* Role */}

                <span
                    className={`mt-3 rounded-full px-4 py-1 text-sm font-semibold capitalize ${ROLE_COLORS[user.role]}`}
                >

                    {user.role}

                </span>

                {/* Email */}

                <p className="mt-5 text-center text-sm text-muted">

                    {user.email}

                </p>

                {/* Expertise */}

                <div className="mt-6 w-full">

                    <h4 className="mb-3 text-sm font-semibold">

                        Expertise

                    </h4>

                    {

                        user.expertise?.length ? (

                            <div className="flex flex-wrap justify-center gap-2">

                                {

                                    user.expertise.map((item) => (

                                        <span
                                            key={item}
                                            className="rounded-full bg-background px-3 py-1 text-xs"
                                        >

                                            {item}

                                        </span>

                                    ))

                                }

                            </div>

                        ) : (

                            <p className="text-center text-sm text-muted">

                                No expertise added.

                            </p>

                        )

                    }

                </div>

            </div>

        </Card>

    );

};

export default ProfileCard;