import { NavLink } from "react-router-dom";
import {memo} from "react";
const SidebarItem = ({ item }) => {

    const Icon = item.icon;

    return (

        <NavLink

            to={item.path}

            className={({ isActive }) =>
                `flex h-12 items-center gap-3 rounded-xl px-4 text-sm font-medium transition-all ${
                    isActive
                        ? "bg-primary text-white"
                        : "text-muted hover:bg-surface hover:text-foreground"
                }`
            }

        >

            <Icon size={20} />

            <span>{item.title}</span>

        </NavLink>

    );

};

export default memo(SidebarItem);