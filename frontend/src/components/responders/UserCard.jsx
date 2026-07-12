import { UserPlus } from "lucide-react";

const UserCard = ({
    user,
    loading,
    onAssign,
}) => {

    const roleColors = {
        owner: "bg-red-500/10 text-red-500",
        admin: "bg-blue-500/10 text-blue-500",
        responder: "bg-yellow-500/10 text-yellow-500",
        viewer: "bg-green-500/10 text-green-500",
    };

    return (

        <div className="flex items-center justify-between rounded-xl border border-border bg-background p-4 transition hover:border-primary">

            {/* Left */}

            <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">

                    {user.username?.charAt(0).toUpperCase()}

                </div>

                <div>

                    <h3 className="font-semibold text-foreground">

                        {user.username}

                    </h3>

                    <p className="text-sm text-muted">

                        {user.email}

                    </p>

                    <span
                        className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-medium capitalize ${
                            roleColors[user.role] ||
                            "bg-primary/10 text-primary"
                        }`}
                    >
                        {user.role}
                    </span>

                </div>

            </div>

            {/* Right */}

            <button
                onClick={onAssign}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >

                <UserPlus size={16} />

                {loading ? "Assigning..." : "Assign"}

            </button>

        </div>

    );

};

export default UserCard;