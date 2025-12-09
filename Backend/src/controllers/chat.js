// controllers/chatController.js
import ChatService from "../services/chat.js"
import AppError from "../utils/AppError.js";
import logger from "../config/logger.js";

const ChatController = {

  async getChats(req, res, next) {
    try {
      const userId = req.user?._id;
      if(!userId) return next(new AppError("Unauthorized",401))
      
      const { targetUserId } = req.params;
      if(!targetUserId) return next(new AppError("Target user id is required",400))
      const chat = await ChatService.getOneToOneChat({
        requesterId: userId,
        targetUserId,
      });

      return res.status(200).json({
        success: true,
        data: chat ? [chat] : [],
      });
    } catch (err) {
    
      logger?.error?.(err?.message || err);
      return next(err instanceof AppError ? err : new AppError("Something went wrong", 500));
    }
  },
};

export default ChatController;
