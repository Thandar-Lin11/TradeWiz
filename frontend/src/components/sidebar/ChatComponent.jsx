// Example React component for chat

import React, { useEffect, useState } from "react";
import {
  joinChannel,
  leaveChannel,
  sendMessage,
  onNewMessage,
  onUserJoined,
  onUserLeft,
  onForexUpdate,
} from "./socket/socket";

const ChatComponent = ({ channelId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [forexUpdates, setForexUpdates] = useState([]);

  useEffect(() => {
    joinChannel(channelId, userId);

    onNewMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    onUserJoined(({ userId }) => {
      console.log(`User joined: ${userId}`);
    });

    onUserLeft(({ userId }) => {
      console.log(`User left: ${userId}`);
    });

    onForexUpdate((forexData) => {
      setForexUpdates((prevUpdates) => [...prevUpdates, forexData]);
    });

    return () => {
      leaveChannel(channelId, userId);
    };
  }, [channelId, userId]);

  const handleSendMessage = (messageText) => {
    sendMessage(channelId, messageText, userId);
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.senderId}: {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message"
        onKeyDown={(e) =>
          e.key === "Enter" && handleSendMessage(e.target.value)
        }
      />

      <h2>Forex Updates</h2>
      <div>
        {forexUpdates.map((update, index) => (
          <div key={index}>
            {update.pair}: {update.price} at {update.timestamp.toString()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatComponent;
