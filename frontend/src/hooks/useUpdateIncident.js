import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { incidentService } from "@/services/incident.service";

export const useUpdateIncident = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({ id, payload }) =>

            incidentService.update(id, payload),

        onSuccess: (_, variables) => {

    toast.success("Incident updated successfully.");

    queryClient.invalidateQueries({

        queryKey: ["incident", variables.id],

    });

    queryClient.invalidateQueries({

        queryKey: ["incidents"],

    });

    queryClient.invalidateQueries({

        queryKey: ["timeline", variables.id],

    });

    queryClient.invalidateQueries({

        queryKey: ["dashboard"],

    });

},

        onError: (error) => {

            toast.error(

                error.response?.data?.message ||

                "Failed to update incident."

            );

        },

    });

};