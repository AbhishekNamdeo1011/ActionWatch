import IncidentModel from "../models/incident.model.js";
import ServiceModel from "../models/service.model.js";

export const getDashboardData = async () => {

    const [
        totalIncidents,
        openIncidents,
        resolvedIncidents,
        criticalIncidents,

        totalServices,
        healthyServices,
        unhealthyServices,

        mttrResult,

        activeIncidents,

        recentIncidents,

    ] = await Promise.all([

        /*
        ==========================================
        Incident Counts
        ==========================================
        */

        IncidentModel.countDocuments(),

        IncidentModel.countDocuments({

            status: { $ne: "resolved" },

        }),

        IncidentModel.countDocuments({

            status: "resolved",

        }),

        IncidentModel.countDocuments({

            severity: "P0",

        }),

        /*
        ==========================================
        Service Counts
        ==========================================
        */

        ServiceModel.countDocuments(),

        ServiceModel.countDocuments({

            currentStatus: "UP",

        }),

        ServiceModel.countDocuments({

            currentStatus: "DOWN",

        }),

        /*
        ==========================================
        Average MTTR
        ==========================================
        */

        IncidentModel.aggregate([

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

        ]),

        /*
        ==========================================
        Active Incidents
        ==========================================
        */

        IncidentModel.find({

            status: {

                $ne: "resolved",

            },

        })

            .select(

                "title severity status service affectedUsers createdAt"

            )

            .populate(

                "createdBy",

                "username"

            )

            .populate(

                "service",

                "name"

            )

            .sort({

                createdAt: -1,

            })

            .limit(5)

            .lean(),

        /*
        ==========================================
        Recent Incidents
        ==========================================
        */

        IncidentModel.find()

            .select(

                "title severity status service createdAt resolvedAt"

            )

            .populate(

                "service",

                "name"

            )

            .sort({

                createdAt: -1,

            })

            .limit(10)

            .lean(),

    ]);

    return {

        totalIncidents,

        openIncidents,

        resolvedIncidents,

        criticalIncidents,

        totalServices,

        healthyServices,

        unhealthyServices,

        averageMTTR: Number(

            (mttrResult[0]?.averageMTTR || 0).toFixed(1)

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

    const [

        incidentsBySeverity,

        incidentsByStatus,

        serviceHealth,

        monthlyIncidents,

    ] = await Promise.all([

        /*
        ==========================================
        Incidents By Severity
        ==========================================
        */

        IncidentModel.aggregate([

            {
                $group: {
                    _id: "$severity",
                    count: { $sum: 1 },
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

        ]),

        /*
        ==========================================
        Incidents By Status
        ==========================================
        */

        IncidentModel.aggregate([

            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },

            {
                $project: {
                    _id: 0,
                    status: "$_id",
                    count: 1,
                },
            },

        ]),

        /*
        ==========================================
        Service Health
        ==========================================
        */

        ServiceModel.aggregate([

            {
                $group: {
                    _id: "$currentStatus",
                    count: { $sum: 1 },
                },
            },

            {
                $project: {
                    _id: 0,
                    status: "$_id",
                    count: 1,
                },
            },

        ]),

        /*
        ==========================================
        Monthly Incidents
        ==========================================
        */

        IncidentModel.aggregate([

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

        ]),

    ]);

    return {

        incidentsBySeverity,

        incidentsByStatus,

        serviceHealth,

        monthlyIncidents,

    };

};