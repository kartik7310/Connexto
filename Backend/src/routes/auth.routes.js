import express from "express";
import AuthController from "../controllers/auth.js"
import {protect} from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/logout", protect, AuthController.logout);

export default router;
