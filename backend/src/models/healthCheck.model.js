import mongoose from "mongoose";

const healthCheckSchema = new mongoose.Schema(

    {

        service: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "service",

            required: true,

        },

        currentStatus: {

            type: String,

            enum: ["UP", "DOWN"],

            required: true,

        },

        httpStatus: {

            type: Number,

            default: null,

        },

        responseTime: {

            type: Number,

            default: null,

        },

        error: {

            type: String,

            default: "",

        },

        checkedAt: {

            type: Date,

            default: Date.now,

        },

    },

    {

        timestamps: false,

    }

);

healthCheckSchema.index({

    service: 1,

    checkedAt: -1,

});

export default mongoose.model(

    "healthCheck",

    healthCheckSchema

);