import express from "express";

import {
    createServiceController,
    getServicesController,
    getServiceByIdController,
    updateServiceController,
    deleteServiceController,
    toggleServiceController,
} from "../controllers/service.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import {authorize} from "../middleware/roleAuth.middleware.js";

import {
    validateCreateService,
    validateUpdateService,
} from "../validators/service.validator.js";
 
const router = express.Router(); 

/*
==========================================
Service Routes
==========================================
*/

router.post(
    "/",
    authMiddleware,
    authorize("admin"),
    validateCreateService,
    createServiceController
);

router.get(
    "/",
    authMiddleware,
    getServicesController
);

router.get(
    "/:serviceId",
    authMiddleware,
    getServiceByIdController
);

router.patch(
    "/:serviceId",
    authMiddleware,
    authorize("admin"),
    validateUpdateService,
    updateServiceController
);

router.delete(
    "/:serviceId",
    authMiddleware,
    authorize("admin"),
    deleteServiceController
);

router.patch(
    "/:serviceId/toggle",
    authMiddleware,
    authorize("admin"),
    toggleServiceController
);

export default router; 