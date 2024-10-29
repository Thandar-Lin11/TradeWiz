// controllers/channel.controller.js

import Channel from "../models/channel.model.js";

// Create a new channel (Admin only)
export const createChannel = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name } = req.body;
    console.log("name: " + name);
    console.log(userId);
    const newChannel = new Channel({
      name,
      created_by: userId,
    });

    await newChannel.save();
    res.status(201).json(newChannel);
  } catch (error) {
    console.log("Error in createChannel controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a channel (Admin only)
export const deleteChannel = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedChannel = await Channel.findByIdAndDelete(id);

    if (!deletedChannel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    res.status(200).json({ message: "Channel deleted successfully" });
  } catch (error) {
    console.log("Error in deleteChannel controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all channels (Public for guests, all for others)
export const getChannels = async (req, res) => {
  try {
    const channels = await Channel.find(); // Adjust according to your needs

    res.status(200).json(channels);
  } catch (error) {
    console.log("Error in getChannels controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
