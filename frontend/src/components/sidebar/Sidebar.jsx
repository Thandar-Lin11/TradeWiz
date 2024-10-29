import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import CreateChannelModal from "../forexChannel/CreateChannelModal";
import ChannelList from "../forexChannel/ChannelList";
import useChannels from "../../hooks/useChannel";
import Channels from "../forexChannel/Channels";

const Sidebar = ({ userId }) => {
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);

  // Toggle modal visibility
  const handlePlusClick = () => {
    setShowCreateChannelModal(!showCreateChannelModal);
  };

  return (
    <div className="w-1/4 bg-[#0f0f24] p-6 text-white flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center mb-4">
        <img src="logo.png" alt="Logo" className="w-6 h-6 mr-2" />
        <h1 className="text-xl font-bold">TradeWiz</h1>
      </div>

      {/* Search Section */}
      <div>
        <SearchInput />
      </div>

      {/* Direct Message Section */}
      <div className="my-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">Direct Message</span>
          <FiPlus className="cursor-pointer" />
        </div>
        <Conversations />
      </div>

      {/* Trade Channels Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">Trade Channels</span>
          <FiPlus className="cursor-pointer" onClick={handlePlusClick} />
        </div>
        <Channels />
      </div>

      {/* Channel Modal */}
      <CreateChannelModal
        userId={userId}
        isOpen={showCreateChannelModal}
        onClose={() => setShowCreateChannelModal(false)}
      />

      <LogoutButton />
    </div>
  );
};

export default Sidebar;
