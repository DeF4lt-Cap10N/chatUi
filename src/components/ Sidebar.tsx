import React from 'react';
import { Home, BookOpen, Clock, Compass, Search, Menu } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

const recentChats = [
  'Write a Shakespearean sonnet about a cat that...',
  'If cereal commercials were directed by Christo...',
  'Renewable Energy Trends',
  'Describe a medieval jousting tournament wher...',
];

export const Sidebar: React.FC = () => {
  const { chats, currentChatId, sidebarCollapsed, setCurrentChat, toggleSidebar } = useChatStore();

  return (
    <div
      className={`${
        sidebarCollapsed ? 'w-16' : 'w-72'
      } bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}
    >
      <div className="p-4 flex items-center gap-2">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8  bg-red-200 flex items-center justify-center rounded-full text-white font-bold">
            </div>
            <span className="font-bold text-lg">ChatAI</span>
          </div>
        )}
        <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded">
          <Menu size={20} />
        </button>
      </div>

      {!sidebarCollapsed && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search for chats..."
              className="bg-transparent outline-none text-sm flex-1"
            />
          </div>
        </div>
      )}
      <div className="flex-1 overflow-auto px-2">
        <nav className="space-y-1">
          {[
            { icon: Home, text: 'Home', shortcut: '⌘ H', active: true },
            { icon: BookOpen, text: 'Library', shortcut: '⌘ T' },
            { icon: Clock, text: 'History', shortcut: '⌘ G' },
            { icon: Compass, text: 'Explore', shortcut: '⌘ L' },
          ].map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                item.active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon size={20} />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-left text-sm">{item.text}</span>
                  <span className="text-xs opacity-70">{item.shortcut}</span>
                </>
              )}
            </button>
          ))}
        </nav>

        {!sidebarCollapsed && (
          <div className="mt-6">
            <h3 className="px-3 text-xs font-semibold text-gray-500 mb-2">Recent Chats</h3>
            <div className="space-y-1">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setCurrentChat(chat.id)}
                  className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                    chat.id === currentChatId ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="truncate">{chat.title}</div>
                </button>
              ))}
              {recentChats.slice(0, 8 - chats.length).map((chat, i) => (
                <button
                  key={i}
                  className="w-full px-3 py-2 rounded-lg text-left text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <div className="truncate">{chat}</div>
                </button>
              ))}
              <button className="w-full px-3 py-2 text-left text-sm text-blue-600 hover:bg-gray-50">
                View All →
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        {!sidebarCollapsed ? (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Try Pro!</span>
              <span className="text-blue-600">✨</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Upgrade for smarter AI and more...</p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-semibold">
                LC
              </div>
              <span className="text-sm">Lawrence Cruz</span>
            </div>
          </>
        ) : (
          <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-semibold mx-auto">
            LC
          </div>
        )}
      </div>
    </div>
  );
};