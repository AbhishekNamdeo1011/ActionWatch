import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(

    {

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "user",

            required: true,

        },

        incident: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "incident",

            default: null,

        },

        type: {

            type: String,

            enum: [

                "INCIDENT_CREATED",

                "INCIDENT_ASSIGNED",

                "INCIDENT_RESOLVED",

                "AI_ROOT_CAUSE",

                "AI_POSTMORTEM",

                "SERVICE_DOWN",

                "SERVICE_RECOVERED",

            ],

            required: true,

        },

        title: {

            type: String,

            required: true,

            trim: true,

        },

        message: {

            type: String,

            required: true,

            trim: true,

        },

        isRead: {

            type: Boolean,

            default: false,

        },

    },

    {

        timestamps: true,

    }

);

const NotificationModel = mongoose.model(

    "notification",

    notificationSchema

);

export default NotificationModel;