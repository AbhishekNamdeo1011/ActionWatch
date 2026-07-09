import {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService,
    toggleService,
} from "../services/service.service.js";
import asyncHandler from "../utils/asyncHandler.js";

/*
==========================================
Create Service
==========================================
*/

export const createServiceController = asyncHandler(async (req, res) => {

    const service = await createService({

        ...req.body,

        createdBy: req.user._id,

    });

    return res.status(201).json({

        success: true,

        message: "Service created successfully.",

        data: service,

    });

});

/*
==========================================
Get All Services
==========================================
*/

export const getServicesController = asyncHandler(async (req, res) => {

    const result = await getServices(

        req.user._id,

        req.query

    );

    return res.status(200).json({

        success: true,

        message: "Services fetched successfully.",

        data: result.services,

        pagination: result.pagination,

    });

});

/*
==========================================
Get Service By ID
==========================================
*/

export const getServiceByIdController = asyncHandler(async (req, res) => {

    const service = await getServiceById(

        req.params.serviceId,

        req.user._id

    );

    return res.status(200).json({

        success: true,

        message: "Service fetched successfully.",

        data: service,

    });

});

/*
==========================================
Update Service
==========================================
*/

export const updateServiceController = asyncHandler(async (req, res) => {

    const service = await updateService(

        req.params.serviceId,

        req.user._id,

        req.body

    );

    return res.status(200).json({

        success: true,

        message: "Service updated successfully.",

        data: service,

    });

});

/*
==========================================
Delete Service
==========================================
*/

export const deleteServiceController = asyncHandler(async (req, res) => {

    await deleteService(

        req.params.serviceId,

        req.user._id

    );

    return res.status(200).json({

        success: true,

        message: "Service deleted successfully.",

    });

});

/*
==========================================
Toggle Monitoring
==========================================
*/

export const toggleServiceController = asyncHandler(async (req, res) => {

    const service = await toggleService(

        req.params.serviceId,

        req.user._id

    );

    return res.status(200).json({

        success: true,

        message: "Monitoring status updated.",

        data: service,

    });

});