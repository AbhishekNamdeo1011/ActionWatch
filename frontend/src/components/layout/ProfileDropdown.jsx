import { useEffect, useRef, useState } from "react";
import { ChevronDown, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { memo } from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import { logoutService } from "@/services/auth.service";
import {

    disconnectSocket,

} from "@/lib/socket";
const ProfileDropdown = () => {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (

                dropdownRef.current &&

                !dropdownRef.current.contains(event.target)

            ) {

                setOpen(false);

            }

        };

        document.addEventListener(

            "mousedown",

            handleClickOutside

        );

        return () => {

            document.removeEventListener(

                "mousedown",

                handleClickOutside

            );

        };

    }, []);

const handleLogout = async () => {

    try {

        await logoutService();

    }

    catch (error) {

        console.error(error);

    }

    /*
    =====================================
    Disconnect Socket
    =====================================
    */

disconnectSocket();
    /*
    =====================================
    Clear Auth
    =====================================
    */

    logout();

    toast.success(

        "Logged out successfully."

    );

    navigate(

        "/login",

        {

            replace: true,

        }

    );

};

    return (

        <div
            ref={dropdownRef}
            className="relative"
        >

            {/* Button */}

            <button

                onClick={() => setOpen((prev) => !prev)}

                className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 transition hover:bg-surface-hover"

            >

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-white">

                    {user?.username?.charAt(0).toUpperCase()}

                </div>

                <div className="hidden text-left lg:block">

                    <p className="text-sm font-semibold">

                        {user?.username}

                    </p>

                    <p className="text-xs capitalize text-muted">

                        {user?.role}

                    </p>

                </div>

                <ChevronDown
                    size={18}
                    className={`transition ${open ? "rotate-180" : ""}`}
                />

            </button>

            {/* Dropdown */}

            {

                open && (

                    <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">

                        <button

                            onClick={() => {

                                navigate("/profile");

                                setOpen(false);

                            }}

                            className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-background"

                        >

                            <User size={18} />

                            <span>

                                My Profile

                            </span>

                        </button>

                        <div className="border-t border-border" />

                        <button

                            onClick={handleLogout}

                            className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-500 transition hover:bg-background"

                        >

                            <LogOut size={18} />

                            <span>

                                Logout

                            </span>

                        </button>

                    </div>

                )

            }

        </div>

    );

};

export default memo(ProfileDropdown);