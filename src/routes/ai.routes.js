import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";

import {
    generateIncidentRootCause,
} from "../controllers/ai.controller.js";

const router =
    express.Router();

router.post(

    "/root-cause/:incidentId",

    authMiddleware,

    generateIncidentRootCause

); 

export default router;