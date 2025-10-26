import React from 'react';

interface QuickActionCardProps {
  icon: string;
  text: string;
  onClick: () => void;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({ icon, text, onClick }) => (
  <div
    onClick={onClick}
    className="p-6 cursor-pointer rounded-lg border border-gray-200 bg-white hover:border-blue-500 hover:bg-gray-50 transition-all min-h-[140px] flex flex-col gap-3"
  >
    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-blue-600 text-xl">
      {icon}
    </div>
    <p className="text-sm text-gray-700">{text}</p>
  </div>
);