import ai from "./ai.service.js";

import IncidentModel from "../models/incident.model.js";
import ServiceModel from "../models/service.model.js";
import {

    getRecentHealthChecks,

} from "../services/healthCheck.service.js";
import {
    getTimelineByIncident,
    createTimelineEntry,
} from "../services/timeline.service.js";
import {

    storeVector,

    getSimilarIncidents,

} from "./rag.service.js";

import { buildRootCausePrompt } from "../prompts/rootCause.prompt.js";

import { parseRootCause } from "../parsers/rootCause.parser.js";

export const generateRootCause = async (
    incidentId,
    force = false
) => {

    /*
    ==========================================
    Get Incident
    ==========================================
    */

    const incident = await IncidentModel.findById(incidentId)
.populate(
    "service",
    "name currentStatus"
    );

    if (!incident) {

        const error = new Error("Incident not found.");
        error.statusCode = 404;
        throw error;

    }

    /*
    ==========================================
    Return Cached AI Analysis
    ==========================================
    */

    if (
        !force &&
        incident.aiSummary &&
        incident.aiRootCauses.length
    ) {

        return {

            summary: incident.aiSummary,

            possibleCauses: incident.aiRootCauses,

            recommendations:
                incident.aiRecommendations,

        };

    }

    /*
    ==========================================
    Get Timeline
    ==========================================
    */

    const timeline =
        await getTimelineByIncident(
            incidentId
        );

    /*
    ==========================================
    Get Monitoring Context
    ==========================================
    */

    const service =
        await ServiceModel.findOne({

            activeIncident:
                incident._id,

        });
    const healthHistory = service

        ? await getRecentHealthChecks(

            service._id,

            10

        )

        : [];
    const monitoring = service

        ? {

            name:
                service.name,

            currentStatus:
                service.currentStatus,

            expectedStatus:
                service.expectedStatus,

            responseTime:
                service.lastResponseTime,

            httpStatus:
                service.lastHttpStatus,

            lastError:
                service.lastError,

            failureThreshold:
                service.failureThreshold,

            consecutiveFailures:
                service.consecutiveFailures,

            interval:
                service.interval,

            lastCheckedAt:
                service.lastCheckedAt,

        }

        : {};

    /*
==========================================
Find Similar Incidents
==========================================
*/

   const similarIncidents =
    await getSimilarIncidents(

        incident,

        5

    );

console.log(
    "\n========== Mongo Similar Incidents =========="
);

console.dir(

    similarIncidents,

    {

        depth: null,

    }

);

    console.log(
        "\n========== Similar Incidents =========="
    );

    console.log(similarIncidents);

    /*
    ==========================================
    Build Prompt
    ==========================================
    */

    const prompt =
        buildRootCausePrompt(

            incident,

            timeline,

            monitoring,
            healthHistory,
            similarIncidents

        );
console.log("\n========== RAG ==========\n");

console.dir(

    similarIncidents,

    {

        depth:null,

    }

);
    /*
    ==========================================
    Gemini
    ==========================================
    */

    console.log(
        "\nCalling Gemini..."
    );

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
    Parse AI Response
    ==========================================
    */

    const aiResult =
        parseRootCause(
            response.text
        );

    /*
    ==========================================
    Save AI
    ==========================================
    */


    incident.aiSummary =
        aiResult.summary;

    incident.aiRootCauses =
        aiResult.possibleCauses;

    incident.aiRecommendations =
        aiResult.recommendedActions;

    incident.aiRawResponse =
        response.text;

    incident.aiGeneratedAt =
        new Date();

    await incident.save();
    console.log("Step 1");
    /*
    ==========================================
    Store Embedding
    ==========================================
    */

    console.log(
        "Uploading incident to Pinecone..."
    );

    await storeVector(
        incident
    );
    console.log("Step 2");
    console.log(
        "Incident uploaded successfully."
    );

    /*
    ==========================================
    Timeline
    ==========================================
    */

    await createTimelineEntry({

        incidentId,

        eventType:
            "AI_ROOT_CAUSE",

        message:
            `AI generated ${aiResult.possibleCauses.length} possible root causes.`,

        metadata: {

            provider:
                "Gemini",

            model:
                "gemini-2.5-flash",

            highestConfidence:
                aiResult.possibleCauses[0]
                    ?.confidence,

        },

    });

    return {

        summary:
            incident.aiSummary,

        possibleCauses:
            incident.aiRootCauses,

        recommendations:
            incident.aiRecommendations,

    };

};