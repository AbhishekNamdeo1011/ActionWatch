import express from "express";

import {authMiddleware} from "../middleware/auth.middleware.js";

import {

    getIncidentSimilar,

} from "../controllers/similarIncident.controller.js";

const router = express.Router();

router.get(

    "/:incidentId",

    authMiddleware,

    getIncidentSimilar

);

export default router;