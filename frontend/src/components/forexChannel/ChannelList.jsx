import React from "react";

const ChannelList = ({ channels, loading }) => {
  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-2">
      {channels.map((channel) => (
        <div key={channel._id} className="text-gray-300">
          {channel.name}
        </div>
      ))}
    </div>
  );
};

export default ChannelList;
