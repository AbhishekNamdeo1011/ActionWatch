import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { serviceService } from "@/services/service.service";

export const useCreateService = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: serviceService.create,

        onSuccess: () => {

            toast.success("Service created successfully.");

            queryClient.invalidateQueries({

                queryKey: ["services"],

            });

        },

        onError: (error) => {

            toast.error(

                error.response?.data?.message ||

                "Failed to create service."

            );

        },

    });

};