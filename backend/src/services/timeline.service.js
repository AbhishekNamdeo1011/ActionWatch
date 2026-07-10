import IncidentModel from "../models/incident.model.js";
import TimelineModel from "../models/timeline.model.js";

import {
    emitTimelineCreated,
} from "../sockets/socket.events.js";

/*
==========================================
Create Timeline Entry
==========================================
*/

export const createTimelineEntry = async ({
    incidentId,
    author = null,
    eventType,
    message,
    metadata = {},
}) => {

    const incident = await IncidentModel.findById(
        incidentId
    );

    if (!incident) {

        const error = new Error(
            "Incident not found."
        );

        error.statusCode = 404;

        throw error;

    }

    const timeline = await TimelineModel.create({

        incident: incidentId,

        author,

        eventType,

        message,

        metadata,

    });

    await timeline.populate({
        path: "author",
        select: "username role",
    });

    emitTimelineCreated(
        incidentId,
        timeline
    );

    return timeline;

};

/*
==========================================
Get Timeline By Incident
==========================================
*/

export const getTimelineByIncident = async (
    incidentId
) => {

    const incident =
        await IncidentModel.findById(
            incidentId
        ).select("_id");

    if (!incident) {

        const error = new Error(
            "Incident not found."
        );

        error.statusCode = 404;

        throw error;

    }

    return TimelineModel.find({

        incident: incidentId,

    })

        .populate({

            path: "author",

            select: "username role",

        })

        .sort({

            createdAt: 1,

        });

};