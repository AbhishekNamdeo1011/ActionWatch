import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { serviceService } from "@/services/service.service";

export const useToggleMonitoring = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: serviceService.toggle,

        onSuccess: () => {

            toast.success("Monitoring updated.");

            queryClient.invalidateQueries({

                queryKey: ["services"],

            });

        },

        onError: (error) => {

            toast.error(
                error.response?.data?.message ||
                "Failed to update monitoring."
            );

        },

    });

};