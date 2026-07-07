import mongoose from "mongoose";

const postmortemSchema = new mongoose.Schema(

    {

        incident: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "incident",

            required: true,

            unique: true,

        },

        summary: {

            type: String,

            required: true,

        },

        impact: {

            type: String,

            required: true,

        },

        rootCause: {

            type: String,

            required: true,

        },

        resolution: {

            type: String,

            required: true,

        },

        preventiveActions: [

            {

                type: String,

            },

        ],

        lessonsLearned: [

            {

                type: String,

            },

        ],

        generatedBy: {

            type: String,

            default: "Gemini",

        },

    },

    {

        timestamps: true,

    }

);

const PostmortemModel = mongoose.model(

    "postmortem",

    postmortemSchema

);

export default PostmortemModel;