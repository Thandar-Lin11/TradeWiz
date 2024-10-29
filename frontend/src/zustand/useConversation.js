import { create } from "zustand";

export const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export const useChannelStore = create((set) => ({
  selectedChannel: null,
  setSelectedChannel: (selectedChannel) => set({ selectedChannel }),
  channels: [], // To store the list of channels
  setChannels: (channels) => set({ channels }), // To update the channels list
}));
