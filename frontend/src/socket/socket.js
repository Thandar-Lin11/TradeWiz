// socket.js
export const joinChannel = (socket, channelId, userId) => {
  if (socket) {
    socket.emit("joinChannel", { channelId, userId });
  }
};

export const leaveChannel = (socket, channelId, userId) => {
  if (socket) {
    socket.emit("leaveChannel", { channelId, userId });
  }
};

export const sendMessage = (socket, channelId, message, senderId) => {
  if (socket) {
    socket.emit("sendMessage", { channelId, message, senderId });
  }
};

export const onNewMessage = (socket, callback) => {
  if (socket) {
    socket.on("newMessage", callback);
  }
};

export const onUserJoined = (socket, callback) => {
  if (socket) {
    socket.on("userJoined", callback);
  }
};

export const onUserLeft = (socket, callback) => {
  if (socket) {
    socket.on("userLeft", callback);
  }
};

export const onForexUpdate = (socket, callback) => {
  if (socket) {
    socket.on("forexUpdate", callback);
  }
};
