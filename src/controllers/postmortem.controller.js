import {
    generatePostmortem,
} from "../services/postmortem.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const generateIncidentPostmortem = asyncHandler(async (
    req,
    res
) => {

    const postmortem = await generatePostmortem(req.params.incidentId);

    return res.status(200).json({

        success: true,

        message: "AI postmortem generated successfully.",

        data: postmortem,

    });

});
import {
    getPostmortem,
} from "../services/postmortem.service.js";

export const getIncidentPostmortem = asyncHandler(async (
    req,
    res
) => {

    const postmortem = await getPostmortem(req.params.incidentId);

    return res.status(200).json({

        success: true,

        data: postmortem,

    });

});