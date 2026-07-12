import Skeleton from "./Skeleton";

const IncidentTableSkeleton = () => {

    return (

        <div className="rounded-2xl border border-border bg-surface p-6">

            <div className="space-y-5">

                {Array.from({ length: 8 }).map((_, index) => (

                    <div
                        key={index}
                        className="grid grid-cols-5 items-center gap-6"
                    >

                        <Skeleton className="h-6 w-full" />

                        <Skeleton className="h-6 w-24" />

                        <Skeleton className="h-6 w-24" />

                        <Skeleton className="h-6 w-36" />

                        <Skeleton className="ml-auto h-10 w-10 rounded-full" />

                    </div>

                ))}

            </div>

        </div>

    );

};

export default IncidentTableSkeleton;