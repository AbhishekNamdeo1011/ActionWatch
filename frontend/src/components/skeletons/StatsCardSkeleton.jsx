import Skeleton from "./Skeleton";

const StatsCardSkeleton = () => {
    return (

        <div className="rounded-2xl border border-border bg-surface p-6">

            <div className="flex justify-between">

                <div>

                    <Skeleton className="h-4 w-24" />

                    <Skeleton className="mt-4 h-8 w-20" />

                </div>

                <Skeleton className="h-12 w-12 rounded-xl" />

            </div>

        </div>

    );
};

export default StatsCardSkeleton;