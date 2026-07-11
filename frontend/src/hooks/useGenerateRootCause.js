import {

    useMutation,

    useQueryClient,

} from "@tanstack/react-query";

import { toast } from "sonner";

import { aiService } from "@/services/ai.service";

export const useGenerateRootCause = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: aiService.generateRootCause,

        onSuccess: (_, incidentId) => {

            toast.success(

                "AI Analysis Generated"

            );

            queryClient.invalidateQueries({

                queryKey: [

                    "incident",

                    incidentId,

                ],

            });

        },

        onError: (error) => {

            toast.error(

                error.response?.data?.message ||

                "Failed to generate AI analysis."

            );

        },

    });

};