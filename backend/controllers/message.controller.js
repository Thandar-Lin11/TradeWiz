// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

// export const sendMessage = async (req, res) => {
// 	try {
// 		const { message } = req.body;
// 		const { id: receiverId } = req.params;
// 		const senderId = req.user._id;

// 		let conversation = await Conversation.findOne({
// 			participants: { $all: [senderId, receiverId] },
// 		});

// 		if (!conversation) {
// 			conversation = await Conversation.create({
// 				participants: [senderId, receiverId],
// 			});
// 		}

// 		const newMessage = new Message({
// 			senderId,
// 			receiverId,
// 			message,
// 		});

// 		if (newMessage) {
// 			conversation.messages.push(newMessage._id);
// 		}

// 		// await conversation.save();
// 		// await newMessage.save();

// 		// this will run in parallel
// 		await Promise.all([conversation.save(), newMessage.save()]);

// 		// SOCKET IO FUNCTIONALITY WILL GO HERE
// 		const receiverSocketId = getReceiverSocketId(receiverId);
// 		if (receiverSocketId) {
// 			// io.to(<socket_id>).emit() used to send events to specific client
// 			io.to(receiverSocketId).emit("newMessage", newMessage);
// 		}

// 		res.status(201).json(newMessage);
// 	} catch (error) {
// 		console.log("Error in sendMessage controller: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };

// export const getMessages = async (req, res) => {
// 	try {
// 		const { id: userToChatId } = req.params;
// 		const senderId = req.user._id;

// 		const conversation = await Conversation.findOne({
// 			participants: { $all: [senderId, userToChatId] },
// 		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

// 		if (!conversation) return res.status(200).json([]);

// 		const messages = conversation.messages;

// 		res.status(200).json(messages);
// 	} catch (error) {
// 		console.log("Error in getMessages controller: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// Send a new message
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Check if a conversation exists between the sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Create a new conversation if it doesn't exist
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      channel_id: conversation._id, // Optionally link to conversation for clarity
    });

    // Save both the conversation and new message in parallel
    conversation.messages.push(newMessage._id);
    await Promise.all([conversation.save(), newMessage.save()]);

    // Emit the new message to the receiver via Socket.io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieve messages for a specific conversation
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    // Find the conversation involving the two participants
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // Populate actual message documents

    if (!conversation) {
      return res.status(200).json([]); // Return an empty array if no conversation is found
    }

    // Return the messages associated with the conversation
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
