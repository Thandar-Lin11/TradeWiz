import express from "express";
import {
  createChannel,
  deleteChannel,
  getChannels,
} from "../controllers/channel.controller.js";

import {
  isAdmin,
  canViewChannel,
  canViewPublicChannel,
} from "../middleware/authMiddleware.js.js";
import { getChannelsForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/sidebar", getChannelsForSidebar);

// Admins can create or delete channels
router.post("/createChannels/:userId", isAdmin, createChannel);
router.delete("/channels/:id", isAdmin, deleteChannel);

// All users can view channels, but guests can only view public channels
router.get("/channels", getChannels);
router.get(
  "/channels/:channelId",
  canViewChannel,
  canViewPublicChannel,
  (req, res) => {
    // Additional logic to get channel details can be added here
  }
);

export default router;
