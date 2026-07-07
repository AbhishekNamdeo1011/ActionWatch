import { pineconeIndex } from "../config/pinecone.js";
import { generateEmbedding } from "./embedding.service.js";
import mongoose from "mongoose";

/*
==========================================
Store Vector
==========================================
*/
/*
==========================================
Build Incident Document
==========================================
*/

export const buildIncidentDocument = (

    incident

) => {

    const causes =
        incident.aiRootCauses
            ?.map(c => c.cause)
            .join(", ") || "None";

    const fixes =
        incident.aiRootCauses
            ?.map(c => c.suggestedFix)
            .join(", ") || "None";

    return `

Title:
${incident.title}

Description:
${incident.description}

Severity:
${incident.severity}

Service:
${incident.service}

Status:
${incident.status}

Affected Users:
${incident.affectedUsers}

Error Logs:
${incident.errorLogs || "None"}

Root Cause Summary:
${incident.aiSummary || "None"}

Possible Causes:
${causes}

Suggested Fixes:
${fixes}

Tags:
${incident.tags?.join(", ") || "None"}

`;

};
export const storeVector = async (incident) => {

    console.log("========== PINECONE ==========");
    console.log("Preparing vector...");
    console.log("Incident:", incident._id.toString());

    const text = buildIncidentDocument(incident);

    console.log("Document:");
    console.log(text);

    const embedding = await generateEmbedding(text);

    console.log("Embedding Size:", embedding.length);
console.log({
    id: incident._id.toString(),
    vectorLength: embedding.length,
    metadata: {
        incidentId: incident._id.toString(),
        severity: incident.severity,
        service: incident.service,
        status: incident.status,
    },
});
   await pineconeIndex.upsert({
    records: [
        {
            id: incident._id.toString(),
            values: embedding,
            metadata: {
                incidentId: incident._id.toString(),
                severity: incident.severity,
                service: incident.service,
                status: incident.status,
            },
        },
    ],
});

    console.log("✅ Uploaded to Pinecone");
};
/*
==========================================
Search Similar
==========================================
*/

export const searchSimilarVectors = async (

    text,

    topK = 5

) => {

    const embedding =
        await generateEmbedding(text);

    const result =
        await pineconeIndex.query({

            vector: embedding,

            topK,

            includeMetadata: true,

        });

    return result.matches ?? [];

};
/*
==========================================
Find Similar Incidents
==========================================
*/

export const findSimilarIncidents = async (

    incident,

    topK = 5

) => {

    /*
    ==========================================
    Build Document
    ==========================================
    */

    const text =
        buildIncidentDocument(
            incident
        );

    /*
    ==========================================
    Generate Embedding
    ==========================================
    */

    const embedding =
        await generateEmbedding(
            text
        );

    /*
    ==========================================
    Search Pinecone
    ==========================================
    */

    const result =
        await pineconeIndex.query({

            vector: embedding,

            topK,

            includeMetadata: true,

        });

    return result.matches;

};

/*
==========================================
Fetch Similar Incidents
==========================================
*/

import IncidentModel from "../models/incident.model.js";

export const getSimilarIncidents = async (

    incident,

    topK = 5

) => {

    const matches =
        await findSimilarIncidents(

            incident,

            topK + 1

        );

    /*
    ============================
    Remove Current Incident
    ============================
    */
const filtered = matches
    .filter(match => {

        return (

            match.id !== incident._id.toString() &&

            match.score >= 0.80

        );

    })
    .slice(0, 3);

    /*
    ============================
    No Results
    ============================
    */

    if (!filtered.length) {

        return [];

    }

    /*
    ============================
    Mongo IDs
    ============================
    */

    const ids = filtered
    .map(match => match.id)
    .filter(id => mongoose.Types.ObjectId.isValid(id));

    /*
    ============================
    Fetch Incidents
    ============================
    */

    const incidents =

        await IncidentModel.find({

            _id: {

                $in: ids,

            },

        });
        const scoreMap = new Map(

    filtered.map(

        match => [

            match.id,

            match.score,

        ]

    )

);

incidents.sort((a, b) =>

    scoreMap.get(b._id.toString()) -

    scoreMap.get(a._id.toString())

);

    /*
    ============================
    Attach Similarity Score
    ============================
    */

  return incidents.map((incident) => {

    const similarity =
        scoreMap.get(
            incident._id.toString()
        );

    return {

        id: incident._id,

        title: incident.title,

        description: incident.description,

        severity: incident.severity,

        status: incident.status,

        service: incident.service,

        affectedUsers: incident.affectedUsers,

        detectedAt: incident.detectedAt,

        resolvedAt: incident.resolvedAt,

        mttr: incident.mttr,

        summary: incident.aiSummary,

        similarity: Number(
            (similarity * 100).toFixed(1)
        ),

    };

});

}; 