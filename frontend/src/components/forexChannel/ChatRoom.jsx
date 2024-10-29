import React, { useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";

const ChatRoom = ({ channelId, userId }) => {
  const { socket } = useSocketContext();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    if (socket) {
      socket.emit("joinChannel", { channelId, userId });

      socket.on("newMessage", (message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on("userJoined", ({ userId }) => {
        console.log(`User ${userId} joined`);
      });

      socket.on("userLeft", ({ userId }) => {
        console.log(`User ${userId} left`);
      });

      return () => {
        socket.emit("leaveChannel", { channelId, userId });
      };
    }
  }, [socket, channelId, userId]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      socket.emit("sendMessage", {
        channelId,
        message: messageText,
        senderId: userId,
      });
      setMessageText("");
    }
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
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
      />
    </div>
  );
};

export default ChatRoom;
