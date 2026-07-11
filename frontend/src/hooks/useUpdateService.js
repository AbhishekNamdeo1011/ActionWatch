import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { serviceService } from "@/services/service.service";

export const useUpdateService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ serviceId, payload }) =>
            serviceService.update(serviceId, payload),

        onSuccess: (_, variables) => {
            toast.success("Service updated successfully.");

            queryClient.invalidateQueries({
                queryKey: ["services"],
            });

            queryClient.invalidateQueries({
                queryKey: ["service", variables.serviceId],
            });
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Failed to update service."
            );
        },
    });
};