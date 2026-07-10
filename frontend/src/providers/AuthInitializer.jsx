import { useEffect } from "react";

import { refreshAccessToken, getCurrentUser } from "@/api/auth.api";

import { useAuth } from "@/hooks/useAuth";

const AuthInitializer = ({ children }) => {

    const {

        login,

        logout,

        setLoading,

    } = useAuth();

   useEffect(() => {

    let cancelled = false;

    const initialize = async () => {

        try {

            const refreshResponse = await refreshAccessToken();

            if (cancelled) return;

            const meResponse = await getCurrentUser();

            if (cancelled) return;

            login({
                accessToken: refreshResponse.accessToken,
                user: meResponse.user,
            });

        } catch {

            if (!cancelled) {
                logout();
            }

        } finally {

            if (!cancelled) {
                setLoading(false);
            }

        }

    };

    initialize();

    return () => {
        cancelled = true;
    };

}, [login, logout, setLoading]);

    return children;

};

export default AuthInitializer;