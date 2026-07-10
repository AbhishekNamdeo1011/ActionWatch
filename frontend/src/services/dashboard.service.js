import {
    getDashboard,
    getDashboardAnalytics,
} from "@/api/dashboard.api";

export const dashboardService = async () => {

    return await getDashboard();

};

export const dashboardAnalyticsService = async () => {

    return await getDashboardAnalytics();

};