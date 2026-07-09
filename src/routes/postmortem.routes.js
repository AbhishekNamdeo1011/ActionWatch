import express from "express";

import {

    generateIncidentPostmortem,

    getIncidentPostmortem,

} from "../controllers/postmortem.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { USER_ROLES } from "../constants/role.constants.js";

const router = express.Router();

router.post(

    "/:incidentId",

    authMiddleware,

    authorize(

        USER_ROLES.RESPONDER,
        USER_ROLES.ADMIN,
        USER_ROLES.OWNER

    ),

    generateIncidentPostmortem

);
router.get(

    "/:incidentId",

    authMiddleware,

    authorize(

        USER_ROLES.VIEWER,
        USER_ROLES.RESPONDER,
        USER_ROLES.ADMIN,
        USER_ROLES.OWNER

    ),

    getIncidentPostmortem

);

export default router;