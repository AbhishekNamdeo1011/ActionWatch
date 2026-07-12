import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { userService } from "@/services/user.service";

export const useUpdateUserRole = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({
            userId,
            role,
        }) =>

            userService.updateUserRole(
                userId,
                role
            ),

        onSuccess: () => {

            toast.success(
                "User role updated successfully."
            );

            queryClient.invalidateQueries({

                queryKey: ["users"],

            });

        },

        onError: (error) => {

            toast.error(

                error.response?.data?.message ||

                "Unable to update role."

            );

        },

    });

};