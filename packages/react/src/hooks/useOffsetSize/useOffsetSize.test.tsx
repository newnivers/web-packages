import { act, render, renderHook } from '@testing-library/react';
import { createElement, MutableRefObject } from 'react';

import { useOffsetSize } from './useOffsetSize';

const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth') as PropertyDescriptor;

const originalOffsetHeight = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetHeight'
) as PropertyDescriptor;

const FakeResizeElement = (node: HTMLElement, direction: 'width' | 'height', value: number) => {
  if (direction === 'width') {
    Object.defineProperty(node, 'offsetWidth', {
      configurable: true,
      value,
    });
  }

  if (direction === 'height') {
    Object.defineProperty(node, 'offsetHeight', {
      configurable: true,
      value,
    });
  }
};

function TestDivFactory(elemRef: MutableRefObject<HTMLDivElement | null>) {
  return function TestDiv() {
    return createElement('div', {
      'data-testid': 'div',
      ref: elemRef,
    });
  };
}

describe('useOffsetSize', () => {
  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
  });

  it('초기값', () => {
    const { result } = renderHook(useOffsetSize);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_elemRef, offsetSize] = result.current;

    expect(typeof offsetSize.width).toBe('number');
    expect(typeof offsetSize.height).toBe('number');
  });

  it.each([100, 200, 300])('width', value => {
    const { result } = renderHook(useOffsetSize);

    const [elemRef, offsetSize] = result.current;

    const { getByTestId } = render(createElement(TestDivFactory(elemRef)));
    const div = getByTestId('div') as HTMLDivElement;

    act(() => {
      FakeResizeElement(div, 'width', value);
    });

    expect(offsetSize.width).toEqual(value);
  });

  it.each([100, 200, 300])('height', value => {
    const { result } = renderHook(useOffsetSize);

    const [elemRef, offsetSize] = result.current;

    const { getByTestId } = render(createElement(TestDivFactory(elemRef)));
    const div = getByTestId('div') as HTMLDivElement;

    act(() => {
      FakeResizeElement(div, 'height', value);
    });

    expect(offsetSize.height).toEqual(value);
  });
});
