import { Server } from "socket.io";
import { secretRoomId } from "../utils/roomSecret.js";
import Chat from "../models/chat.js";
import { config } from "../config/env.js";

const intitlizeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: config.corsOrigin.split(',').map(origin => origin.trim()),
        credentials: true
    },
  });

  io.on("connection", (socket) => {
    
    //handle events
    socket.on("joinChat", ({ userId, targetUserId, firstName }) => {
      
      const roomId = secretRoomId({ userId, targetUserId });
      console.log(`${firstName} join the room with id ${roomId}`);

      socket.join(roomId);
    });

    socket.on(
      "send-message",
      async ({ firstName, userId, targetUserId, text }) => {
    
        try {
          const roomId = secretRoomId({ userId, targetUserId });
          let chat = await Chat.findOne({
            participants: {
              $all: [userId, targetUserId],
            },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              message: [],
            });
          }
          chat.message.push({ senderId: userId, text });
          await chat.save();

          io.to(roomId).emit("receiveMessage", { firstName, text });
        } catch (error) {
          console.log(error);
        }
      }
    );
    socket.on("disconnect", () => {});
  });
};

export default intitlizeSocket;
