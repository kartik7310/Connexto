import express from "express";
import AuthController from "../controllers/auth.js"
import {protect} from "../middleware/auth.middleware.js"
import {otpLimiter,signupLimiter,loginLimiter,resetPasswordLimiter}  from "../middleware/rateLimiter.js"
const router = express.Router();

router.post("/send-otp", otpLimiter, AuthController.sendOtp);
router.post("/signup",signupLimiter, AuthController.signup);
router.post("/login",loginLimiter, AuthController.login);

router.post("/logout", protect, AuthController.logout);
router.post("/google-login", AuthController.googleLogin);

router.post("/forgot-password",otpLimiter, AuthController.forgotPassword);

router.post("/reset-password",resetPasswordLimiter, AuthController.resetPassword);
export default router;
