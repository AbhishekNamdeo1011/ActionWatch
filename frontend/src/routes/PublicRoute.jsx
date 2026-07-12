import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/auth/useAuth";

const PublicRoute = () => {

    const {

        loading,

        isAuthenticated,

    } = useAuth();

    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center bg-background">

                <div className="flex flex-col items-center gap-4">

                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />

                    <p className="text-sm text-muted">

                        Loading...

                    </p>

                </div>

            </div>

        );

    }

    if (isAuthenticated) {

        return <Navigate to="/dashboard" replace />;

    }

    return <Outlet />;

};

export default PublicRoute;