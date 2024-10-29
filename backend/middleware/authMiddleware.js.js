// middleware/authMiddleware.js

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Protect Route Middleware
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const isAdmin = (req, res, next) => {
  console.log("isAdmin middleware triggered");
  const userRole = req.headers["user-role"]; // Access userRole from headers

  console.log("User role:", userRole);
  if (userRole !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

export const isTrader = (req, res, next) => {
  if (req.user.role !== "trader") {
    return res.status(403).json({ error: "Access denied. Traders only." });
  }
  next();
};

// Channel Access Middleware
export const canViewChannel = (req, res, next) => {
  const { channelId } = req.params;

  // Example logic to check if the channel is public or if the user is a member
  // Assuming `getChannelById` is a function that fetches a channel by ID
  getChannelById(channelId)
    .then((channel) => {
      const isPublicChannel = channel.isPublic;
      const isMember = channel.members.includes(req.user._id);

      if (!isPublicChannel && !isMember) {
        return res
          .status(403)
          .json({ error: "Access denied. You can't view this channel." });
      }
      next();
    })
    .catch((error) => {
      console.log("Error in canViewChannel middleware: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Middleware to Allow Guests Access to Public Channels Only
export const canViewPublicChannel = (req, res, next) => {
  const { channelId } = req.params;

  // Example logic to check if the channel is public
  getChannelById(channelId)
    .then((channel) => {
      if (channel.isPrivate && req.user.role === "guest") {
        return res.status(403).json({
          error: "Access denied. Guests can only view public channels.",
        });
      }
      next();
    })
    .catch((error) => {
      console.log("Error in canViewPublicChannel middleware: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Helper function to fetch channel details from database
const getChannelById = async (channelId) => {
  // Replace this with actual database query logic
  return await Channel.findById(channelId);
};
