import React, { useRef } from 'react';
import { Send, Paperclip, Camera, X, Trash2 } from 'lucide-react';
import { type Chat } from '../types';

interface MessageInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  attachedFiles: File[];
  setAttachedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  onSend: () => void;
  onPaste: (e: React.ClipboardEvent) => void;
  currentChat: Chat | undefined;
  isDragging: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  inputValue,
  setInputValue,
  attachedFiles,
  setAttachedFiles,
  onSend,
  onPaste,
  currentChat,
  isDragging,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-6 border-t border-gray-200 bg-white">
      <div className="max-w-3xl mx-auto">
        {attachedFiles.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {attachedFiles.map((file, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                <span className="truncate max-w-[200px]">{file.name}</span>
                <button
                  onClick={() => setAttachedFiles((prev) => prev.filter((_, idx) => idx !== i))}
                  className="hover:text-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={() => setAttachedFiles([])}
              className="p-1 hover:text-red-600"
              title="Clear all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
        <div
          className={`flex items-end gap-2 p-3 rounded-xl border-2 transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
          }`}
        >
          <div className="flex gap-1">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <Paperclip size={20} className="text-gray-600" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              hidden
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  setAttachedFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
                }
              }}
            />
            <button className="p-2 hover:bg-gray-100 rounded transition-colors opacity-50 cursor-not-allowed">
              <Camera size={20} className="text-gray-600" />
            </button>
          </div>

          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            onPaste={onPaste}
            placeholder={currentChat ? 'Ask me a question...' : 'Analyze these files.'}
            className="flex-1 outline-none resize-none max-h-32 bg-transparent"
            rows={1}
          />

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">0/1000</span>
            <button
              onClick={onSend}
              disabled={!inputValue.trim() && attachedFiles.length === 0}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};