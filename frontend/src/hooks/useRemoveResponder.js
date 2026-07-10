import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { incidentService } from "@/services/incident.service";

export const useRemoveResponder = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({
            incidentId,
            userId,
        }) =>
            incidentService.removeResponder(
                incidentId,
                userId
            ),

        onSuccess: (_, variables) => {

            toast.success("Responder removed.");

            queryClient.invalidateQueries({

                queryKey: [
                    "incident",
                    variables.incidentId,
                ],

            });

        },

        onError: (error) => {

            toast.error(
                error.response?.data?.message ||
                "Unable to remove responder."
            );

        },

    });

};