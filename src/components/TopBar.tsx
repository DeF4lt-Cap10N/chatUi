import React from 'react';
import { Share2, HelpCircle, Plus } from 'lucide-react';

interface TopBarProps {
  onNewChat: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onNewChat }) => {
  return (
    <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs">
          AI
        </div>
        <span className="text-sm">ChatGPT 4</span>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded">
          <Share2 size={18} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded">
          <HelpCircle size={18} />
        </button>
        <button
          onClick={onNewChat}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          <span className="text-sm">New Chat</span>
        </button>
      </div>
    </div>
  );
};