import { useSocketContext } from "../../context/SocketContext";
import { useChannelStore } from "../../zustand/useConversation";

const Channel = ({ channel, lastIdx, emoji }) => {
  const { selectedChannel, setSelectedChannel } = useChannelStore();

  const isSelected = selectedChannel?._id === channel._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(channel._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-blue-900  rounded p-2 py-1 cursor-pointer
				${isSelected ? "" : ""}
			`}
        onClick={() => setSelectedChannel(channel)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          {/* <div className="w-12 rounded-full">
            <img src={channel.profilePic} alt="user avatar" />
          </div> */}
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{channel.name}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Channel;
