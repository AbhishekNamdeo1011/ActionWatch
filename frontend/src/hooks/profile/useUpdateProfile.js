import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { updateProfile } from "@/api/profile.api";

export const useUpdateProfile = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: updateProfile,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["profile"],

            });

            queryClient.invalidateQueries({

                queryKey: ["auth"],

            });

            toast.success(

                "Profile updated successfully."

            );

        },

        onError: () => {

            toast.error(

                "Failed to update profile."

            );

        },

    });

};