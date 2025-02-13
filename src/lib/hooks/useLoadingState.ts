import { useState, useCallback } from 'react';

export function useLoadingState(initialState = false) {
  const [loading, setLoading] = useState(initialState);
  const [error, setError] = useState<Error | null>(null);

  const startLoading = useCallback(() => {
    setLoading(true);
    setError(null);
  }, []);

  const stopLoading = useCallback((err?: Error) => {
    setLoading(false);
    if (err) setError(err);
  }, []);

  return { loading, error, startLoading, stopLoading };
}