import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { loginService } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";

export const useLogin = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = async (formData) => {

        try {

            const response = await loginService(formData);

            login({

                accessToken: response.accessToken,

                user: response.user,

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

    return {

        handleLogin,

    };

};