
import Chat from "../models/chat.js";
import AppError from "../utils/AppError.js";

const ChatService = {

async  getOneToOneChat({ requesterId, targetUserId }) {
  if (!requesterId) throw new AppError("Unauthorized", 401);
  if (!targetUserId) throw new AppError("Target user id is required", 400);
  if (String(requesterId) === String(targetUserId)) {
    throw new AppError("Cannot fetch chat with yourself", 400);
  }

  const chat = await Chat.findOne({
    participants: { $all: [requesterId, targetUserId], $size: 2 },
  })
    .populate({ path: "message.senderId", select: "firstName lastName photoUrl" })
    .lean();

   return chat; 

}
};

export default ChatService;
