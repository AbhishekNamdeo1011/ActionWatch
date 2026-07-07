export const buildPostmortemPrompt = (
    incident,
    timeline,
    monitoring = {},
    healthHistory = [],
    similarIncidents = []
) => {

    const similarIncidentContext =
        similarIncidents.length > 0

            ? similarIncidents.map((incident, index) => `

Previous Incident ${index + 1}

Similarity:
${(incident.similarity * 100).toFixed(1)}%

Title:
${incident.title}

Summary:
${incident.aiSummary || "Unknown"}

Root Causes:
${incident.aiRootCauses?.map(c => `- ${c.cause}`).join("\n") || "None"}

Resolution:
${incident.resolution || "Unknown"}

`).join("\n--------------------------------------\n")

            : "No similar historical incidents found.";

    return `

You are a Senior Site Reliability Engineer.

Generate a professional incident postmortem.

The postmortem should be concise, technical, and suitable for engineering teams.

Rules:

1. Return ONLY JSON.
2. Never return markdown.
3. Never wrap JSON inside \`\`\`.
4. Never invent facts.
5. If information is unavailable, clearly state it.
6. Use historical incidents only as supporting evidence.
7. Keep the language professional.

Return EXACTLY:

{
  "summary":"",
  "impact":"",
  "rootCause":"",
  "resolution":"",
  "preventiveActions":[
      ""
  ],
  "lessonsLearned":[
      ""
  ]
}

==================================================
CURRENT INCIDENT
==================================================

Title:
${incident.title}

Description:
${incident.description}

Severity:
${incident.severity}

Status:
${incident.status}

Affected Users:
${incident.affectedUsers}

Detected By:
${incident.detectedBy}

Error Logs:
${incident.errorLogs || "N/A"}

==================================================
MONITORING
==================================================

Service:
${monitoring.name || "Unknown"}

Current Status:
${monitoring.currentStatus || "Unknown"}

Expected Status:
${monitoring.expectedStatus || "Unknown"}

HTTP Status:
${monitoring.httpStatus || "Unknown"}

Last Response Time:
${monitoring.responseTime ?? "Unknown"} ms

==================================================
HEALTH HISTORY
==================================================

${healthHistory.length === 0

? "No health history available."

: healthHistory.map(check => `

Time:
${check.checkedAt}

Status:
${check.currentStatus}

HTTP:
${check.httpStatus}

Response:
${check.responseTime} ms

Error:
${check.error}

`).join("\n")
}

==================================================
TIMELINE
==================================================

${timeline.length === 0

? "No timeline available."

: timeline.map(item => `

Time:
${item.createdAt}

Event:
${item.eventType}

Message:
${item.message}

`).join("\n")
}

==================================================
SIMILAR HISTORICAL INCIDENTS
==================================================

${similarIncidentContext}

Generate a professional engineering postmortem.

`;
};