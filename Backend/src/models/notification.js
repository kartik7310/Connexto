import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    messageId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["MESSAGE", "CONNECTION_REQUEST"],
        default: "MESSAGE"
    },
    seen: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

notificationSchema.index({ recipientId: 1, seen: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
