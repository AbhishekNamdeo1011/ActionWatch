import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { registerService } from "@/services/auth.service";

export const useRegister = () => {
    const navigate = useNavigate();

    const register = async (data) => {
        try {
            const response = await registerService(data);

            toast.success(response.message);

            navigate("/login");

            return response;
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Registration failed"
            );

            throw error;
        }
    };

    return { register };
};