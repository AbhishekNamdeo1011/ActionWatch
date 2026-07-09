import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/config.js";
import { generateAuthTokens } from "../utils/auth.utils.js";
import sessionModel from "../models/session.model.js";
import { googleClient } from "../config/google.config.js";
import asyncHandler from "../utils/asyncHandler.js";
import { USER_ROLES } from "../constants/role.constants.js";
const register = asyncHandler(async (req, res) => {

    const { username, email, password, expertise } = req.body;

    const existingUser = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (existingUser) {
        return res.status(400).json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel(
        {
            username,
            email,
            password: hashedPassword,
            role: USER_ROLES.VIEWER,
            expertise
        });

    await newUser.save();

    const {
        accessToken,
        refreshToken
    } = await generateAuthTokens(newUser, req);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
        message: "User registered successfully",
        newUser: {
            username: newUser.username,
            email: newUser.email,
            role: USER_ROLES.VIEWER,
            expertise: newUser.expertise,
            accessToken
        }
    });

});

const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const {
        accessToken,
        refreshToken
    } = await generateAuthTokens(user, req);

    res.status(200).json({
        message: "Login successful",
        user: {
            username: user.username,
            email: user.email,
            role: user.role,
            expertise: user.expertise,
            accessToken
        }
    });

});

const googleLogin = asyncHandler(async (req, res) => {

    const { credential } = req.body;

    const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    if (!payload.email_verified) {
        return res.status(400).json({
            message: "Google email not verified"
        });
    }

    let user = await userModel.findOne({
        email: payload.email
    });

    if (!user) {

        user = await userModel.create({
            username: payload.name,
            email: payload.email,
            googleId: payload.sub,
            authProvider: "google",
            avatar: payload.picture
        });

    } else if (!user.googleId) {

        user.googleId = payload.sub;
        await user.save();

    }

    const {
        accessToken,
        refreshToken
    } = await generateAuthTokens(user, req);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: "Google login successful",
        user: {
            username: user.username,
            email: user.email,
            role: user.role,
            accessToken
        }
    });

});

const getMe = asyncHandler(async (req, res) => {

    return res.status(200).json({
        user: req.user
    });

});

const updateProfile = asyncHandler(async (req, res) => {

    const { username, expertise } = req.body;

    const updates = {};

    if (username) {
        updates.username = username;
    }

    if (expertise) {
        updates.expertise = expertise;
    }

    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        updates,
        {
            new: true,
            runValidators: true
        }
    ).select("-password");

    return res.status(200).json({
        message: "Profile updated successfully",
        user
    });

});

const refreshToken = asyncHandler(async (req, res) => {

    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No refresh token provided" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);

    if (!user) {
        return res.status(401).json({
            message: "User not found"
        });
    }

    const session = await sessionModel.findOne({
        user: user._id,
        revoked: false
    });

    if (!session) {
        return res.status(401).json({ message: "Session not found" });
    }

    const isMatch = await bcrypt.compare(token, session.refreshToken);

    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid refresh token"
        });
    }

    const accessToken = jwt.sign(
        {
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role

        },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );

    const newrefreshToken = jwt.sign(
        {
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        },

        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    const newRefreshTokenHash = await bcrypt.hash(newrefreshToken, 10);
    session.refreshToken = newRefreshTokenHash;
    await session.save();

    res.cookie("refreshToken", newrefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: "Token refreshed successfully",
        accessToken
    });

});

const logout = asyncHandler(async (req, res) => {

    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(400).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const session = await sessionModel.findOne({
        user: decoded.userId,
        revoked: false
    });

    if (!session) {
        return res.status(401).json({
            message: "Session not found"
        });
    }

    const isMatch = await bcrypt.compare(token, session.refreshToken);

    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid refresh token"
        });
    }

    session.revoked = true;
    await session.save();

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict"
    });

    res.status(200).json({ message: "Logout successful" });

});

const logoutAll = asyncHandler(async (req, res) => {

    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(400).json({
            message: "Refresh token not found"
        });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    await sessionModel.updateMany({
        user: decoded.userId,
        revoked: false
    }, {
        revoked: true
    });

    res.clearCookie("refreshToken");

    res.status(200).json({
        message: "Logged out from all devices successfully"
    });

});

export {
    register,
    login,
    googleLogin,
    getMe,
    updateProfile,
    refreshToken,
    logout,
    logoutAll,
};

