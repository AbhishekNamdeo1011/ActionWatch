import Skeleton from "./Skeleton";

const ProfileSkeleton = () => {

    return (

        <div className="space-y-6">

            <Skeleton className="h-10 w-64" />

            <Skeleton className="h-5 w-96" />

            <div className="grid gap-6 xl:grid-cols-3">

                {/* Left Card */}

                <div className="rounded-2xl border border-border p-6">

                    <div className="flex flex-col items-center">

                        <Skeleton className="h-24 w-24 rounded-full" />

                        <Skeleton className="mt-5 h-7 w-40" />

                        <Skeleton className="mt-3 h-6 w-24 rounded-full" />

                        <Skeleton className="mt-5 h-5 w-52" />

                        <Skeleton className="mt-6 h-5 w-full" />

                        <Skeleton className="mt-2 h-5 w-4/5" />

                    </div>

                </div>

                {/* Right */}

                <div className="space-y-6 xl:col-span-2">

                    <div className="rounded-2xl border border-border p-6">

                        <Skeleton className="h-7 w-52" />

                        <Skeleton className="mt-2 h-5 w-72" />

                        <Skeleton className="mt-8 h-11 w-full rounded-xl" />

                        <Skeleton className="mt-5 h-11 w-full rounded-xl" />

                        <Skeleton className="mt-5 h-10 w-28 rounded-xl" />

                    </div>

                    <div className="rounded-2xl border border-border p-6">

                        <Skeleton className="h-7 w-52" />

                        <div className="mt-6 grid gap-4 md:grid-cols-2">

                            {

                                Array.from({ length: 4 }).map((_, i) => (

                                    <Skeleton

                                        key={i}

                                        className="h-20 rounded-xl"

                                    />

                                ))

                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ProfileSkeleton;