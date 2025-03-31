import { formatNumber } from '../utils/utils';
import { useMemo } from 'react';
import { useCryptoPriceQuery, getPriceFromData } from './useCryptoPriceQuery';

export const useSolanaConverter = (currency: string = 'usd') => {
  // Use the centralized crypto price query hook
  const { data, isLoading, isError, refresh } = useCryptoPriceQuery(
    ['solana'], // Only request Solana prices
    [currency], // Only request the specified currency
    {
      // No need to override the queryKey - React Query will handle deduplication
    },
  );

  // Extract current Solana price from the data
  const solanaPrice = useMemo(() => {
    return getPriceFromData(data, 'solana', currency);
  }, [data, currency]);

  const convertSolanaToCurrency = (amount: number, format: boolean = true) => {
    const result = amount * solanaPrice;
    return format ? formatNumber(result) : result;
  };

  const convertToSolana = (amount: number, format: boolean = true) => {
    const result = solanaPrice > 0 ? amount / solanaPrice : 0;
    return format ? formatNumber(result) : result;
  };

  return {
    solanaPrice,
    convertSolanaToCurrency,
    convertToSolana,
    isLoading,
    isError,
    refreshPrice: refresh,
  };
};
