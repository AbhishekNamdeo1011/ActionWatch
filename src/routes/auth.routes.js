import { Router } from "express";
import { register,login,getMe,updateProfile,refreshToken,logout, logoutAll } from "../controllers/auth.controller.js";
import {  validateRegistration,validateLogin,validateUpdateProfile } from "../middleware/validator.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { loginLimiter, registerLimiter } from "../middleware/rateLimiter.middleware.js";
const router = Router();


router.post('/register', validateRegistration, registerLimiter, register);
router.post('/login', validateLogin, loginLimiter, login);
router.get('/me', authMiddleware, getMe);
router.put('/profile', authMiddleware, validateUpdateProfile, updateProfile);
router.get('/refresh-token', refreshToken);
router.get('/logout', authMiddleware, logout);
router.get('/logout-all', authMiddleware, logoutAll);

export default router;
