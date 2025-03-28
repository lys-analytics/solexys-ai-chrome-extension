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
      <div className="flex justify-center items-center h-full">
        <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24">
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
            fill="none"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  } else if (error) {
    content = (
      <div className="text-red-500 text-center p-3">
        Failed to load statistics
      </div>
    );
  } else if (statistics) {
    content = (
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">Total Users</div>
            <div className="font-bold text-lg">{formatNumber(statistics.totalUsers)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Active Now</div>
            <div className="font-bold text-lg">{formatNumber(statistics.activeNow)}</div>
          </div>
          <div className="text-center col-span-2">
            <div className="text-sm text-gray-500">Success Rate</div>
            <div className="font-bold text-lg text-green-600">{formatPercentage(statistics.successRate)}</div>
          </div>
        </div>
        <div className="text-xs text-gray-400 text-center mt-2">
          Last updated: {new Date(statistics.updatedAt).toLocaleTimeString()}
        </div>
      </div>
    );
  } else {
    content = (
      <div className="text-center text-gray-500 p-3">
        No statistics available
      </div>
    );
  }
  
  return (
    <div className="absolute left-16 bottom-0 mb-4 w-72 bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden z-50 transform -translate-y-4">
      {/* Header */}
      <div className="bg-primary text-white px-4 py-3 flex justify-between items-center">
        <h3 className="font-semibold">Solexys AI Stats</h3>
        <button 
          onClick={onClose} 
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Content */}
      {content}
    </div>
  );
};

export default StatisticsBubble; 