import HealthCheckModel from "../models/healthCheck.model.js";

export const createHealthCheck = async (

    data

) => {

    return HealthCheckModel.create(data);

};

export const getRecentHealthChecks = async (

    serviceId,

    limit = 10

) => {

    return HealthCheckModel.find({

        service: serviceId,

    })

        .sort({

            checkedAt: -1,

        })

        .limit(limit);

};