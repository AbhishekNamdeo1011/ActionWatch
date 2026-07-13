import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import {
    registerService,
    googleLoginService,
} from "@/services/auth.service";

import { useAuth } from "@/hooks/auth/useAuth";

import { connectSocket } from "@/lib/socket";

export const useRegister = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    /*
    ==========================================
    Email Register
    ==========================================
    */

    const register = async (data) => {

        try {

            const response = await registerService(data);

            toast.success(response.message);

            navigate("/login");

            return response;

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Registration failed"

            );

            throw error;

        }

    };

    /*
    ==========================================
    Google Register
    ==========================================
    */

    const handleGoogleRegister = async (credential) => {

        try {

            const response = await googleLoginService(

                credential

            );

            login({

                accessToken:

                    response.data.accessToken,

                user:

                    response.data.user,

            });

            connectSocket(

                response.data.accessToken

            );

            toast.success(

                "Welcome to ActionWatch!"

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

                "Google Sign Up Failed"

            );

        }

    };

    return {

        register,

        handleGoogleRegister,

    };

};