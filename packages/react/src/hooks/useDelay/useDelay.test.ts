import { renderHook } from '@testing-library/react';

import { MIN_DELAY, useDelay } from './useDelay';

const mockSetTimeout = () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
};
const mockClearTimeout = () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'clearTimeout');
};

describe('useDelay', () => {
  describe('초기값', () => {
    afterEach(() => {
      jest.useFakeTimers();
    });

    it('초기값과 반환되는 value는 항상 같다', () => {
      const init = 'init';
      const { result } = renderHook(() => useDelay(init));

      const value = result.current;

      expect(value).toBe(init);
    });
  });

  describe('timeout', () => {
    afterEach(() => {
      jest.useRealTimers();
    });

    it('delay의 기본 값은 500ms이다', () => {
      mockSetTimeout();
      renderHook(() => useDelay('init'));

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), MIN_DELAY);
    });

    it('delay의 값이 주어진다면 해당 delay을 거쳐 함수가 호출되어야 한다', () => {
      mockSetTimeout();

      const delay = 1000;
      renderHook(() => useDelay('init', delay));

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), delay);
    });

    it('unmount가 될 경우 clearTimeout이 호출되어야 한다', () => {
      mockClearTimeout();
      const { unmount } = renderHook(() => useDelay('init'));

      unmount();

      expect(clearTimeout).toHaveBeenCalledTimes(1);
    });
  });
});
