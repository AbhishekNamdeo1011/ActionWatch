import { Search } from "lucide-react";

const UserFilters = ({
    filters,
    setFilters,
}) => {

    return (

        <div className="flex flex-wrap gap-4 rounded-2xl border border-border bg-surface p-5">

            {/* Search */}

            <div className="relative min-w-[260px] flex-1">

                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                    value={filters.search}
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            search: e.target.value,
                        }))
                    }
                    placeholder="Search users..."
                    className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 outline-none transition focus:border-primary"
                />

            </div>

            {/* Role Filter */}

            <select
                value={filters.role}
                onChange={(e) =>
                    setFilters((prev) => ({
                        ...prev,
                        role: e.target.value,
                    }))
                }
                className="h-11 rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
            >

                <option value="">

                    All Roles

                </option>

                <option value="owner">

                    Owner

                </option>

                <option value="admin">

                    Admin

                </option>

                <option value="responder">

                    Responder

                </option>

                <option value="viewer">

                    Viewer

                </option>

            </select>

        </div>

    );

};

export default UserFilters;