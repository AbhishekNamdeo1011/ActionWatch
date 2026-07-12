import { Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/auth/useAuth";

const RoleRoute = ({ roles, children }) => {

    const {

        user,

        loading,

    } = useAuth();

    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center bg-background">

                <div className="flex flex-col items-center gap-4">

                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />

                    <p className="text-sm text-muted">

                        Checking permissions...

                    </p>

                </div>

            </div>

        );

    }

    if (!user) {

        return <Navigate to="/login" replace />;

    }

    if (!roles.includes(user.role)) {

        return <Navigate to="/403" replace />;

    }

    return children;

};

export default RoleRoute;