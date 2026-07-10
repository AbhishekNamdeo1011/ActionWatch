import express from "express";

import {authMiddleware} from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { USER_ROLES } from "../constants/role.constants.js";

import {

    getIncidentSimilar,

} from "../controllers/similarIncident.controller.js";

const router = express.Router();

router.get(

    "/:incidentId",

    authMiddleware,

    authorize(

        USER_ROLES.VIEWER,
        USER_ROLES.RESPONDER,
        USER_ROLES.ADMIN,
        USER_ROLES.OWNER

    ),

    getIncidentSimilar

);

export default router;