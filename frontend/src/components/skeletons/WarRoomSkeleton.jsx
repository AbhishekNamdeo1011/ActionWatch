import Skeleton from "./Skeleton";

const WarRoomSkeleton = () => {

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <Skeleton className="h-9 w-72" />

                    <Skeleton className="mt-3 h-5 w-56" />

                </div>

                <Skeleton className="h-11 w-40 rounded-xl" />

            </div>

            {/* Command Center */}

            <div className="rounded-2xl border border-border p-6">

                <Skeleton className="h-7 w-56" />

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

                    {

                        Array.from({ length: 6 }).map((_, index) => (

                            <Skeleton

                                key={index}

                                className="h-12 rounded-xl"

                            />

                        ))

                    }

                </div>

            </div>

            {/* Timeline */}

            <div className="rounded-2xl border border-border p-6">

                <Skeleton className="h-7 w-40" />

                <div className="mt-6 space-y-5">

                    {

                        Array.from({ length: 5 }).map((_, index) => (

                            <div
                                key={index}
                                className="flex gap-4"
                            >

                                <Skeleton className="h-10 w-10 rounded-full" />

                                <div className="flex-1">

                                    <Skeleton className="h-5 w-52" />

                                    <Skeleton className="mt-2 h-4 w-full" />

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

            {/* Service Health */}

            <div className="rounded-2xl border border-border p-6">

                <Skeleton className="h-7 w-52" />

                <Skeleton className="mt-5 h-36 rounded-xl" />

            </div>

            {/* AI Analysis */}

            <div className="rounded-2xl border border-border p-6">

                <Skeleton className="h-7 w-44" />

                <div className="mt-5 space-y-4">

                    <Skeleton className="h-5 w-4/5" />

                    <Skeleton className="h-5 w-full" />

                    <Skeleton className="h-5 w-3/4" />

                    <Skeleton className="h-24 rounded-xl" />

                </div>

            </div>

            {/* Postmortem */}

            <div className="rounded-2xl border border-border p-6">

                <Skeleton className="h-7 w-44" />

                <Skeleton className="mt-5 h-32 rounded-xl" />

            </div>

            {/* Responders */}

            <div className="rounded-2xl border border-border p-6">

                <Skeleton className="h-7 w-44" />

                <div className="mt-6 grid gap-4 md:grid-cols-2">

                    {

                        Array.from({ length: 2 }).map((_, index) => (

                            <div
                                key={index}
                                className="rounded-xl border border-border p-5"
                            >

                                <div className="flex items-center gap-4">

                                    <Skeleton className="h-12 w-12 rounded-full" />

                                    <div>

                                        <Skeleton className="h-5 w-32" />

                                        <Skeleton className="mt-2 h-4 w-44" />

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

            {/* Similar Incidents */}

            <div className="rounded-2xl border border-border p-6">

                <Skeleton className="h-7 w-52" />

                <div className="mt-6 space-y-4">

                    {

                        Array.from({ length: 3 }).map((_, index) => (

                            <Skeleton

                                key={index}

                                className="h-16 rounded-xl"

                            />

                        ))

                    }

                </div>

            </div>

            {/* Live Logs */}

            <div className="rounded-2xl border border-border p-6">

                <Skeleton className="h-7 w-40" />

                <Skeleton className="mt-5 h-56 rounded-xl" />

            </div>

            {/* Resolve */}

            <div className="rounded-2xl border border-border p-6">

                <Skeleton className="h-7 w-52" />

                <Skeleton className="mt-6 h-12 w-48 rounded-xl" />

            </div>

        </div>

    );

};

export default WarRoomSkeleton;