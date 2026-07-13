import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {

    connectSocket,

} from "@/lib/socket";
import {
    loginService,
    googleLoginService,
} from "@/services/auth.service";

import { useAuth } from "@/hooks/auth/useAuth";

export const useLogin = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    /*
    ==========================================
    Email Login
    ==========================================
    */

    const handleLogin = async (formData) => {

        try {

            const response = await loginService(formData);

            login({

                accessToken: response.data.accessToken,

                user: response.data.user,

            });
connectSocket(

    response.data.accessToken

);
            toast.success(response.message);

            navigate("/dashboard", {

                replace: true,

            });

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Login failed"

            );

        }

    };

    /*
    ==========================================
    Google Login
    ==========================================
    */

    const handleGoogleLogin = async (credential) => {

        try {

            const response = await googleLoginService(

                credential

            );

            login({

                accessToken: response.data.accessToken,

                user: response.data.user,

            });
connectSocket(

    response.data.accessToken

);
            toast.success(

                response.message

            );

            navigate(

                "/dashboard",

                {

                    replace: true,

                }

            );

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Google login failed"

            );

        }

    };

    return {

        handleLogin,

        handleGoogleLogin,

    };

};