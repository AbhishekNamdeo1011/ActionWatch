import { lazy, Suspense, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import UserSkeleton from "@/components/skeletons/UserSkeleton";

import { useUsers } from "@/hooks/useUsers";

const UserStats = lazy(() =>
    import("@/components/users/UserStats")
);

const UserFilters = lazy(() =>
    import("@/components/users/UserFilters")
);

const UserTable = lazy(() =>
    import("@/components/users/UserTable")
);

const UserManagement = () => {

    const [filters, setFilters] = useState({

        search: "",

        role: "",

    });

    const {

        data: users = [],

        isLoading,

        error,

    } = useUsers();

    if (isLoading) {

        return <UserSkeleton />;

    }

    if (error) {

        return (

            <div className="flex h-64 items-center justify-center">

                <p className="text-red-500">

                    Failed to load users.

                </p>

            </div>

        );

    }

    return (

        <>

            <PageHeader

                title="User Management"

                description="Manage users and their roles."

            />

            <Suspense fallback={<UserSkeleton />}>

                <div className="mt-8">

                    <UserStats users={users} />

                </div>

                <div className="mt-6">

                    <UserFilters
                        filters={filters}
                        setFilters={setFilters}
                    />

                </div>

                <div className="mt-6">

                    <UserTable
                        users={users}
                        filters={filters}
                    />

                </div>

            </Suspense>

        </>

    );

};

export default UserManagement;