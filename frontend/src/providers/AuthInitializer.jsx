import { useEffect } from "react";

import { refreshAccessToken } from "@/api/auth.api";
import { useAuth } from "@/hooks/auth/useAuth";

const AuthInitializer = ({ children }) => {

    const {
        login,
        logout,
        loading,
        setLoading,
    } = useAuth();

    useEffect(() => {

        let mounted = true;

        const initialize = async () => {

            try {

                const response = await refreshAccessToken();

                if (!mounted) return;

                login({

                    accessToken: response.data.accessToken,

                    user: response.data.user,

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