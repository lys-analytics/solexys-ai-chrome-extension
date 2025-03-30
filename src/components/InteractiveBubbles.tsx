import React, { useState } from 'react';
import ChatBubble from './ChatBubble';
import StatisticsBubble from './StatisticsBubble';

// Logo bubble at the top
const LogoBubble: React.FC = () => (
  <div className="bubble-button solexys-cursor-default" style={{ width: '2.5rem', height: '2.5rem' }}>
    <div className="bubble-logo" style={{ width: '2rem', height: '2rem' }}>
      <img src={chrome.runtime.getURL('hero_small.png')} alt="Solexys AI" />
    </div>
  </div>
);

// Main chat bubble
const MainBubble: React.FC<{
  onClick: () => void;
  isActive: boolean;
}> = ({ onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`bubble-button ${isActive ? 'solexys-rotate-45' : ''}`}
    style={{ width: '2.5rem', height: '2.5rem' }}
  >
    <svg
      style={{width: '20px'}}
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

// Stats bubble
const StatsBubble: React.FC<{
  onClick: () => void;
  isActive: boolean;
}> = ({ onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`bubble-button ${isActive ? 'solexys-rotate-45' : ''}`}
    style={{ width: '2.5rem', height: '2.5rem' }}
  >
    <svg
      style={{width: '20px'}}
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
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      )}
    </svg>
  </button>
);

// Main component that renders bubbles and their popups
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
    <div className="solexys-fixed !solexys-left-[10px] solexys-bottom-[20px] solexys-z-50" style={{ left: '10px' }}>
      <div className="solexys-flex solexys-flex-col-reverse solexys-items-center solexys-gap-3">
        <MainBubble onClick={toggleChat} isActive={isChatOpen} />
        <StatsBubble onClick={toggleStats} isActive={isStatsOpen} />
        <LogoBubble />
      </div>

      <ChatBubble isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      <StatisticsBubble isOpen={isStatsOpen} onClose={() => setIsStatsOpen(false)} />
    </div>
  );
};

export default InteractiveBubbles; 