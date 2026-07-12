import Skeleton from "@/components/skeletons/Skeleton";

const DashboardSkeleton = () => {

    return (

        <div className="space-y-6">

            {/* Header */}

            <div>

                <Skeleton className="h-10 w-64" />

                <Skeleton className="mt-3 h-5 w-96" />

            </div>

            {/* Stats */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {[1,2,3,4].map((item)=>(

                    <div
                        key={item}
                        className="rounded-2xl border border-border p-6"
                    >

                        <Skeleton className="mb-4 h-5 w-24" />

                        <Skeleton className="h-10 w-20" />

                    </div>

                ))}

            </div>

            {/* Charts */}

            <div className="grid gap-6 xl:grid-cols-2">

                <div className="rounded-2xl border border-border p-6">

                    <Skeleton className="mb-5 h-6 w-48" />

                    <Skeleton className="h-72 w-full rounded-xl" />

                </div>

                <div className="rounded-2xl border border-border p-6">

                    <Skeleton className="mb-5 h-6 w-48" />

                    <Skeleton className="h-72 w-full rounded-xl" />

                </div>

            </div>

        </div>

    );

};

export default DashboardSkeleton;