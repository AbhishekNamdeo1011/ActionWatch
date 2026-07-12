import PageHeaderSkeleton from "./PageHeaderSkeleton";
import Skeleton from "./Skeleton";
import StatsCardSkeleton from "./StatsCardSkeleton";

const AnalyticsSkeleton = () => {

    return (

        <>

            <PageHeaderSkeleton />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {Array.from({ length: 4 }).map((_, index) => (

                    <StatsCardSkeleton key={index} />

                ))}

            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">

                {Array.from({ length: 4 }).map((_, index) => (

                    <Skeleton
                        key={index}
                        className="h-[380px]"
                    />

                ))}

            </div>

        </>

    );

};

export default AnalyticsSkeleton;