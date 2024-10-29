// components/AddUserToChannel.jsx
import { useState } from "react";
import axios from "axios";

const AddUserToChannel = () => {
  const [channelId, setChannelId] = useState("");
  const [userId, setUserId] = useState("");

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/channel/addUser", {
        channelId,
        userId,
      });
      console.log("User added to channel:", response.data);
    } catch (error) {
      console.error("Error adding user to channel:", error);
    }
  };

  return (
    <form onSubmit={handleAddUser}>
      <input
        type="text"
        value={channelId}
        onChange={(e) => setChannelId(e.target.value)}
        placeholder="Channel ID"
        required
      />
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserToChannel;
