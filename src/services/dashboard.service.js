import IncidentModel from "../models/incident.model.js";
import ServiceModel from "../models/service.model.js";

export const getDashboardData = async () => {

    /*
    ==========================================
    Incident Counts
    ==========================================
    */

    const totalIncidents =
        await IncidentModel.countDocuments();

    const openIncidents =
        await IncidentModel.countDocuments({

            status: {
                $ne: "resolved",
            },

        });

    const resolvedIncidents =
        await IncidentModel.countDocuments({

            status: "resolved",

        });

    const criticalIncidents =
        await IncidentModel.countDocuments({

            severity: "P0",

        });

    /*
    ==========================================
    Service Counts
    ==========================================
    */

    const totalServices =
        await ServiceModel.countDocuments();

    const healthyServices =
        await ServiceModel.countDocuments({

            currentStatus: "UP",

        });

    const unhealthyServices =
        await ServiceModel.countDocuments({

            currentStatus: "DOWN",

        });

    /*
    ==========================================
    Average MTTR
    ==========================================
    */

    const mttrResult =
        await IncidentModel.aggregate([

            {

                $match: {

                    mttr: {

                        $ne: null,

                    },

                },

            },

            {

                $group: {

                    _id: null,

                    averageMTTR: {

                        $avg: "$mttr",

                    },

                },

            },

        ]);

    /*
    ==========================================
    Active Incidents
    ==========================================
    */

    const activeIncidents = await IncidentModel.find({

    status: { $ne: "resolved" }

})
.select(
    "title severity status service affectedUsers createdAt"
)
.populate(
    "createdBy",
    "username"
)
.sort({
    createdAt: -1
})
.limit(5);

    /*
    ==========================================
    Recent Incidents
    ==========================================
    */

const recentIncidents = await IncidentModel.find()

.select(
    "title severity status service createdAt resolvedAt"
)

.sort({
    createdAt: -1
})

.limit(10);

    return {

        totalIncidents,

        openIncidents,

        resolvedIncidents,

        criticalIncidents,

        totalServices,

        healthyServices,

        unhealthyServices,

        averageMTTR:

Number(
    (mttrResult[0]?.averageMTTR || 0)
    .toFixed(1)
),

        activeIncidents,

        recentIncidents,

    };

};

/*
==========================================
Dashboard Analytics
==========================================
*/

export const getDashboardAnalytics = async () => {

    /*
    ==========================================
    Incidents By Severity
    ==========================================
    */

    const incidentsBySeverity =
        await IncidentModel.aggregate([

            {
                $group: {

                    _id: "$severity",

                    count: {

                        $sum: 1,

                    },

                },

            },

            {

                $project: {

                    _id: 0,

                    severity: "$_id",

                    count: 1,

                },

            },

            {

                $sort: {

                    severity: 1,

                },

            },

        ]);

    /*
    ==========================================
    Incidents By Status
    ==========================================
    */

    const incidentsByStatus =
        await IncidentModel.aggregate([

            {

                $group: {

                    _id: "$status",

                    count: {

                        $sum: 1,

                    },

                },

            },

            {

                $project: {

                    _id: 0,

                    status: "$_id",

                    count: 1,

                },

            },

        ]);

    /*
    ==========================================
    Service Health
    ==========================================
    */

    const serviceHealth =
        await ServiceModel.aggregate([

            {

                $group: {

                    _id: "$currentStatus",

                    count: {

                        $sum: 1,

                    },

                },

            },

            {

                $project: {

                    _id: 0,

                    status: "$_id",

                    count: 1,

                },

            },

        ]);

    /*
    ==========================================
    Monthly Incidents
    ==========================================
    */

    const monthlyIncidents =
        await IncidentModel.aggregate([

            {

                $group: {

                    _id: {

                        year: {

                            $year: "$createdAt",

                        },

                        month: {

                            $month: "$createdAt",

                        },

                    },

                    count: {

                        $sum: 1,

                    },

                },

            },

            {

                $sort: {

                    "_id.year": 1,

                    "_id.month": 1,

                },

            },

            {

                $project: {

                    _id: 0,

                    month: {

                        $concat: [

                            {

                                $toString: "$_id.year",

                            },

                            "-",

                            {

                                $cond: [

                                    {

                                        $lt: [

                                            "$_id.month",

                                            10,

                                        ],

                                    },

                                    {

                                        $concat: [

                                            "0",

                                            {

                                                $toString: "$_id.month",

                                            },

                                        ],

                                    },

                                    {

                                        $toString: "$_id.month",

                                    },

                                ],

                            },

                        ],

                    },

                    count: 1,

                },

            },

        ]);

    return {

        incidentsBySeverity,

        incidentsByStatus,

        serviceHealth,

        monthlyIncidents,

    };

};