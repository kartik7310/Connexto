

import logger from "../config/logger.js";

import AuthService from "../services/auth.js";
import AppError from "../utils/AppError.js";
import { signupSchema, loginSchema, resetPasswordSchema } from "../validators/user.js"

const AuthController = {
 async sendOtp(req, res, next){
  try {
   const {email} = req.body;
   if (!email) {
    return next(new AppError('Email is required', 400))
   }

   await AuthService.otpSend({email});
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your email',
      
    });

  } catch (error) {
    console.error('Send OTP error:', error);
   next(error);
    
  }
 },
    

  async signup(req, res, next) {
    try {
      const parsed = signupSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: "Validation failed",
          errors: parsed.error.errors,
        });
      }

      await AuthService.signup(parsed.data);
      

      res.status(201).json({
        success:true,
        message: "User registered successfully",
      });
    } catch (err) {
      next(err);
    }
  },

   async login(req, res, next) {
  try {
   
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      logger.warn("Login validation failed", { errors: parsed.error.errors });
      return next(new AppError("Validation failed", 400));
    }


    const { token,user } = await AuthService.login(parsed.data);
     logger.info("token",token);
    

 
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: "true",
        message: "Login successful",
         user,
        token,
      });

    logger.info(`User logged in: ${user.email}`);
  } catch (err) {
    logger.error("Login failed", { error: err.message });
    next(err);
  }
},

async googleLogin(req, res, next) {
  try {
    const { idToken } = req.body;
    
    if (!idToken) {
      logger.warn("Google login attempt without ID token");
      return res.status(400).json({ message: "ID token is required" });
    }

    const result = await AuthService.googleLogin(idToken);
    
    logger.info("Google login success");
    return res
      .cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: result.user,
        token: result.token,
      });
  } catch (err) {
    logger.error("Google login failed", { error: err.message });
    next(err);
  }
},
async forgotPassword(req, res, next){
  try {
   const {email} = req.body;
   if (!email) {
    return next(new AppError('Email is required', 400))
   }

   await AuthService.forgotPassword(email);
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your email',
      
    });

  } catch (error) {
    console.error('Send OTP error:', error);
   next(error);
    
  }
 },

 async resetPassword(req, res, next){
  try {
    const parsed = resetPasswordSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: "Validation failed",
          errors: parsed.error.errors,
        });
      }

    await AuthService.resetPassword(parsed.data);
    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
      
    });

  } catch (error) {
    console.error('Reset password error:', error);
   next(error);
   
  }
 },
  async logout(req, res) {
    res
      .cookie("token", null, {
        expires: new Date(0),
        httpOnly: true,
      })
      .status(200)
      .json({ message: "Logout successful" });
  },
};

export default AuthController;
