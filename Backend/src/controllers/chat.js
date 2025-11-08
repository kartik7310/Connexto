// controllers/chatController.js
import ChatService from "../services/chat.js"
import AppError from "../utils/AppError.js";
import logger from "../utils/logger.js";

const ChatController = {
  // GET /chats/:targetUserId  (returns the single 1:1 chat if exists; no creation)
  async getChats(req, res, next) {
    try {
      const userId = req.user?._id;
      const { targetUserId } = req.params;

      const chat = await ChatService.getOneToOneChat({
        requesterId: userId,
        targetUserId,
      });

      return res.status(200).json({
        success: true,
        data: chat ? [chat] : [],
      });
    } catch (err) {
      // log and forward to error middleware
      logger?.error?.(err?.message || err);
      return next(err instanceof AppError ? err : new AppError("Something went wrong", 500));
    }
  },
};

export default ChatController;
