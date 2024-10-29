// hooks/useChannels.js
import { useState, useEffect } from "react";
import axios from "axios";

const useChannels = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all channels
  const fetchChannels = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/channels");
      setChannels(response.data.channels || response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching channels:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new channel

  // Update a channel by ID
  const updateChannel = async (channelId, updateData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `/api/channel/channels/${channelId}`,
        updateData
      );
      setChannels((prevChannels) =>
        prevChannels.map((channel) =>
          channel._id === channelId ? { ...channel, ...response.data } : channel
        )
      );
      return response.data; // Returns the updated channel if needed
    } catch (err) {
      setError(err.message);
      console.error("Error updating channel:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a channel by ID
  const deleteChannel = async (channelId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/channel/channels/${channelId}`);
      setChannels((prevChannels) =>
        prevChannels.filter((channel) => channel._id !== channelId)
      );
    } catch (err) {
      setError(err.message);
      console.error("Error deleting channel:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load channels on initial render
  useEffect(() => {
    fetchChannels();
  }, []);

  return {
    channels,
    loading,
    error,
    fetchChannels,
    createChannel,
    updateChannel,
    deleteChannel,
  };
};

export default useChannels;
