import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true,"user is required"]
    },
   
    refreshToken: {
        type: String,
        required: [true,"refresh token is required"]
    },
    ip:{
        type: String,
        required: [true,"IP address is required"]
    },
    userAgent: {
        type: String,
        required: [true,"User agent is required"]
    },
    revoked: {
        type: Boolean,
        default: false
    },
     expiresAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const SessionModel = mongoose.model("session", sessionSchema);
export default SessionModel;