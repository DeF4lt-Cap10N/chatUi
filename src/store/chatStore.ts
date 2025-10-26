import { create } from 'zustand';
import { type ChatStore, type Chat } from '../types';

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  currentChatId: null,
  sidebarCollapsed: false,
  
  addChat: (title) => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title,
      messages: [],
      createdAt: new Date(),
    };
    set((state) => ({
      chats: [newChat, ...state.chats],
      currentChatId: newChat.id,
    }));
  },
  
  addMessage: (chatId, message) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  ...message,
                  id: Date.now().toString(),
                  timestamp: new Date(),
                },
              ],
            }
          : chat
      ),
    }));
  },
  
  setCurrentChat: (chatId) => set({ currentChatId: chatId }),
  
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  
  getCurrentChat: () => {
    const state = get();
    return state.chats.find((chat) => chat.id === state.currentChatId);
  },
}));