import React, { useState } from 'react';
import { Sidebar } from './components/ Sidebar';
import { TopBar } from './components/TopBar';
import { ChatArea } from './components/ChatArea';
import { MessageInput } from './components/MessageInput';
import { useChatStore } from './store/chatStore';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const { currentChatId, addChat, addMessage, setCurrentChat, getCurrentChat } = useChatStore();

  const currentChat = getCurrentChat();

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText && attachedFiles.length === 0) return;

    let chatId = currentChatId;

    if (!chatId) {
      const title = messageText.slice(0, 50) + (messageText.length > 50 ? '...' : '');
      addChat(title);
      chatId = useChatStore.getState().currentChatId!;
    }

    addMessage(chatId, { text: messageText, sender: 'user' });
    setInputValue('');
    setAttachedFiles([]);

    setTimeout(() => {
      addMessage(chatId, {
        text: "I'm Inteliq AI assistant. I've received your message and I'm here to help! This is a demo response. In a real application, I would process your request and provide a helpful answer.",
        sender: 'assistant',
      });
    }, 1000);
  };

  const handleNewChat = () => {
    setCurrentChat(null);
    setInputValue('');
    setAttachedFiles([]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setAttachedFiles((prev) => [...prev, ...files]);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = Array.from(e.clipboardData.items);
    const files = items
      .filter((item) => item.kind === 'file')
      .map((item) => item.getAsFile())
      .filter((file): file is File => file !== null);
    if (files.length > 0) {
      setAttachedFiles((prev) => [...prev, ...files]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar onNewChat={handleNewChat} />
        <ChatArea
          currentChat={currentChat}
          onQuickAction={handleSendMessage}
          isDragging={isDragging}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
        />
        <MessageInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          attachedFiles={attachedFiles}
          setAttachedFiles={setAttachedFiles}
          onSend={() => handleSendMessage()}
          onPaste={handlePaste}
          currentChat={currentChat}
          isDragging={isDragging}
        />
      </div>
    </div>
  );
};

export default App;