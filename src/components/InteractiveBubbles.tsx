import React, { useState } from 'react';
import ChatBubble from './ChatBubble';
import StatisticsBubble from './StatisticsBubble';

// Main bubble that appears on the bottom-left
const MainBubble: React.FC<{
  onClick: () => void;
  isActive: boolean;
}> = ({ onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl ${
      isActive ? 'bg-primary rotate-45' : 'bg-primary'
    }`}
  >
    <svg
      className={`h-6 w-6 text-white transition-transform duration-300 ${
        isActive ? 'rotate-45' : ''
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isActive ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      )}
    </svg>
  </button>
);

// Stats bubble that appears above the main bubble
const StatsBubble: React.FC<{
  onClick: () => void;
  isActive: boolean;
}> = ({ onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl ${
      isActive ? 'bg-primary/90' : 'bg-gradient-to-r from-primary/80 to-primary'
    }`}
  >
    <svg
      className="h-5 w-5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  </button>
);

// Main component that renders both bubbles and their popups
const InteractiveBubbles: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  // Toggle chat bubble visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (isStatsOpen) setIsStatsOpen(false);
  };

  // Toggle stats bubble visibility
  const toggleStats = () => {
    setIsStatsOpen(!isStatsOpen);
    if (isChatOpen) setIsChatOpen(false);
  };

  return (
    <div className="fixed left-4 bottom-4 z-50">
      <div className="flex flex-col-reverse items-center space-y-reverse space-y-3">
        {/* Main Bubble */}
        <MainBubble onClick={toggleChat} isActive={isChatOpen} />
        
        {/* Stats Bubble (positioned above) */}
        <StatsBubble onClick={toggleStats} isActive={isStatsOpen} />
      </div>

      {/* Chat Bubble Dialog */}
      <ChatBubble isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {/* Statistics Bubble Dialog */}
      <StatisticsBubble isOpen={isStatsOpen} onClose={() => setIsStatsOpen(false)} />
    </div>
  );
};

export default InteractiveBubbles; 