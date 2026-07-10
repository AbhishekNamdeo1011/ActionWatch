import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/config.js";
import sessionModel from "../models/session.model.js";

export async function generateAuthTokens(user, req) {

    const refreshToken = jwt.sign(
        {
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        },
        config.JWT_SECRET,
        { expiresIn: "7d" }
    );

    const refreshTokenHash =
        await bcrypt.hash(refreshToken, 10);

    const session = await sessionModel.create({
        user: user._id,
        refreshToken: refreshTokenHash,
        userAgent: req.headers["user-agent"],
        ip: req.ip,
        expiresAt: new Date(
            Date.now() +
            7 * 24 * 60 * 60 * 1000
        )
    });

    const accessToken = jwt.sign(
        {
            userId: user._id,
            sessionId: session._id,
            username: user.username,
            email: user.email,
            role: user.role
        },
        config.JWT_SECRET,
        { expiresIn: "15m" }
    );

    return {
        accessToken,
        refreshToken
    };
}