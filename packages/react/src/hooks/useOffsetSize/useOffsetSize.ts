import { useCallback, useRef, useState } from 'react';

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

interface OffsetSize {
  width: number;
  height: number;
}

export function useOffsetSize<T extends HTMLElement = HTMLDivElement>() {
  const elemRef = useRef<T | null>(null);
  const [offsetSize, setOffsetSize] = useState<OffsetSize>({
    width: 0,
    height: 0,
  });

  const handleChangeSize = useCallback(() => {
    setOffsetSize({
      width: elemRef.current?.offsetWidth || 0,
      height: elemRef.current?.offsetHeight || 0,
    });
  }, []);

  useIsomorphicLayoutEffect(() => {
    window.addEventListener('resize', handleChangeSize);

    handleChangeSize();

    return () => window.removeEventListener('resize', handleChangeSize);
  }, []);

  return [elemRef, offsetSize] as const;
}
