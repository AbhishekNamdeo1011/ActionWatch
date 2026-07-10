import express from "express";

import {authMiddleware} from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { USER_ROLES } from "../constants/role.constants.js";

import {

    dashboard,
        analytics,

} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get(

    "/",

    authMiddleware,

    authorize(

        USER_ROLES.VIEWER,
        USER_ROLES.RESPONDER,
        USER_ROLES.ADMIN,
        USER_ROLES.OWNER

    ),

    dashboard,
    


);
router.get(

    "/analytics",

    authMiddleware,

    authorize(

        USER_ROLES.VIEWER,
        USER_ROLES.RESPONDER,
        USER_ROLES.ADMIN,
        USER_ROLES.OWNER

    ),

    analytics

);

export default router;