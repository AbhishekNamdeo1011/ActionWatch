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

        let mounted = true;

        const initialize = async () => {

            try {

                const refreshResponse = await refreshAccessToken();

                if (!mounted) return;

                const meResponse = await getCurrentUser();

                if (!mounted) return;

                login({

                    accessToken: refreshResponse.accessToken,

                    user: meResponse.user,

                });

            }

            catch {

                if (!mounted) return;

                logout();

            }

            finally {

                if (mounted) {

                    setLoading(false);

                }

            }

        };

        initialize();

        return () => {

            mounted = false;

        };

    }, [login, logout, setLoading]);

    return children;

};

export default AuthInitializer;