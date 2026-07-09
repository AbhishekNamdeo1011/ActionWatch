import {

    getSimilarIncidents,

} from "../services/similarIncident.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getIncidentSimilar = asyncHandler(async (req, res) => {

    const data = await getSimilarIncidents(req.params.incidentId);

    return res.status(200).json({

        success: true,

        data,

    });

});