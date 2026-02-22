import express from "express";
import ChatController from "../controllers/chat.js";
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router();

router.get("/fetch/:targetUserId", protect, ChatController.getChats);
router.get("/unread-notifications", protect, ChatController.getNotifications);


export default router;
