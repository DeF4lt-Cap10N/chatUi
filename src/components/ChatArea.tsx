import React, { useRef, useEffect } from 'react';
import { QuickActionCard } from './QuickActionCard';
import type { Chat } from '../types';

interface ChatAreaProps {
  currentChat: Chat | undefined;
  onQuickAction: (text: string) => void;
  isDragging: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
}

const quickActions = [
  { icon: '', text: 'Give me a concise summary of this meeting transcript' },
  { icon: '', text: 'Write a product description for a minimalist smartwatch' },
  { icon: '', text: 'Provide a polite response to a customer asking for a refund' },
];

export const ChatArea: React.FC<ChatAreaProps> = ({
  currentChat,
  onQuickAction,
  onDrop,
  onDragOver,
  onDragLeave,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  return (
    <div
      className="flex-1 overflow-auto p-6 flex flex-col items-center"
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      {!currentChat || currentChat.messages.length === 0 ? (
        <div className="max-w-3xl w-full mt-16">
          <h1 className="text-4xl font-semibold mb-2 flex items-center gap-2">
             Hi Rahul!
          </h1>
          <h2 className="text-2xl font-medium mb-8 text-gray-800">
            What do you want to learn today?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, i) => (
              <QuickActionCard
                key={i}
                icon={action.icon}
                text={action.text}
                onClick={() => onQuickAction(action.text)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-3xl w-full">
          {currentChat.messages.map((message) => (
            <div key={message.id} className="flex gap-4 mb-6">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 ${
                  message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-400'
                }`}
              >
                {message.sender === 'user' ? 'U' : 'AI'}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};