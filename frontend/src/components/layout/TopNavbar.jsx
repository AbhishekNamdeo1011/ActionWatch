import { Menu, Search, Bell } from "lucide-react";
import { memo } from "react";
import ProfileDropdown from "./ProfileDropdown";

const TopNavbar = () => {

    return (

        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-border bg-background px-6">

            {/* Left */}

            <div className="flex items-center gap-4">

                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition hover:bg-surface lg:hidden">

                    <Menu size={20} />

                </button>

                <div className="relative hidden md:block">

                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />

                    <input
                        type="text"
                        placeholder="Search incidents..."
                        className="h-11 w-[320px] rounded-xl border border-border bg-surface pl-11 pr-4 text-sm outline-none transition focus:border-primary"
                    />

                </div>

            </div>

            {/* Right */}

            <div className="flex items-center gap-3">

                <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface transition hover:bg-surface-hover">

                    <Bell size={20} />

                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger"></span>

                </button>

                <ProfileDropdown />

            </div>

        </header>

    );

};

export default memo(TopNavbar);