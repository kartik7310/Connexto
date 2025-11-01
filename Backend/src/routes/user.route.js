import express from "express";

import ProfileController from "../controllers/user.js";
const router = express.Router();
router.get("/profile", authenticateUser, ProfileController.getProfile);


export default router;
