import { useQuery } from "@tanstack/react-query";

import { serviceService } from "@/services/service.service";

export const useServices = (params = {}) => {

    return useQuery({

        queryKey: ["services", params],

        queryFn: () => serviceService.getAll(params),

    });

};