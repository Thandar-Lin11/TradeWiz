// import User from "../models/user.model.js";

// export const getUsersForSidebar = async (req, res) => {
// 	try {
// 		const loggedInUserId = req.user._id;

// 		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

// 		res.status(200).json(filteredUsers);
// 	} catch (error) {
// 		console.error("Error in getUsersForSidebar: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };

import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Fetch all users except the logged-in user and exclude the password field
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } })
      .select("fullName username gender profilePic role createdAt") // Select only necessary fields
      .lean(); // Converts Mongoose document to plain JS object

    // Format user data (e.g., calculating member duration since `createdAt`)
    const usersWithDuration = filteredUsers.map((user) => ({
      ...user,
      memberSince: new Date(user.createdAt).toLocaleDateString(), // Format createdAt as a readable date
    }));

    res.status(200).json(usersWithDuration);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
