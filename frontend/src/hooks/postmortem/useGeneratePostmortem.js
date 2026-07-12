import {

    useMutation,

    useQueryClient,

} from "@tanstack/react-query";

import { toast } from "sonner";

import {

    postmortemService,

} from "@/services/postmortem.service";

export const useGeneratePostmortem = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn:

            postmortemService.generatePostmortem,

        onSuccess: (_, incidentId) => {

            toast.success(

                "Postmortem Generated"

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

                "Generation failed."

            );

        },

    });

};