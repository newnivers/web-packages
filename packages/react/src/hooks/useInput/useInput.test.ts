import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { createElement } from 'react';

import { useInput } from './useInput';

function TestInputFactory(...params: Parameters<typeof useInput>) {
  return function TestInput() {
    const [value, handleValueChange] = useInput(...params);

    return createElement('input', {
      'data-testid': 'input',
      type: 'text',
      value,
      onChange: handleValueChange,
    });
  };
}

describe('useInput', () => {
  describe('반환 값 타입', () => {
    const { result } = renderHook(useInput);

    const [value, handleValueChange] = result.current;

    it('value의 타입은 `string`이다', () => {
      expect(typeof value).toBe('string');
    });

    it('handleValueChange의 타입은 `function`이다', () => {
      expect(typeof handleValueChange).toBe('function');
    });
  });

  describe('초기값', () => {
    it('기본 인자 <empty string>이다', () => {
      const { result } = renderHook(useInput);

      const [value] = result.current;

      expect(value).toBe('');
    });

    it.each([
      ['some-value1', 'some-value1', true],
      ['some-value2', 'some-value3', false],
    ])('change 이벤트가 발생하기 전까지 인자로 전달된 값을 반환한다', (init, comp, expected) => {
      const { result } = renderHook(() => useInput(init));

      const [value] = result.current;
      const isEqual = value === comp;

      expect(isEqual).toBe(expected);
    });
  });

  describe('이벤트 발생', () => {
    afterEach(cleanup);

    it('change 이벤트 발생 시 value가 변경된다', () => {
      const { getByTestId } = render(createElement(TestInputFactory()));
      const input = getByTestId('input') as HTMLInputElement;

      expect(input.value).toBe('');

      fireEvent.change(input, { target: { value: 'changed' } });

      expect(input.value).toBe('changed');

      fireEvent.change(input, { target: { value: 'one more changed' } });

      expect(input.value).toBe('one more changed');
    });
  });

  describe('sequenceValue', () => {
    afterEach(cleanup);

    it('sequence 함수에 따라 값을 변경한다', () => {
      const { getByTestId } = render(createElement(TestInputFactory('', v => v.toUpperCase())));
      const input = getByTestId('input') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'uppercase' } });

      expect(input.value).toBe('UPPERCASE');
    });
  });
});
