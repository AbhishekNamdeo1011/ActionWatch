import { useQuery } from "@tanstack/react-query";
import { serviceService } from "@/services/service.service";

export const useService = (serviceId) => {

    return useQuery({

        queryKey: ["service", serviceId],

        queryFn: () => serviceService.getOne(serviceId),

        enabled: !!serviceId,

    });

};