import {

    getDashboardData,

    getDashboardAnalytics,

} from "../services/dashboard.service.js";

export const dashboard = async (

    req,

    res

) => {

    try {

        const data =

            await getDashboardData();

        return res.status(200).json({

            success: true,

            data,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};

/*
==========================================
Dashboard Analytics
==========================================
*/

export const analytics = async (

    req,

    res

) => {

    try {

        const data =
            await getDashboardAnalytics();

        return res.status(200).json({

            success: true,

            data,

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};