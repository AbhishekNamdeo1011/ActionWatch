import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = () => {

    const {

        user,

        loading,

    } = useAuth();

    const location = useLocation();

    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center bg-background">

                <div className="flex flex-col items-center gap-4">

                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />

                    <p className="text-sm text-muted">

                        Authenticating...

                    </p>

                </div>

            </div>

        );

    }

    if (!user) {

        return (

            <Navigate

                to="/login"

                replace

                state={{

                    from: location,

                }}

            />

        );

    }

    return <Outlet />;

};

export default ProtectedRoute;