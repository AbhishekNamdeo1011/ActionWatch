import { useQuery } from "@tanstack/react-query";

import { similarIncidentService } from "@/services/similarIncident.service";

export const useSimilarIncidents = (incidentId) => {

    return useQuery({

        queryKey: ["similar-incidents", incidentId],

        queryFn: () =>
            similarIncidentService.getAll(incidentId),

        enabled: !!incidentId,

    });

};