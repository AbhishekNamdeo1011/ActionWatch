import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { incidentService } from "@/services/incident.service";

export const useCreateIncident = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: incidentService.create,

        onSuccess: () => {

            toast.success("Incident created.");

            queryClient.invalidateQueries({

                queryKey: ["dashboard"],

            });

            queryClient.invalidateQueries({

                queryKey: ["incidents"],

            });

        },

        onError: (error) => {

            toast.error(

                error.response?.data?.message ||

                "Unable to create incident."

            );

        },

    });

};