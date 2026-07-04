import {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService,
    toggleService,
} from "../services/service.service.js";

/*
==========================================
Create Service
==========================================
*/

export const createServiceController = async (req, res) => {

    try {

        const service = await createService({

            ...req.body,

            createdBy: req.user._id,

        });

        return res.status(201).json({

            success: true,

            message: "Service created successfully.",

            data: service,

        });

    }

    catch (error) {

        if (error.statusCode) {

            return res.status(error.statusCode).json({

                success: false,

                message: error.message,

            });

        }

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};

/*
==========================================
Get All Services
==========================================
*/

export const getServicesController = async (req, res) => {

    try {

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
Get Service By ID
==========================================
*/

export const getServiceByIdController = async (req, res) => {

    try {

        const service = await getServiceById(

            req.params.serviceId,
            req.user._id

        );

        return res.status(200).json({

            success: true,

            message: "Service fetched successfully.",

            data: service,

        });

    }

    catch (error) {

        if (error.statusCode) {

            return res.status(error.statusCode).json({

                success: false,

                message: error.message,

            });

        }

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};

/*
==========================================
Update Service
==========================================
*/

export const updateServiceController = async (req, res) => {

    try {

        await updateService(
            req.params.serviceId,
            req.user._id,
            req.body
        );

        return res.status(200).json({

            success: true,

            message: "Service updated successfully.",

            data: service,

        });

    }

    catch (error) {

        if (error.statusCode) {

            return res.status(error.statusCode).json({

                success: false,

                message: error.message,

            });

        }

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};

/*
==========================================
Delete Service
==========================================
*/

export const deleteServiceController = async (req, res) => {

    try {
        await deleteService(
            req.params.serviceId,
            req.user._id
        );

        return res.status(200).json({

            success: true,

            message: "Service deleted successfully.",

        });

    }

    catch (error) {

        if (error.statusCode) {

            return res.status(error.statusCode).json({

                success: false,

                message: error.message,

            });

        }

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};

/*
==========================================
Toggle Monitoring
==========================================
*/

export const toggleServiceController = async (req, res) => {

    try {

        await toggleService(
            req.params.serviceId,
            req.user._id
        );

        return res.status(200).json({

            success: true,

            message: "Monitoring status updated.",

            data: service,

        });

    }

    catch (error) {

        if (error.statusCode) {

            return res.status(error.statusCode).json({

                success: false,

                message: error.message,

            });

        }

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};