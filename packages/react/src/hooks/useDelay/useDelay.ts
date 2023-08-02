import { useEffect, useState } from 'react';

const MIN_DELAY = 500;

export function useDelay<T>(value: T, delay = MIN_DELAY): T {
  const [delayedValue, setDelayedValue] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDelayedValue(value), delay);

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [value, delay]);

  return delayedValue;
}
