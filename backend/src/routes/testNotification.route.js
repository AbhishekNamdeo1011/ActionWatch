import {testMail} from "../controllers/notification.controller.js";

import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { USER_ROLES } from "../constants/role.constants.js";


const router =
    express.Router();
router.get("/test-mail", authMiddleware, authorize(USER_ROLES.ADMIN, USER_ROLES.OWNER), testMail);

export default router;