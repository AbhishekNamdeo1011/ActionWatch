import Card from "@/components/common/Card";
import Skeleton from "@/components/skeletons/Skeleton";

const UserSkeleton = () => {
    return (
        <div className="space-y-6">

            {/* Stats */}

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                {[1,2,3,4].map((item) => (

                    <Card key={item}>

                        <Skeleton className="h-4 w-24 mb-4" />

                        <Skeleton className="h-8 w-14" />

                    </Card>

                ))}

            </div>

            {/* Filters */}

            <Card>

                <div className="flex gap-4">

                    <Skeleton className="h-11 flex-1 rounded-xl" />

                    <Skeleton className="h-11 w-48 rounded-xl" />

                </div>

            </Card>

            {/* Table */}

            <Card>

                <Skeleton className="mb-6 h-6 w-48" />

                <div className="space-y-4">

                    {[1,2,3,4,5,6].map((item)=>(

                        <Skeleton
                            key={item}
                            className="h-16 w-full rounded-xl"
                        />

                    ))}

                </div>

            </Card>

        </div>
    );
};

export default UserSkeleton;