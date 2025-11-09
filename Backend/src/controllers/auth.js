import { success } from "zod";
import logger from "../config/logger.js";
import AuthService from "../services/auth.js";
import { signupSchema, loginSchema } from "../validators/user.js"

const AuthController = {
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
    
  } catch (error) {
    
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
