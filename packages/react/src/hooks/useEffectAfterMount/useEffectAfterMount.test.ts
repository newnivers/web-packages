import { renderHook } from '@testing-library/react';

import { useEffectAfterMount } from './useEffectAfterMount';

describe('useEffectAfterMount', () => {
  let cb: () => void;

  beforeEach(() => {
    cb = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('의존성 배열이 비어 있는 경우, 인자로 넘긴 callback은 실행되지 않는다', () => {
    const { rerender } = renderHook(() => useEffectAfterMount(cb, []));

    expect(cb).not.toHaveBeenCalled();

    rerender();

    expect(cb).not.toHaveBeenCalled();
  });
});
