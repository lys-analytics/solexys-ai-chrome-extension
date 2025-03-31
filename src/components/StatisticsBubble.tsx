import React from 'react';
import useStatistics from '../hooks/useStatistics';

// Format a number with thousands separator
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Format a percentage
const formatPercentage = (num: number): string => {
  return num.toFixed(1) + '%';
};

const StatisticsBubble: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { statistics, isLoading, error } = useStatistics();
  
  if (!isOpen) return null;
  
  // Determine the content to display based on loading/error states
  let content;
  if (isLoading) {
    content = (
      <div className="solexys-flex solexys-justify-center solexys-items-center solexys-h-full solexys-py-10">
        <svg className="solexys-animate-spin solexys-h-8 solexys-w-8 solexys-text-[#E32D13]" viewBox="0 0 24 24">
          <circle 
            className="solexys-opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
            fill="none"
          />
          <path 
            className="solexys-opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  } else if (error) {
    content = (
      <div className="solexys-text-red-400 solexys-text-center solexys-p-3">
        Failed to load statistics
      </div>
    );
  } else if (statistics) {
    content = (
      <div className="solexys-p-5">
        <div className="solexys-grid solexys-grid-cols-2 solexys-gap-6">
          <div className="solexys-text-center solexys-bg-[#292a3a] solexys-rounded-lg solexys-p-4">
            <div className="solexys-text-sm solexys-text-gray-300 solexys-mb-1">Total Users</div>
            <div className="solexys-font-bold solexys-text-xl solexys-text-white">{formatNumber(statistics.totalUsers)}</div>
          </div>
          <div className="solexys-text-center solexys-bg-[#292a3a] solexys-rounded-lg solexys-p-4">
            <div className="solexys-text-sm solexys-text-gray-300 solexys-mb-1">Active Now</div>
            <div className="solexys-font-bold solexys-text-xl solexys-text-white">{formatNumber(statistics.activeNow)}</div>
          </div>
          <div className="solexys-text-center solexys-bg-[#292a3a] solexys-rounded-lg solexys-p-4 solexys-col-span-2">
            <div className="solexys-text-sm solexys-text-gray-300 solexys-mb-1">Success Rate</div>
            <div className="solexys-font-bold solexys-text-xl solexys-text-green-400">{formatPercentage(statistics.successRate)}</div>
          </div>
        </div>
        <div className="solexys-text-xs solexys-text-gray-400 solexys-text-center solexys-mt-4">
          Last updated: {new Date(statistics.updatedAt).toLocaleTimeString()}
        </div>
      </div>
    );
  } else {
    content = (
      <div className="solexys-text-center solexys-text-gray-400 solexys-p-3">
        No statistics available
      </div>
    );
  }
  
  return (
    <div 
      className="solexys-absolute solexys-bg-[#1e1e2e] solexys-border solexys-border-[#3f3f5c] solexys-rounded-2xl solexys-overflow-hidden solexys-shadow-xl"
      style={{
        left: '4rem',
        bottom: '0',
        marginBottom: '1rem',
        width: '22rem',
        transform: 'translateY(-1rem)'
      }}
    >
      {/* Header with anime girl */}
      <div className="solexys-relative solexys-border-b solexys-border-[#3f3f5c] solexys-h-[120px] solexys-overflow-hidden">
        <img 
          src={chrome.runtime.getURL('transparent_header.png')} 
          alt="Anime Girl" 
          className="solexys-w-full solexys-h-full solexys-object-cover solexys-object-center"
        />
        <div className="solexys-absolute solexys-bottom-0 solexys-left-0 solexys-w-full solexys-py-3 solexys-px-4 solexys-bg-gradient-to-t solexys-from-[#1e1e2ee6] solexys-to-transparent solexys-text-[#e9e9f2] solexys-font-semibold solexys-flex solexys-justify-between solexys-items-center">
          <h3 className="solexys-font-semibold">Solexys AI Stats</h3>
          <button 
            onClick={onClose} 
            className="solexys-text-white hover:solexys-text-gray-200 focus:solexys-outline-none"
          >
            <svg className="solexys-w-5 solexys-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="solexys-bg-[#1e1e2e] solexys-text-[#e9e9f2] solexys-h-[300px] solexys-overflow-y-auto solexys-p-4">
        {content}
      </div>
    </div>
  );
};

export default StatisticsBubble; 