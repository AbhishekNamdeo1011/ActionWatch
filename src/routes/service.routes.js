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
import {authorize} from "../middleware/authorize.middleware.js";
import { USER_ROLES } from "../constants/role.constants.js";

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
    authorize(USER_ROLES.ADMIN, USER_ROLES.OWNER),
    validateCreateService,
    createServiceController
);

router.get(
    "/",
    authMiddleware,
    authorize(USER_ROLES.VIEWER, USER_ROLES.RESPONDER, USER_ROLES.ADMIN, USER_ROLES.OWNER),
    getServicesController
);

router.get(
    "/:serviceId",
    authMiddleware,
    authorize(USER_ROLES.VIEWER, USER_ROLES.RESPONDER, USER_ROLES.ADMIN, USER_ROLES.OWNER),
    getServiceByIdController
);

router.patch(
    "/:serviceId",
    authMiddleware,
    authorize(USER_ROLES.ADMIN, USER_ROLES.OWNER),
    validateUpdateService,
    updateServiceController
);

router.delete(
    "/:serviceId",
    authMiddleware,
    authorize(USER_ROLES.OWNER),
    deleteServiceController
);

router.patch(
    "/:serviceId/toggle",
    authMiddleware,
    authorize(USER_ROLES.ADMIN, USER_ROLES.OWNER),
    toggleServiceController
);

export default router; 