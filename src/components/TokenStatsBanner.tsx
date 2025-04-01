import React, { useEffect, useState } from 'react';
import { TokenStatsCard } from './TokenStats/TokenStats';
import { TokenDetails } from '../types/token-details';
import tokenApi from '../api/tokenApi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// The main TokenStatsBanner component without the QueryClientProvider
const TokenStatsBannerContent: React.FC = () => {
  const [token, setToken] = useState<TokenDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setLoading(true);
        
        // Extract token ID from URL
        // For pump.fun URLs like: https://pump.fun/coin/5a9q1UaD7dCnaarr6CQCwMdUwwNnByo5xcJBHnAbpump
        const path = window.location.pathname;
        const matches = path.match(/\/coin\/([a-zA-Z0-9]+pump)$/);
        
        if (!matches || !matches[1]) {
          setError('Could not extract token ID from URL');
          setLoading(false);
          return;
        }
        
        const tokenId = matches[1];
        const tokenData = await tokenApi.getTokenDetails(tokenId);
        
        if (!tokenData) {
          setError('Failed to fetch token data');
        } else {
          setToken(tokenData);
        }
      } catch (err) {
        setError('An error occurred while fetching token data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
  }, []);

  if (loading) {
    return (
      <div className="solexys-w-full solexys-h-[60px] solexys-bg-blue-600 solexys-z-[9999] solexys-relative solexys-flex solexys-items-center solexys-justify-center solexys-transition-opacity solexys-duration-300 solexys-ease-in-out">
        <p className="solexys-m-0 solexys-text-white solexys-font-bold">
          Loading token data...
        </p>
      </div>
    );
  }

  if (error || !token) {
    return (
      <div className="solexys-w-full solexys-h-[60px] solexys-bg-red-600 solexys-z-[9999] solexys-relative solexys-flex solexys-items-center solexys-justify-center solexys-transition-opacity solexys-duration-300 solexys-ease-in-out">
        <p className="solexys-m-0 solexys-text-white solexys-font-bold">
          {error || 'Failed to load token data'}
        </p>
      </div>
    );
  }

  return (
    <div className="solexys-w-full solexys-p-4 solexys-bg-white solexys-z-[9999] solexys-relative solexys-transition-opacity solexys-duration-300 solexys-ease-in-out solexys-shadow-lg solexys-rounded-md">
      <div className="solexys-flex solexys-items-center solexys-justify-between solexys-mb-2">
        <h2 className="solexys-text-lg solexys-font-bold solexys-m-0">{token.name} ({token.symbol})</h2>
        <div className="solexys-text-sm solexys-text-gray-500">Powered by Solexys AI</div>
      </div>
      <TokenStatsCard token={token} />
    </div>
  );
};

// Wrapper component that includes the QueryClientProvider
const TokenStatsBanner: React.FC = () => {
  // Create a new QueryClient for each instance of the component
  // This ensures isolated React Query context for each dynamically rendered instance
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TokenStatsBannerContent />
    </QueryClientProvider>
  );
};

export default TokenStatsBanner; 