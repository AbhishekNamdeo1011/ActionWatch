export const buildRootCausePrompt = (
    incident,
    timeline,
    monitoring = {},
    healthHistory = [],
    similarIncidents = []
) => {

    /*
    ==========================================
    Similar Historical Incidents
    ==========================================
    */

    const similarIncidentContext =
        similarIncidents.length > 0

            ? similarIncidents.map((incident, index) => `

Previous Incident ${index + 1}

Similarity:
${(incident.similarity * 100).toFixed(1)}%

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

AI Root Cause Summary:
${incident.aiSummary || "Unknown"}

Possible Causes:
${incident.aiRootCauses?.map(c => `- ${c.cause}`).join("\n") || "None"}

Recommended Actions:
${incident.aiRecommendations?.map(r => `- ${r}`).join("\n") || "None"}

--------------------------------------------------

`).join("\n")

            : "No similar historical incidents found.";

    return `

You are a Senior Site Reliability Engineer (SRE).

Your task is to analyze the current production incident.

IMPORTANT:

- First analyze the current incident.
- Then compare it with any historical incidents.
- If historical incidents are relevant, explain why.
- Do NOT blindly copy previous root causes.
- Use previous incidents only as supporting evidence.
- If no similar incidents exist, rely entirely on the current incident data.
- Never invent facts.
- If logs are missing, explicitly mention that confidence is reduced.

==========================================
RULES
==========================================

1. Return ONLY valid JSON.
2. Never return markdown.
3. Never wrap JSON inside \`\`\`.
4. Confidence must be an integer (0-100).
5. Never exceed 90 confidence unless strong evidence exists.
6. Every possible cause MUST include:
   - cause
   - confidence
   - reasoning
   - suggestedFix
7. suggestedFix must never be empty.
8. Recommendations must be practical and actionable.

Return EXACTLY:

{
  "summary": "",
  "possibleCauses": [
    {
      "cause": "",
      "confidence": 0,
      "reasoning": "",
      "suggestedFix": ""
    }
  ],
  "recommendedActions": [
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

Error Code:
${incident.errorCode || "N/A"}

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

Response Time:
${monitoring.responseTime ?? "Unknown"} ms

Failure Threshold:
${monitoring.failureThreshold ?? "Unknown"}

Consecutive Failures:
${monitoring.consecutiveFailures ?? "Unknown"}

Monitoring Interval:
${monitoring.interval ?? "Unknown"} sec

Last Checked:
${monitoring.lastCheckedAt || "Unknown"}

==================================================
RECENT HEALTH CHECKS
==================================================

${healthHistory.length === 0
    ? "No health history available."
    : healthHistory.map(check => `

Time: ${check.checkedAt}
Status: ${check.currentStatus}
HTTP Status: ${check.httpStatus}
Response Time: ${check.responseTime} ms
Error: ${check.error}

`).join("\n")
}

==================================================
TIMELINE
==================================================

${timeline.length === 0
    ? "No timeline available."
    : timeline.map(item => `

Time: ${item.createdAt}

Event: ${item.eventType}

Message: ${item.message}

`).join("\n")
}

==================================================
SIMILAR HISTORICAL INCIDENTS
==================================================

${similarIncidentContext}

==================================================
FINAL INSTRUCTIONS
==================================================

1. Analyze the current incident first.

2. Compare it with the historical incidents.

3. If a similarity score is above 90%, explicitly explain that the incident is highly similar.

4. Mention which historical incident influenced your reasoning.

5. Never copy previous answers blindly.

6. Explain why the current incident is similar or different.

7. If no relevant incidents exist, explicitly state that.

8. Return ONLY valid JSON.

`;
};