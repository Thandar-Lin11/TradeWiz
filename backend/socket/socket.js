import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
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
  // Forex Data
  function generateForexData() {
    const pairs = ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD"];
    return pairs.map((pair) => ({
      pair,
      bid: (Math.random() * (1.5 - 1.1) + 1.1).toFixed(4),
      ask: (Math.random() * (1.5 - 1.1) + 1.1).toFixed(4),
      timestamp: new Date().toISOString(),
    }));
  }

  // Gold Data
  function generateGoldData() {
    const pairs = ["XAU/USD", "XAG/USD"];
    return pairs.map((pair) => ({
      pair,
      bid: (Math.random() * (2000 - 1800) + 1800).toFixed(2), // Example range for gold prices
      ask: (Math.random() * (2000 - 1800) + 1800).toFixed(2),
      timestamp: new Date().toISOString(),
    }));
  }

  // Crypto Data
  function generateCryptoData() {
    const pairs = ["BTC/USD", "ETH/USD", "XRP/USD"];
    return pairs.map((pair) => ({
      pair,
      bid: (Math.random() * (60000 - 30000) + 30000).toFixed(2), // Example range for BTC
      ask: (Math.random() * (60000 - 30000) + 30000).toFixed(2),
      timestamp: new Date().toISOString(),
    }));
  }

  // Emit updates for each channel
  setInterval(() => {
    const forexData = generateForexData();

    io.to("Currency").emit("forexUpdate", forexData);

    const goldData = generateGoldData();

    io.to("Gold").emit("forexUpdate", goldData);

    const cryptoData = generateCryptoData();

    io.to("Crypto").emit("forexUpdate", cryptoData);
  }, 5000); // Update every 5 seconds

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    clearInterval(generateForexData);
    clearInterval(generateGoldData);
    clearInterval(generateCryptoData);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
