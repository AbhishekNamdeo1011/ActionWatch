import { useQuery } from "@tanstack/react-query";
import { postmortemService } from "@/services/postmortem.service";

export const usePostmortem = (incidentId) => {

    return useQuery({

        queryKey: ["postmortem", incidentId],

        enabled: !!incidentId,

        retry: false,

        queryFn: async () => {

            try {

                return await postmortemService.getPostmortem(incidentId);

            } catch (error) {

                if (error.response?.status === 404) {

                    return null;

                }

                throw error;

            }

        },

    });

};