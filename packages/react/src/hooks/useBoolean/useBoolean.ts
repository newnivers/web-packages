import { Dispatch, SetStateAction, useCallback, useState } from 'react';

interface UseBooleanResult {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggleBoolean: () => void;
}

export function useBoolean(defaultValue?: boolean): UseBooleanResult {
  defaultValue = defaultValue ?? false;

  const [value, setValue] = useState(defaultValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggleBoolean = useCallback(() => setValue(p => !p), []);

  return { value, setValue, setTrue, setFalse, toggleBoolean };
}
