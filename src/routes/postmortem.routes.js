import express from "express";

import {

    generateIncidentPostmortem,

    getIncidentPostmortem,

} from "../controllers/postmortem.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(

    "/:incidentId",

    authMiddleware,

    generateIncidentPostmortem

);
router.get(

    "/:incidentId",

    authMiddleware,

    getIncidentPostmortem

);

export default router;