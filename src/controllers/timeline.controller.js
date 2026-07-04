import {
    createTimelineEntry,
    getTimelineByIncident,
} from "../services/timeline.service.js";

/*
==========================================
Create Timeline Entry
==========================================
*/

export const createTimeline = async (
    req,
    res
) => {

    try {

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

        const timeline =
            await createTimelineEntry({

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

    }

    catch (error) {

        if (error.statusCode) {

            return res.status(error.statusCode).json({

                success: false,

                message: error.message,

            });

        }

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};

/*
==========================================
Get Incident Timeline
==========================================
*/

export const getIncidentTimeline = async (
    req,
    res
) => {

    try {

        const timeline =
            await getTimelineByIncident(

                req.params.incidentId

            );

        return res.status(200).json({

            success: true,

            message: "Timeline fetched successfully.",

            data: timeline,

        });

    }

    catch (error) {

        if (error.statusCode) {

            return res.status(error.statusCode).json({

                success: false,

                message: error.message,

            });

        }

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};