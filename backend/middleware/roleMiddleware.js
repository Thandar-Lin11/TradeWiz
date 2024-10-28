// middleware/roleMiddleware.js

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
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

export const canViewChannel = (req, res, next) => {
  const { channelId } = req.params; // Assuming you get channelId from the request parameters

  // Logic to check if the channel is public or if the user is part of the channel
  // For example:
  // 1. Fetch channel details from database
  // 2. Check if it's public or if user is in the members array

  // // Mockup example
  // const isPublicChannel = /* check if the channel is public */;
  // const isMember = /* check if user is in the channel's members array */;

  if (!isPublicChannel && !isMember) {
    return res
      .status(403)
      .json({ error: "Access denied. You can't view this channel." });
  }
  next();
};

// Example of middleware to allow guests to access only certain public channels
export const canViewPublicChannel = (req, res, next) => {
  const { channelId } = req.params;

  // Logic to fetch channel details and check if it is public
  // const channel = /* Fetch channel from database */;

  if (channel.isPrivate && req.user.role === "guest") {
    return res
      .status(403)
      .json({ error: "Access denied. Guests can only view public channels." });
  }
  next();
};
