import { ChangeEvent, useCallback, useState } from 'react';

export function useInput(initialValue = '', sequenceValue: (value: string) => string = pure) {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLElement & { value: string }>) => {
      setValue(sequenceValue(value));
    },
    [sequenceValue]
  );

  return [value, handleValueChange] as const;
}

function pure(value: string) {
  return value;
}
