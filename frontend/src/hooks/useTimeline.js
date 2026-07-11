import { useQuery } from "@tanstack/react-query";

import { timelineService } from "@/services/timeline.service";

export const useTimeline = (incidentId) => {

    return useQuery({

        queryKey: [

            "timeline",

            incidentId,

        ],

        queryFn: () =>

            timelineService.getTimeline(

                incidentId

            ),

        enabled: !!incidentId,

    });

};