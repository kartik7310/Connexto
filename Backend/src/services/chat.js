import Chat from "../models/chat.js";
import Notification from "../models/notification.js";
import AppError from "../utils/AppError.js";

const ChatService = {

  async getOneToOneChat({ requesterId, targetUserId }) {
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
  },

  async getUnreadMessages(userId) {
    if (!userId) throw new AppError("User id is required", 400);
    const notifications = await Notification.find({ recipientId: userId })
      .populate({ path: "senderId", select: "firstName lastName photoUrl" })
      .sort({ createdAt: -1 })
      .lean();

    // Group by sender for the dropdown UI
    const grouped = [];
    const senderMap = new Map();

    notifications.forEach(n => {
      const sId = String(n.senderId._id);
      if (!senderMap.has(sId)) {
        senderMap.set(sId, {
          senderId: n.senderId._id,
          targetUserId: userId,
          firstName: n.senderId.firstName,
          lastName: n.senderId.lastName,
          photoUrl: n.senderId.photoUrl,
          text: n.text.substring(0, 50) + (n.text.length > 50 ? "..." : ""),
          createdAt: n.createdAt,
          count: 1
        });
        grouped.push(senderMap.get(sId));
      } else {
        senderMap.get(sId).count += 1;
      }
    });

    return grouped;
  }
};

export default ChatService;
