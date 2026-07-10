import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { incidentService } from "@/services/incident.service";

export const useCreateIncident = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: incidentService.create,

        onSuccess: () => {

            toast.success("Incident created successfully.");

            queryClient.invalidateQueries({
                queryKey: ["incidents"],
            });

            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            });

        },

        onError: (error) => {

            toast.error(
                error.response?.data?.message ||
                "Failed to create incident."
            );

        },

    });

};