import { useEffect, useState } from 'react';
import { api } from '../api/api-call';

export const useApiIngredients = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    setLoading(true);
    setError(false);

    api
      .get('ingredients', { signal: signal })
      .then((ingredients) => {
        setData(ingredients.data);

        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        if (!signal?.aborted) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return { data, isLoading, isError };
};
