import ai from "./ai.service.js";

import IncidentModel from "../models/incident.model.js";
import PostmortemModel from "../models/postmortem.model.js";
import ServiceModel from "../models/service.model.js";

import {
    getTimelineByIncident,
    createTimelineEntry,
} from "./timeline.service.js";

import {
    getRecentHealthChecks,
} from "./healthCheck.service.js";

import {
    getSimilarIncidents,
} from "./rag.service.js";

import {
    buildPostmortemPrompt,
} from "../prompts/postmortem.prompt.js";

import {
    parsePostmortem,
} from "../parsers/postmortem.parser.js";

export const generatePostmortem = async (
    incidentId
) => {

    /*
    ==========================================
    Get Incident
    ==========================================
    */

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
    if (incident.status !== "resolved") {

    const error = new Error(
        "Postmortem can only be generated after the incident is resolved."
    );

    error.statusCode = 400;

    throw error;

}

    /*
    ==========================================
    Already Generated
    ==========================================
    */

    if (incident.postmortem) {

        return await PostmortemModel.findById(
            incident.postmortem
        );

    }

    /*
    ==========================================
    Timeline
    ==========================================
    */

    const timeline =
        await getTimelineByIncident(
            incidentId
        );

    /*
    ==========================================
    Monitoring
    ==========================================
    */

    const service =
        await ServiceModel.findOne({

            activeIncident:
                incident._id,

        });

    const healthHistory =
        service

            ? await getRecentHealthChecks(

                service._id,

                10

            )

            : [];

    const monitoring =
        service

            ? {

                name:
                    service.name,

                currentStatus:
                    service.currentStatus,

                expectedStatus:
                    service.expectedStatus,

                httpStatus:
                    service.lastHttpStatus,

                responseTime:
                    service.lastResponseTime,

            }

            : {};

    /*
    ==========================================
    Similar Incidents (RAG)
    ==========================================
    */

    const similarIncidents =
        await getSimilarIncidents(

            incident,

            3

        );

    /*
    ==========================================
    Prompt
    ==========================================
    */

    const prompt =
        buildPostmortemPrompt(

            incident,

            timeline,

            monitoring,

            healthHistory,

            similarIncidents

        );

    console.log(
        "\nGenerating AI Postmortem..."
    );

    /*
    ==========================================
    Gemini
    ==========================================
    */

    const response =
        await ai.models.generateContent({

            model:
                "gemini-2.5-flash",

            contents:
                prompt,

        });

    if (!response.text) {

        throw new Error(
            "Gemini returned an empty response."
        );

    }

    /*
    ==========================================
    Parse
    ==========================================
    */

    const result =
        parsePostmortem(
            response.text
        );

    /*
    ==========================================
    Save Postmortem
    ==========================================
    */

    const postmortem =
        await PostmortemModel.create({

            incident:
                incident._id,

            summary:
                result.summary,

            impact:
                result.impact,

            rootCause:
                result.rootCause,

            resolution:
                result.resolution,

            preventiveActions:
                result.preventiveActions,

            lessonsLearned:
                result.lessonsLearned,

        });

    /*
    ==========================================
    Link Incident
    ==========================================
    */

    incident.postmortem =
        postmortem._id;

    await incident.save();

    /*
    ==========================================
    Timeline
    ==========================================
    */

    await createTimelineEntry({

        incidentId:
            incident._id,

        eventType:
            "AI_POSTMORTEM",

        message:
            "AI generated postmortem report.",

        metadata: {

            provider:
                "Gemini",

        },

    });

    return postmortem;

};
export const getPostmortem = async (
    incidentId
) => {

    const postmortem =
        await PostmortemModel
            .findOne({

                incident: incidentId,

            })
            .populate(

                "incident",

                "title severity status service"

            );

    if (!postmortem) {

        const error = new Error(
            "Postmortem not found."
        );

        error.statusCode = 404;

        throw error;

    }

    return postmortem;

};