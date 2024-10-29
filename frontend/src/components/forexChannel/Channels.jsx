import useGetChannels from "../../hooks/usegetChannel";
import { getRandomEmoji } from "../../utils/emojis";
import Channel from "./Channel";

const Channels = () => {
  const { loading, channels } = useGetChannels();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {channels.map((channel, idx) => (
        <Channel
          key={channel._id}
          channel={channel}
          emoji={getRandomEmoji()}
          lastIdx={idx === channel.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default Channels;
