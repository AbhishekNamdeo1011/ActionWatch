import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        url: {
            type: String,
            required: true,
            trim: true,
        },

        method: {
            type: String,
            enum: ["GET", "POST", "HEAD"],
            default: "GET",
        },

        expectedStatus: {
            type: Number,
            default: 200,
        },

        interval: {
            type: Number,
            default: 30,
        },

        timeout: {
            type: Number,
            default: 5000,
        },

        failureThreshold: {
            type: Number,
            default: 3,
        },

        consecutiveFailures: {
            type: Number,
            default: 0,
        },

        currentStatus: {
            type: String,
            enum: ["UP", "DOWN", "UNKNOWN"],
            default: "UNKNOWN",
        },
        activeIncident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "incident",
    default: null
},

        lastCheckedAt: {
            type: Date,
            default: null,
        },

        lastResponseTime: {
            type: Number,
            default: null,
        },
        lastHttpStatus: {
    type: Number,
    default: null,
},

lastError: {
    type: String,
    default: "",
},

        isActive: {
            type: Boolean,
            default: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

/*
Prevent duplicate service URLs
for the same user.
*/

serviceSchema.index(
    {
        createdBy: 1,
        url: 1,
    },
    {
        unique: true,
    }
);

export default mongoose.model("service", serviceSchema);