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

  it('의존성 배열에 값이 주어진다면, 인자로 넘긴 callback은 재렌더링 이후 실행된다', () => {
    const { rerender } = renderHook(({ deps }) => useEffectAfterMount(cb, deps), {
      initialProps: { deps: [0] },
    });

    expect(cb).not.toHaveBeenCalled();

    rerender({ deps: [1] });
    expect(cb).toHaveBeenCalled();
  });
});
