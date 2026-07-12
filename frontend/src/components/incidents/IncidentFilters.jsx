import { Search } from "lucide-react";
import { useServices } from "@/hooks/services/useServices";

const IncidentFilters = ({
    filters,
    setFilters,
}) => {

    const {

        data: services = [],

    } = useServices();

    return (

        <div className="mt-6 flex flex-wrap gap-4 rounded-2xl border border-border bg-surface p-5">

            {/* Search */}

            <div className="relative flex-1 min-w-[260px]">

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

                    placeholder="Search incidents..."

                    className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4"

                />

            </div>

            {/* Status */}

            <select

                value={filters.status}

                onChange={(e) =>

                    setFilters((prev) => ({

                        ...prev,

                        status: e.target.value,

                    }))

                }

                className="h-11 rounded-xl border border-border bg-background px-4"

            >

                <option value="">All Status</option>

                <option value="open">Open</option>

                <option value="investigating">Investigating</option>

                <option value="resolved">Resolved</option>

            </select>

            {/* Severity */}

            <select

                value={filters.severity}

                onChange={(e) =>

                    setFilters((prev) => ({

                        ...prev,

                        severity: e.target.value,

                    }))

                }

                className="h-11 rounded-xl border border-border bg-background px-4"

            >

                <option value="">All Severity</option>

                <option value="P0">P0</option>

                <option value="P1">P1</option>

                <option value="P2">P2</option>

            </select>

            {/* Service */}

            <select

                value={filters.service}

                onChange={(e) =>

                    setFilters((prev) => ({

                        ...prev,

                        service: e.target.value,

                    }))

                }

                className="h-11 rounded-xl border border-border bg-background px-4"

            >

                <option value="">All Services</option>

                {

                    services.map((service) => (

                        <option

                            key={service._id}

                            value={service._id}

                        >

                            {service.name}

                        </option>

                    ))

                }

            </select>

        </div>

    );

};

export default IncidentFilters;