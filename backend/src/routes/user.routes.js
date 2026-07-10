import { Router } from "express";

import {

    updateUserRole,

} from "../controllers/user.controller.js";

import {

    authMiddleware,

} from "../middleware/auth.middleware.js";

import {

    authorize,

} from "../middleware/authorize.middleware.js";

import {

    USER_ROLES,

} from "../constants/role.constants.js";

const router = Router();

router.patch(

    "/:userId/role",

    authMiddleware,

    authorize(

        USER_ROLES.ADMIN,

        USER_ROLES.OWNER

    ),

    updateUserRole

);

export default router;