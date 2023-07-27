import { renderHook } from '@testing-library/react';

import { useIsMounted } from './useIsMounted';

describe('useIsMounted', () => {
  it('mount 시 true를 반환한다', () => {
    const { result } = renderHook(useIsMounted);

    expect(result.current).toBeTruthy();
  });
});
