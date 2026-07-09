import {
    generateRootCause,
} from "../services/rootCause.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const generateIncidentRootCause =
    asyncHandler(async (
        req,
        res
    ) => {

        const result = await generateRootCause(

            req.params.incidentId,

            req.query.force === "true"

        );

        return res.status(200).json({

            success: true,

            message:
                "AI root cause generated successfully.",

            data: result,

        });

    });