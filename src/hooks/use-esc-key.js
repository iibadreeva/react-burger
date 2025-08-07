import { useEffect } from 'react';

export const useEscKey = (callback) => {
  useEffect(() => {
    const handleClose = (event) => {
      if (event.key === 'Escape') {
        callback(event);
      }
    };

    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('keydown', handleClose);
    };
  }, [callback]);
};
