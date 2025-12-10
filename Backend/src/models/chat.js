import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},{timestamps:true})

const chatSchema = new mongoose.Schema({
  participants:[ 
   {type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
  ],
  message:[messageSchema],
});

chatSchema.index({ participants: 1});

const Chat = mongoose.model("Chat",chatSchema);

export default Chat;