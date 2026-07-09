import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { USER_ROLES } from "../constants/role.constants.js";

import {
    generateIncidentRootCause,
} from "../controllers/ai.controller.js";

const router =
    express.Router();

router.post(

    "/root-cause/:incidentId",

    authMiddleware,

    authorize(

        USER_ROLES.RESPONDER,
        USER_ROLES.ADMIN,
        USER_ROLES.OWNER

    ),

    generateIncidentRootCause

); 

export default router;