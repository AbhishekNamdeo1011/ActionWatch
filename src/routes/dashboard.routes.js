import express from "express";

import {authMiddleware} from "../middleware/auth.middleware.js";

import {

    dashboard,
        analytics,

} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get(

    "/",

    authMiddleware,

    dashboard,
    


);
router.get(

    "/analytics",

    authMiddleware,

    analytics

);

export default router;