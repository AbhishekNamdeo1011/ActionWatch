import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { serviceService } from "@/services/service.service";

export const useDeleteService = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: serviceService.delete,

        onSuccess: () => {

            toast.success("Service deleted.");

            queryClient.invalidateQueries({

                queryKey: ["services"],

            });

        },

        onError: (error) => {

            toast.error(
                error.response?.data?.message ||
                "Unable to delete service."
            );

        },

    });

};