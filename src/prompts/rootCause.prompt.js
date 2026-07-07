export const buildRootCausePrompt = (
    incident,
    timeline,
    monitoring = {},
    healthHistory
) => {

    return `
You are a Senior Site Reliability Engineer (SRE) with extensive experience in diagnosing production incidents.

Your job is to analyze this production incident and determine the most probable root causes.

==========================
RULES
==========================

1. Return ONLY valid JSON.
2. Never return markdown.
3. Never wrap JSON inside \`\`\`.
4. Never invent facts.
5. Base conclusions only on the information provided.
6. If information is insufficient, explicitly mention it.
7. Confidence must be an INTEGER between 0 and 100.
8. Never use confidence above 90 if logs are missing.
9. Rank causes from highest confidence to lowest.
10. Every cause MUST contain:
   - cause
   - confidence
   - reasoning
   - suggestedFix
11. suggestedFix must never be empty.
12. Recommendations must be actionable and incident-specific.
13. Avoid generic advice.

Return EXACTLY this JSON:

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
INCIDENT
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

Last HTTP Status:
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
==========================
RECENT HEALTH CHECKS
==========================

${healthHistory.length === 0

? "No health history available."

: healthHistory.map(check => `

Time: ${check.checkedAt}

Status: ${check.currentStatus}

HTTP: ${check.httpStatus}

Response: ${check.responseTime} ms

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

`;
};