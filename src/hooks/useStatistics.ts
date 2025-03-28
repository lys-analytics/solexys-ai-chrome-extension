import { useQuery } from '@tanstack/react-query';
import chatApi, { Statistics } from '../api/chatApi';

export const useStatistics = () => {
  // Use React Query to fetch statistics with auto-refresh
  const { data, isLoading, error, refetch } = useQuery<Statistics>({
    queryKey: ['statistics'],
    queryFn: chatApi.getStatistics,
    refetchInterval: 60000, // Refresh every minute
    staleTime: 55000, // Consider data stale after 55 seconds
  });

  return {
    statistics: data,
    isLoading,
    error,
    refetch
  };
};

export default useStatistics; 