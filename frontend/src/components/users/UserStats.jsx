import { lazy, Suspense, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import ComponentLoader from "@/components/common/ComponentLoader";

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

        return <ComponentLoader />;

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

            <div className="mt-8">

                <Suspense fallback={<ComponentLoader />}>

                    <UserStats users={users} />

                </Suspense>

            </div>

            <div className="mt-6">

                <Suspense fallback={<ComponentLoader />}>

                    <UserFilters

                        filters={filters}

                        setFilters={setFilters}

                    />

                </Suspense>

            </div>

            <div className="mt-6">

                <Suspense fallback={<ComponentLoader />}>

                    <UserTable

                        users={users}

                        filters={filters}

                    />

                </Suspense>

            </div>

        </>

    );

};

export default UserManagement;