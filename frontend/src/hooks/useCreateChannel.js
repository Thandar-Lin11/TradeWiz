import axios from "axios";
import { useState } from "react";

const useCreateChannel = () => {
  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);
  const createChannel = async (name) => {
    const userId = sessionStorage.getItem("userId");
    const userRole = sessionStorage.getItem("userRole");
    console.log(userRole);
    console.log("userId in channel:", userId);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `/api/channels/createChannels/${userId}`,
        { name }, // Pass name directly, without JSON.stringify
        {
          headers: {
            "User-Role": userRole, // Add userRole in headers
          },
        }
      );
      console.log("DATA", response);
      setChannels((prevChannels) => [...prevChannels, response]);
      console.log("Channels Created data:", response);
      return response.data;
      // Returns the created channel if needed
    } catch (err) {
      setError(err.message);
      console.error("Error creating channel:", err);
    } finally {
      setLoading(false);
    }
  };
  return { channels, loading, createChannel };
};

export default useCreateChannel;
