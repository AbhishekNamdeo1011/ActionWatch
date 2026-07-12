import Skeleton from "./Skeleton";
import PageHeaderSkeleton from "./PageHeaderSkeleton";
import StatsCardSkeleton from "./StatsCardSkeleton";

const DashboardSkeleton = () => {

    return (

        <>

            <PageHeaderSkeleton />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {Array.from({ length: 4 }).map((_, index) => (

                    <StatsCardSkeleton key={index} />

                ))}

            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">

                <Skeleton className="h-[360px]" />

                <Skeleton className="h-[360px]" />

                <Skeleton className="h-[360px]" />

            </div>

            <Skeleton className="mt-8 h-[450px]" />

        </>

    );

};

export default DashboardSkeleton;