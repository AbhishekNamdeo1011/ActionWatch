import {

    getDashboardData,

    getDashboardAnalytics,

} from "../services/dashboard.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const dashboard = asyncHandler(async (req, res) => {

    const data = await getDashboardData();

    return res.status(200).json({

        success: true,

        data,

    });

});

/*
==========================================
Dashboard Analytics
==========================================
*/

export const analytics = asyncHandler(async (req, res) => {

    const data = await getDashboardAnalytics();

    return res.status(200).json({

        success: true,

        data,

    });

});