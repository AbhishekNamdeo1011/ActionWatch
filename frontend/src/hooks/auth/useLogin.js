import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { loginService } from "@/services/auth.service";
import { useAuth } from "@/hooks/auth/useAuth";
import { googleLoginService } from "@/services/auth.service";
export const useLogin = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = async (formData) => {

        try {

            const response = await loginService(formData);

            login({

                accessToken: response.accessToken,

                user: response.data.user,

            });

            toast.success(response.message);

            navigate("/dashboard", { replace: true });

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Login failed"

            );

        }

    };
    const handleGoogleLogin = async (credential) => {

    try {

        const response =

        await googleLoginService(

            credential

        );

        login({

            accessToken:

            response.data.accessToken,

            user:

            response.data.user,

        });

        toast.success(

            response.message

        );

        navigate(

            "/dashboard",

            {

                replace:true,

            }

        );

    }

    catch(error){

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