import { useQuery, useQueryClient } from '@tanstack/react-query';

type CryptoPrices = {
  [coin: string]: {
    [currency: string]: number;
  };
};

interface UseCryptoPriceQueryOptions {
  enabled?: boolean;
  staleTime?: number;
  refetchInterval?: number | false;
  refetchOnWindowFocus?: boolean;
  debug?: boolean;
}

/**
 * Hook to fetch and cache cryptocurrency prices using React Query
 */
export const useCryptoPriceQuery = (
  coins: string[] = ['solana', 'ethereum'],
  currencies: string[] = ['usd'],
  options: UseCryptoPriceQueryOptions = {},
) => {
  const queryClient = useQueryClient();
  const { debug, ...queryOptions } = options;

  // Sort the arrays to ensure consistent cache keys
  const sortedCoins = [...coins].sort();
  const sortedCurrencies = [...currencies].sort();

  // Generate a stable query key
  const queryKey = ['crypto-prices', sortedCoins, sortedCurrencies];

  // Main query
  const query = useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      if (debug) {
        console.log(
          `Fetching crypto prices for: ${sortedCoins.join(', ')} in ${sortedCurrencies.join(', ')}`,
        );
      }

      const response = await fetch(
        `/api/currency/prices?ids=${sortedCoins.join(',')}&vs_currencies=${sortedCurrencies.join(',')}`,
        { signal },
      );

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = (await response.json()) as CryptoPrices;
      return data;
    },
    // Default options
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    // These options can be overridden by the caller
    ...queryOptions,
  });

  // Helper to manually refresh the data
  const refresh = async () => {
    if (debug) {
      console.log('Manually refreshing crypto prices');
    }
    await queryClient.invalidateQueries({ queryKey });
    return queryClient.refetchQueries({ queryKey });
  };

  return {
    ...query,
    refresh,
  };
};

/**
 * Generic utility to get a specific price from the pricing data
 */
export const getPriceFromData = (
  data: CryptoPrices | undefined,
  coin: string,
  currency: string = 'usd',
): number => {
  if (!data) return 0;
  return data?.[coin]?.[currency] || 0;
};
