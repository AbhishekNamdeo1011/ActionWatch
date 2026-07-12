import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { incidentService } from "@/services/incident.service";

export const useAssignResponder = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({ incidentId, userId }) =>
            incidentService.assignResponder(
                incidentId,
                userId
            ),

        onSuccess: (_, variables) => {

            toast.success("Responder assigned successfully.");

            queryClient.invalidateQueries({
                queryKey: [
                    "incident",
                    variables.incidentId,
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "incidents",
                ],
            });

        },

        onError: (error) => {

            toast.error(
                error.response?.data?.message ||
                "Unable to assign responder."
            );

        },

    });

};