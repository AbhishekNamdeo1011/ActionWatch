import { Router } from "express";
import { register,login,getMe,updateProfile,refreshToken,logout, logoutAll,googleLogin } from "../controllers/auth.controller.js";
import {  validateRegistration,validateLogin,validateUpdateProfile } from "../middleware/validator.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { loginLimiter, registerLimiter } from "../middleware/rateLimiter.middleware.js";
import { USER_ROLES } from "../constants/role.constants.js";
const router = Router();


router.post('/register', validateRegistration, registerLimiter, register);
router.post('/login', validateLogin, loginLimiter, login);
router.get('/me', authMiddleware, authorize(USER_ROLES.VIEWER, USER_ROLES.RESPONDER, USER_ROLES.ADMIN, USER_ROLES.OWNER), getMe);
router.put('/profile', authMiddleware, authorize(USER_ROLES.VIEWER, USER_ROLES.RESPONDER, USER_ROLES.ADMIN, USER_ROLES.OWNER), validateUpdateProfile, updateProfile);
router.get('/refresh-token', refreshToken);
router.get('/logout', authMiddleware, authorize(USER_ROLES.VIEWER, USER_ROLES.RESPONDER, USER_ROLES.ADMIN, USER_ROLES.OWNER), logout);
router.get('/logout-all', authMiddleware, authorize(USER_ROLES.VIEWER, USER_ROLES.RESPONDER, USER_ROLES.ADMIN, USER_ROLES.OWNER), logoutAll);
router.post('/google-login', googleLogin);
export default router;
