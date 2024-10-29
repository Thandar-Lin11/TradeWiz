import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetChannels = () => {
  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/channels/sidebar");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setChannels(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, channels };
};
export default useGetChannels;
