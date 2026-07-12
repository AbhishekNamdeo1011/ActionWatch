import { NavLink } from "react-router-dom";

import Logo from "@/assets/logos/actionwatch-logo.svg";

import { sidebarItems } from "@/config/sidebar.config";

import SidebarItem from "./SidebarItem";

import { useAuth } from "@/hooks/auth/useAuth";

const Sidebar = () => {

    const { user } = useAuth();

    const filteredItems = sidebarItems.filter((item) =>
        item.roles.includes(user?.role)
    );

    return (

        <aside className="hidden lg:flex w-[270px] shrink-0 flex-col border-r border-border bg-sidebar">

            {/* Logo */}

            <div className="flex h-[72px] items-center border-b border-border px-6">

                <img
                    src={Logo}
                    alt="ActionWatch"
                    className="h-9"
                />

            </div>

            {/* Navigation */}

            <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">

                {filteredItems.map((item) => (

                    <SidebarItem

                        key={item.path}

                        item={item}

                    />

                ))}

            </nav>

            {/* Footer */}

            <div className="border-t border-border p-5">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">

                        {user?.username?.charAt(0).toUpperCase()}

                    </div>

                    <div className="overflow-hidden">

                        <p className="truncate text-sm font-semibold text-foreground">

                            {user?.username}

                        </p>

                        <p className="truncate text-xs capitalize text-muted">

                            {user?.role}

                        </p>

                    </div>

                </div>

            </div>

        </aside>

    );

};

export default Sidebar;