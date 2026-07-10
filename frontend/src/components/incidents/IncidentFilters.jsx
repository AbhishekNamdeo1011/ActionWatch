import { Search } from "lucide-react";

const IncidentFilters = () => {

    return (

        <div className="mt-6 flex flex-wrap gap-4 rounded-2xl border border-border bg-surface p-5">

            <div className="relative flex-1 min-w-[260px]">

                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />

                <input

                    placeholder="Search incidents..."

                    className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4"

                />

            </div>

            <select className="h-11 rounded-xl border border-border bg-background px-4">

                <option>Status</option>

            </select>

            <select className="h-11 rounded-xl border border-border bg-background px-4">

                <option>Severity</option>

            </select>

            <select className="h-11 rounded-xl border border-border bg-background px-4">

                <option>Service</option>

            </select>

        </div>

    );

};

export default IncidentFilters;