import { useState, useEffect } from 'react';
import { useLoadingState } from './useLoadingState';

interface FetchConfig<T> {
  fetchFn: () => Promise<T>;
  initialData?: T;
  onError?: (error: Error) => void;
}

export function useDataFetching<T>({ fetchFn, initialData, onError }: FetchConfig<T>) {
  const [data, setData] = useState<T | undefined>(initialData);
  const { loading, error, startLoading, stopLoading } = useLoadingState();

  const fetchData = async () => {
    startLoading();
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch data');
      stopLoading(error);
      onError?.(error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}