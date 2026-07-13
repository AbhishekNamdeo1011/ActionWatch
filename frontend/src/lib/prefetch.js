import { queryClient } from "@/lib/queryClient";

import { getDashboard } from "@/api/dashboard.api";
import { getAnalytics } from "@/api/analytics.api";
import { getIncidents } from "@/api/incident.api";
import { getServices } from "@/api/service.api";

export const prefetchRoute = (path) => {

    switch (path) {

        case "/dashboard":

            queryClient.prefetchQuery({

                queryKey: ["dashboard"],

                queryFn: getDashboard,

            });

            break;

        case "/incidents":

            queryClient.prefetchQuery({

                queryKey: ["incidents"],

                queryFn: () => getIncidents(),

            });

            break;

        case "/services":

            queryClient.prefetchQuery({

                queryKey: ["services"],

                queryFn: getServices,

            });

            break;

        case "/analytics":

            queryClient.prefetchQuery({

                queryKey: ["analytics"],

                queryFn: getAnalytics,

            });

            break;

        default:

            break;

    }

};