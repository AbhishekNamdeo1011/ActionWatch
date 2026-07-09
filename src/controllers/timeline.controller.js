import {
    createTimelineEntry,
    getTimelineByIncident,
} from "../services/timeline.service.js";
import asyncHandler from "../utils/asyncHandler.js";

/*
==========================================
Create Timeline Entry
==========================================
*/

export const createTimeline = asyncHandler(async (req, res) => {

    const { incidentId } = req.params;

    const {
        message,
        eventType,
        metadata = {},
    } = req.body;

    if (!message?.trim()) {

        return res.status(400).json({

            success: false,

            message: "Message is required.",

        });

    }

    const timeline = await createTimelineEntry({

        incidentId,

        author: req.user._id,

        eventType,

        message: message.trim(),

        metadata,

    });

    return res.status(201).json({

        success: true,

        message: "Timeline entry created successfully.",

        data: timeline,

    });

});

/*
==========================================
Get Incident Timeline
==========================================
*/

export const getIncidentTimeline = asyncHandler(async (req, res) => {

    const timeline = await getTimelineByIncident(

        req.params.incidentId

    );

    return res.status(200).json({

        success: true,

        message: "Timeline fetched successfully.",

        data: timeline,

    });

});