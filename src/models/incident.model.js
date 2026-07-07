import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
    {
        /*
        ==========================================
        Basic Information
        ==========================================
        */

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        /*
        ==========================================
        Incident Details
        ==========================================
        */

        severity: {
            type: String,
            enum: ["P0", "P1", "P2"],
            required: true,
        },

        status: {
            type: String,
            enum: [
                "open",
                "investigating",
                "identified",
                "monitoring",
                "resolved",
            ],
            default: "open",
        },

        service: {
            type: String,
            required: true,
            enum: [
                "payment",
                "auth",
                "database",
                "api",
                "frontend",
                "cdn",
                "email",
                "other",
            ],
        },

        affectedUsers: {
            type: Number,
            default: 0,
            min: 0,
        },

        detectedBy: {
            type: String,
            enum: [
                "manual",
                "monitor",
                "webhook",
            ],
            default: "manual",
        },

        /*
        ==========================================
        Ownership
        ==========================================
        */

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            default: null,
        },

        assignedTo: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
        ],

        /*
        ==========================================
        Monitoring
        ==========================================
        */

        detectedAt: {
            type: Date,
            default: Date.now,
        },

        resolvedAt: {
            type: Date,
            default: null,
        },

        // Mean Time To Resolve (seconds)
        mttr: {
            type: Number,
            default: null,
        },

        /*
        ==========================================
        Error Information
        ==========================================
        */

        errorCode: {
            type: String,
            default: "",
        },

        errorLogs: {
            type: String,
            default: "",
        },

        /*
        ==========================================
        AI Analysis
        ==========================================
        */

        aiSummary: {
            type: String,
            default: "",
        },

        aiRootCauses: [
            {
                cause: {
                    type: String,
                    required: true,
                },

                confidence: {
                    type: Number,
                    min: 0,
                    max: 100,
                },

                reasoning: {
                    type: String,
                    default: "",
                },

                suggestedFix: {
                    type: String,
                    default: "",
                },
            },
        ],

        aiRecommendations: [
            {
                type: String,
            },
        ],
aiRawResponse: {

    type: String,

    default: "",

},

aiGeneratedAt: {

    type: Date,

    default: null,

},
        aiSimilarIncidents: [
            {
                incidentId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "incident",
                },

                similarity: {
                    type: Number,
                    min: 0,
                    max: 100,
                },

                resolution: {
                    type: String,
                    default: "",
                },
            },
        ],
postmortem: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "postmortem",

    default: null,

},
        aiPostmortem: {
            type: String,
            default: "",
        },

        /*
        ==========================================
        Search Tags
        ==========================================
        */

        tags: [
            {
                type: String,
                trim: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

/*
==========================================
Indexes
==========================================
*/

incidentSchema.index({
    status: 1,
    severity: 1,
});

incidentSchema.index({
    service: 1,
});

incidentSchema.index({
    detectedAt: -1,
});

incidentSchema.index({
    assignedTo: 1,
});

const IncidentModel = mongoose.model(
    "incident",
    incidentSchema
);

export default IncidentModel;