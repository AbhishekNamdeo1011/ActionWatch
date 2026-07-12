import { useQuery } from "@tanstack/react-query";
import { incidentService } from "@/services/incident.service";

export const useIncident = (incidentId) => {

    return useQuery({

        queryKey: ["incident", incidentId],

        queryFn: () => incidentService.getOne(incidentId),

        enabled: !!incidentId,

    });

};