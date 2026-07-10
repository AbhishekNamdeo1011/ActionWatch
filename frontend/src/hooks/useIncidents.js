import { useQuery } from "@tanstack/react-query";
import { incidentService } from "@/services/incident.service";

export const useIncidents = () => {

    return useQuery({

        queryKey: ["incidents"],

        queryFn: incidentService.getAll,

    });

};