import { useEffect, useRef } from 'react';

export type Cleanup = void | (() => void);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEffectAfterMount(cb: () => Cleanup, deps: any[]) {
  const componentJustMounted = useRef(true);

  useEffect(() => {
    if (!componentJustMounted.current) {
      return cb();
    }

    componentJustMounted.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
