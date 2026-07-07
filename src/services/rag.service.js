import { pineconeIndex } from "../config/pinecone.js";
import { generateEmbedding } from "./embedding.service.js";

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