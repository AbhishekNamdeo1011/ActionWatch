import Skeleton from "@/components/common/Skeleton";

const UserSkeleton = () => {

    return (

        <div className="space-y-6">

            {/* Stats */}

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

                {[...Array(5)].map((_, i) => (

                    <div
                        key={i}
                        className="rounded-2xl border border-border p-5"
                    >

                        <Skeleton className="mb-3 h-5 w-24" />

                        <Skeleton className="h-8 w-16" />

                    </div>

                ))}

            </div>

            {/* Filters */}

            <div className="rounded-2xl border border-border p-5">

                <div className="flex gap-4">

                    <Skeleton className="h-11 flex-1 rounded-xl" />

                    <Skeleton className="h-11 w-44 rounded-xl" />

                </div>

            </div>

            {/* Table */}

            <div className="rounded-2xl border border-border p-5">

                <Skeleton className="mb-6 h-6 w-40" />

                {[...Array(6)].map((_, i) => (

                    <Skeleton
                        key={i}
                        className="mb-3 h-16 rounded-xl"
                    />

                ))}

            </div>

        </div>

    );

};

export default UserSkeleton;