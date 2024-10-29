import { toast } from "react-hot-toast";

// Use this in ChatRoom or ForexPanel based on events
socket.on("userJoined", ({ userId }) => {
  toast(`User ${userId} has joined the channel`);
});

socket.on("userLeft", ({ userId }) => {
  toast(`User ${userId} has left the channel`);
});

socket.on("newMessage", (message) => {
  toast(`New message from ${message.senderId}`);
});

socket.on("forexUpdate", () => {
  toast("New Forex Price Update Available!");
});
