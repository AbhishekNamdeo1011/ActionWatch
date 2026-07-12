import Skeleton from "./Skeleton";

const IncidentDetailsSkeleton = () => {

    return (

        <div className="space-y-8">

            {/* Header */}

            <div className="flex items-start justify-between">

                <div>

                    <Skeleton className="h-10 w-72" />

                    <Skeleton className="mt-3 h-5 w-40" />

                </div>

                <div className="flex gap-3">

                    <Skeleton className="h-11 w-40 rounded-xl" />

                    <Skeleton className="h-11 w-32 rounded-xl" />

                </div>

            </div>

            {/* Overview Cards */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {

                    Array.from({ length: 4 }).map((_, index) => (

                        <div
                            key={index}
                            className="rounded-2xl border border-border p-5"
                        >

                            <Skeleton className="h-4 w-24" />

                            <Skeleton className="mt-4 h-8 w-32" />

                        </div>

                    ))

                }

            </div>

            {/* Description */}

            <div className="rounded-2xl border border-border p-6">

                <Skeleton className="h-6 w-40" />

                <Skeleton className="mt-6 h-5 w-full" />
                <Skeleton className="mt-3 h-5 w-11/12" />
                <Skeleton className="mt-3 h-5 w-9/12" />

            </div>

            {/* Error Logs */}

            <div className="rounded-2xl border border-border p-6">

                <Skeleton className="h-6 w-36" />

                <Skeleton className="mt-6 h-28 rounded-xl" />

            </div>

            {/* AI Recommendations */}

            <div className="rounded-2xl border border-border p-6">

                <Skeleton className="h-6 w-48" />

                {

                    Array.from({ length: 4 }).map((_, index) => (

                        <Skeleton
                            key={index}
                            className="mt-4 h-5 w-full"
                        />

                    ))

                }

            </div>

            {/* Root Causes */}

            <div className="rounded-2xl border border-border p-6">

                <Skeleton className="h-6 w-52" />

                {

                    Array.from({ length: 2 }).map((_, index) => (

                        <div
                            key={index}
                            className="mt-6 rounded-xl border border-border p-5"
                        >

                            <Skeleton className="h-5 w-56" />

                            <Skeleton className="mt-4 h-4 w-full" />
                            <Skeleton className="mt-2 h-4 w-10/12" />

                            <Skeleton className="mt-5 h-8 w-28 rounded-full" />

                            <Skeleton className="mt-6 h-16 rounded-xl" />

                        </div>

                    ))

                }

            </div>

            {/* Responders */}

            <div className="rounded-2xl border border-border p-6">

                <Skeleton className="h-6 w-44" />

                <div className="mt-6 grid gap-4 md:grid-cols-2">

                    {

                        Array.from({ length: 2 }).map((_, index) => (

                            <div
                                key={index}
                                className="rounded-xl border border-border p-5"
                            >

                                <div className="flex justify-between">

                                    <div>

                                        <Skeleton className="h-5 w-32" />

                                        <Skeleton className="mt-3 h-4 w-48" />

                                    </div>

                                    <Skeleton className="h-12 w-12 rounded-full" />

                                </div>

                                <Skeleton className="mt-6 h-8 w-24 rounded-full" />

                            </div>

                        ))

                    }

                </div>

            </div>

            {/* Timeline */}

            <div className="rounded-2xl border border-border p-6">

                <Skeleton className="h-6 w-36" />

                {

                    Array.from({ length: 5 }).map((_, index) => (

                        <Skeleton
                            key={index}
                            className="mt-5 h-5 w-full"
                        />

                    ))

                }

            </div>

        </div>

    );

};

export default IncidentDetailsSkeleton;