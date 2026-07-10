import { ChevronDown } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

const ProfileDropdown = () => {

    const { user } = useAuth();

    return (

        <button className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 transition hover:bg-surface-hover">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-white">

                {user?.username?.charAt(0).toUpperCase()}

            </div>

            <div className="hidden text-left lg:block">

                <p className="text-sm font-semibold text-foreground">

                    {user?.username}

                </p>

                <p className="text-xs capitalize text-muted">

                    {user?.role}

                </p>

            </div>

            <ChevronDown
                size={18}
                className="text-muted"
            />

        </button>

    );

};

export default ProfileDropdown;