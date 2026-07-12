import Skeleton from "./Skeleton";

const PageHeaderSkeleton = () => {
    return (
        <div className="mb-8 flex items-center justify-between">

            <div>

                <Skeleton className="h-8 w-56" />

                <Skeleton className="mt-3 h-4 w-80" />

            </div>

            <Skeleton className="h-11 w-36 rounded-xl" />

        </div>
    );
};

export default PageHeaderSkeleton;