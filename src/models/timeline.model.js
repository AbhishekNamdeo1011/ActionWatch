import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema(
    {
        incident: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "incident",
            required: true,
            index: true,
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            default: null,
        },

        eventType: {
            type: String,
            enum: [
                "INCIDENT_CREATED",
                "STATUS_CHANGED",
                "SEVERITY_CHANGED",
                "COMMENT",
                "INCIDENT_UPDATED",
                "INCIDENT_RESOLVED",
                "INCIDENT_ASSIGNED",
                "INCIDENT_ACKNOWLEDGED",
                "RESPONDER_ASSIGNED",
                "RESPONDER_REMOVED",
                "SERVICE_DOWN",
                "SERVICE_RECOVERED",
                "COMMENT_ADDED",
                "AI_ROOT_CAUSE",
                "AI_SIMILAR_INCIDENTS",
                "AI_POSTMORTEM",
            ],
            required: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

timelineSchema.index({
    incident: 1,
    createdAt: 1,
});

const TimelineModel = mongoose.model(
    "timeline",
    timelineSchema
);

export default TimelineModel;