import Skeleton from "@/components/skeletons/Skeleton";

const AnalyticsSkeleton = () => {

    return (

        <div className="space-y-6">

            {/* Header */}

            <div>

                <Skeleton className="h-9 w-56" />
                <Skeleton className="mt-3 h-5 w-80" />

            </div>

            {/* KPI Cards */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {

                    Array.from({ length: 4 }).map((_, index) => (

                        <div
                            key={index}
                            className="rounded-2xl border border-border p-6"
                        >

                            <Skeleton className="mb-4 h-5 w-24" />
                            <Skeleton className="h-10 w-20" />

                        </div>

                    ))

                }

            </div>

            {/* Charts */}

            <div className="grid gap-6 xl:grid-cols-2">

                <div className="rounded-2xl border border-border p-6">

                    <Skeleton className="mb-5 h-6 w-40" />

                    <Skeleton className="h-72 w-full rounded-xl" />

                </div>

                <div className="rounded-2xl border border-border p-6">

                    <Skeleton className="mb-5 h-6 w-40" />

                    <Skeleton className="h-72 w-full rounded-xl" />

                </div>

            </div>

            {/* Bottom Table */}

            <div className="rounded-2xl border border-border p-6">

                <Skeleton className="mb-6 h-6 w-40" />

                <div className="space-y-4">

                    {

                        Array.from({ length: 6 }).map((_, index) => (

                            <Skeleton
                                key={index}
                                className="h-14 w-full rounded-xl"
                            />

                        ))

                    }

                </div>

            </div>

        </div>

    );

};

export default AnalyticsSkeleton;