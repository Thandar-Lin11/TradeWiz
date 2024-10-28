import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  // Handle user joining a channel
  socket.on("joinChannel", async ({ channelId, userId }) => {
    socket.join(channelId);

    // Notify others in the channel
    socket.to(channelId).emit("userJoined", { userId });

    console.log(`User ${userId} joined channel ${channelId}`);

    // Optionally, send a message to the new user
    socket.emit("message", { text: `You joined channel ${channelId}` });
  });

  // Handle user leaving a channel
  socket.on("leaveChannel", ({ channelId, userId }) => {
    socket.leave(channelId);
    socket.to(channelId).emit("userLeft", { userId });
    console.log(`User ${userId} left channel ${channelId}`);
  });

  // Listen for chat messages
  socket.on("sendMessage", ({ channelId, message, senderId }) => {
    io.to(channelId).emit("newMessage", { message, senderId });
  });

  // Generate and broadcast forex price updates
  const forexUpdateInterval = setInterval(() => {
    const forexData = {
      pair: "EUR/USD",
      price: (Math.random() * (1.5 - 1.0) + 1.0).toFixed(4), // Random price between 1.0 and 1.5
      timestamp: new Date(),
    };

    // Broadcast to Trading channel
    io.to("Trading").emit("forexUpdate", forexData);
    console.log("Forex update:", forexData);
  }, 5000); // Every 5 seconds

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    clearInterval(forexUpdateInterval);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
