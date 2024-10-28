import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isPrivate: { type: Boolean, default: false },
});

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
