// src/socket/socket.js

import { useSocketContext } from "../SocketContextProvider";

export const joinChannel = (channelId, userId) => {
  const { socket } = useSocketContext();
  if (socket) {
    socket.emit("joinChannel", { channelId, userId });
  }
};

export const leaveChannel = (channelId, userId) => {
  const { socket } = useSocketContext();
  if (socket) {
    socket.emit("leaveChannel", { channelId, userId });
  }
};

export const sendMessage = (channelId, message, senderId) => {
  const { socket } = useSocketContext();
  if (socket) {
    socket.emit("sendMessage", { channelId, message, senderId });
  }
};

export const onNewMessage = (callback) => {
  const { socket } = useSocketContext();
  if (socket) {
    socket.on("newMessage", callback);
  }
};

export const onUserJoined = (callback) => {
  const { socket } = useSocketContext();
  if (socket) {
    socket.on("userJoined", callback);
  }
};

export const onUserLeft = (callback) => {
  const { socket } = useSocketContext();
  if (socket) {
    socket.on("userLeft", callback);
  }
};

export const onForexUpdate = (callback) => {
  const { socket } = useSocketContext();
  if (socket) {
    socket.on("forexUpdate", callback);
  }
};
