import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import config from "../config/config.js";

export const socketAuth = async (socket, next) => {

    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error("Authentication required"));
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel
        .findById(decoded.userId)
        .select("-password");

    if (!user) {
        return next(new Error("User not found"));
    }

    socket.user = user;

    next();

};