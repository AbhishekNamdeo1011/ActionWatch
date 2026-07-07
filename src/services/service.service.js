import mongoose from "mongoose";
import ServiceModel from "../models/service.model.js";

/*
==========================================
Create Service
==========================================
*/

export const createService = async (serviceData) => {

    const {
        name,
        description,
        url,
        method,
        expectedStatus,
        interval,
        timeout,
        failureThreshold,
        createdBy,
    } = serviceData;

    const existingService = await ServiceModel.findOne({
        createdBy,
        url,
    });

    if (existingService) {
        const error = new Error("Service already exists.");
        error.statusCode = 409;
        throw error;
    }

    const service = await ServiceModel.create({
        name,
        description,
        url,
        method,
        expectedStatus,
        interval,
        timeout,
        failureThreshold,
        createdBy,
    });

    await service.populate({
        path: "createdBy",
        select: "username role",
    });

    return service;
};

/*
==========================================
Get All Services
==========================================
*/

export const getServices = async (userId,
    query) => {

    let {
        page = 1,
        limit = 10,
        search,
        currentStatus,
        isActive,
        sort = "-createdAt",
    } = query;

    page = Number(page);
    limit = Number(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;
    if (limit > 100) limit = 100;

    const filter = {

        createdBy: userId,

    };

    if (search) {

        filter.$or = [

            {
                name: {
                    $regex: search,
                    $options: "i",
                },
            },

            {
                description: {
                    $regex: search,
                    $options: "i",
                },
            },

            {
                url: {
                    $regex: search,
                    $options: "i",
                },
            },

        ];

    }

    if (currentStatus) {

        filter.currentStatus = currentStatus;

    }

    if (isActive !== undefined) {

        filter.isActive = isActive === "true";

    }

    const total = await ServiceModel.countDocuments(filter);

    const services = await ServiceModel.find(filter)

        .populate(
            "createdBy",
            "username role"
        )

        .sort(sort)

        .skip((page - 1) * limit)

        .limit(limit);

    return {

        services,

        pagination: {

            total,

            page,

            limit,

            totalPages: Math.ceil(total / limit),

        },

    };

};

/*
==========================================
Get Service By ID
==========================================
*/

export const getServiceById = async (serviceId,

    userId) => {

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {

        const error = new Error("Invalid Service ID");

        error.statusCode = 400;

        throw error;

    }

    const service =
        await ServiceModel.findOne({

            _id: serviceId,

            createdBy: userId,

        })
            .populate(
                "createdBy",
                "username role"
            );

    if (!service) {

        const error = new Error("Service not found");

        error.statusCode = 404;

        throw error;

    }

    return service;

};

/*
==========================================
Update Service
==========================================
*/

export const updateService = async (
    serviceId,
    userId,
    updateData
) => {

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {

        const error = new Error("Invalid Service ID");
        error.statusCode = 400;
        throw error;

    }

    const allowedUpdates = [

        "name",
        "description",
        "url",
        "method",
        "expectedStatus",
        "interval",
        "timeout",
        "failureThreshold",

    ];

    const payload = {};

    for (const key of allowedUpdates) {

        if (updateData[key] !== undefined) {

            payload[key] = updateData[key];

        }

    }

    // Prevent duplicate URL for same user

    if (payload.url) {

        const existingService = await ServiceModel.findOne({

            createdBy: userId,

            url: payload.url,

            _id: { $ne: serviceId }

        });

        if (existingService) {

            const error = new Error("Service URL already exists.");
            error.statusCode = 409;
            throw error;

        }

    }

    const service = await ServiceModel.findOneAndUpdate(

        {

            _id: serviceId,

            createdBy: userId,

        },

        payload,

        {

            new: true,

            runValidators: true,

        }

    ).populate(

        "createdBy",

        "username role"

    );

    if (!service) {

        const error = new Error("Service not found");
        error.statusCode = 404;
        throw error;

    }

    return service;

};

/*
==========================================
Delete Service
==========================================
*/

export const deleteService = async (
    serviceId,
    userId
) => {

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {

        const error = new Error("Invalid Service ID");
        error.statusCode = 400;
        throw error;

    }

    const service = await ServiceModel.findOneAndDelete({

        _id: serviceId,

        createdBy: userId,

    });

    if (!service) {

        const error = new Error("Service not found");
        error.statusCode = 404;
        throw error;

    }

    return service;

};

/*
==========================================
Toggle Monitoring
==========================================
*/

export const toggleService = async (
    serviceId,
    userId
) => {

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {

        const error = new Error("Invalid Service ID");
        error.statusCode = 400;
        throw error;

    }

    const service = await ServiceModel.findOne({

        _id: serviceId,

        createdBy: userId,

    });

    if (!service) {

        const error = new Error("Service not found");
        error.statusCode = 404;
        throw error;

    }

    service.isActive = !service.isActive;

    await service.save();

    await service.populate(

        "createdBy",

        "username role"

    );

    return service;

};

/*
==========================================
Get Active Services
Used by Monitoring Scheduler
==========================================
*/

export const getActiveServices = async () => {

    return ServiceModel.find({

        isActive: true,

    });

};

/*
==========================================
Update Service Success
==========================================
*/

export const updateServiceSuccess = async (
    
    serviceId,

    responseTime,

    statusCode
) => {

    return ServiceModel.findByIdAndUpdate(

        serviceId,

        {

            currentStatus: "UP",

            lastCheckedAt: new Date(),

            lastResponseTime: responseTime,

            lastHttpStatus: statusCode,

            lastError: "",

            consecutiveFailures: 0,


        },

        {

            new: true,

        }

    );

};
/*
==========================================
Update Service Failure
==========================================
*/

export const updateServiceFailure = async (
    serviceId,
    error,
    statusCode = null
) => {

    const service = await ServiceModel.findById(serviceId);

    if (!service) {

        const err = new Error("Service not found");
        err.statusCode = 404;
        throw err;

    }

    /*
    ==========================================
    Incident Already Active
    ==========================================
    */

    if (service.activeIncident) {

        service.currentStatus = "DOWN";
        service.lastCheckedAt = new Date();
        service.lastFailureAt = new Date();
        service.lastHttpStatus = statusCode;
        service.lastError = error;

        await service.save();

        return service;

    }

    /*
    ==========================================
    Increase Failure Count
    ==========================================
    */

    service.currentStatus = "DOWN";
    service.lastCheckedAt = new Date();
    service.lastFailureAt = new Date();
    service.lastHttpStatus = statusCode;
    service.lastError = error;
    service.consecutiveFailures += 1;

    await service.save();

    return service;

};
/*
==========================================
Set Active Incident
==========================================
*/

export const setActiveIncident = async (
    serviceId,
    incidentId
) => {

    return ServiceModel.findByIdAndUpdate(

        serviceId,

        {
            activeIncident: incidentId,
        },

        {
            new: true,
        }

    );

};

/*
==========================================
Clear Active Incident
==========================================
*/

export const clearActiveIncident = async (
    serviceId
) => {

    return ServiceModel.findByIdAndUpdate(

        serviceId,

        {
            activeIncident: null,
        },

        {
            new: true,
        }

    );

};

