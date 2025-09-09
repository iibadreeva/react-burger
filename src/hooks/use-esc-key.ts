import { useEffect } from 'react';

export const useEscKey = (callback: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    const handleClose = (event: KeyboardEvent) => {
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
