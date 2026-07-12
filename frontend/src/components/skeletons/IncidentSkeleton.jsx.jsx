import Skeleton from "@/components/skeletons/Skeleton";

const IncidentSkeleton = () => {

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <Skeleton className="h-9 w-56" />

                    <Skeleton className="mt-3 h-5 w-80" />

                </div>

                <Skeleton className="h-11 w-40 rounded-xl" />

            </div>

            {/* Filters */}

            <div className="rounded-2xl border border-border p-5">

                <div className="grid gap-4 md:grid-cols-4">

                    <Skeleton className="h-11 w-full rounded-xl" />

                    <Skeleton className="h-11 w-full rounded-xl" />

                    <Skeleton className="h-11 w-full rounded-xl" />

                    <Skeleton className="h-11 w-full rounded-xl" />

                </div>

            </div>

            {/* Table */}

            <div className="rounded-2xl border border-border p-6">

                <Skeleton className="mb-6 h-6 w-40" />

                <div className="space-y-4">

                    {[1,2,3,4,5,6,7].map((item)=>(

                        <Skeleton
                            key={item}
                            className="h-16 w-full rounded-xl"
                        />

                    ))}

                </div>

            </div>

        </div>

    );

};

export default IncidentSkeleton;