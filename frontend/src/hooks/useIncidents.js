import { useQuery } from "@tanstack/react-query";
import { incidentService } from "@/services/incident.service";

export const useIncidents = (params = {}) => {

    return useQuery({

        queryKey: ["incidents", params],

        queryFn: () => incidentService.getAll(params),

    });

};