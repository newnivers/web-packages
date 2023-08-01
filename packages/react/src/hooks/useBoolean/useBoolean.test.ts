import { act, renderHook } from '@testing-library/react';

import { useBoolean } from './useBoolean';

describe('useBoolean', () => {
  describe('초기값', () => {
    it('defaultValue을 명시하지 않으면 초기값은 false이다', () => {
      const { result } = renderHook(useBoolean);
      const { value } = result.current;

      expect(value).toBeFalsy;
    });

    it.each([true, false])('defaultValue가 %s 이면 초기값은 %s 이다', init => {
      const { result } = renderHook(() => useBoolean(init));
      const { value } = result.current;

      expect(value).toEqual(init);
    });
  });

  describe('boolean 함수', () => {
    it('setTrue 호출 시 value는 true로 업데이트된다', () => {
      const { result } = renderHook(useBoolean);
      const { value, setTrue } = result.current;

      act(() => {
        setTrue();
      });

      expect(value).toBeTruthy;
    });

    it('setFalse 호출 시 value는 false로 업데이트된다', () => {
      const { result } = renderHook(() => useBoolean(true));
      const { value, setFalse } = result.current;

      act(() => {
        setFalse();
      });

      expect(value).toBeFalsy;
    });

    it.each([true, false])('toggleBoolean 호출 시 value는 현재 value와 반대가 된다', init => {
      const { result } = renderHook(() => useBoolean(!init));
      const { value, toggleBoolean } = result.current;

      act(() => {
        toggleBoolean();
      });

      expect(value).not.toBe(init);
    });
  });
});
