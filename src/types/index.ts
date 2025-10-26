export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export interface ChatStore {
  chats: Chat[];
  currentChatId: string | null;
  sidebarCollapsed: boolean;
  addChat: (title: string) => void;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  setCurrentChat: (chatId: string | null) => void;
  toggleSidebar: () => void;
  getCurrentChat: () => Chat | undefined;
}