import { useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key);

    if (!item) return initialValue;

    try {
      return JSON.parse(item);
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    setStoredValue(value);

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  };

  const removeValue = () => {
    localStorage.removeItem(key);

    setStoredValue(initialValue);
  };

  return {
    value: storedValue,
    setValue,
    removeValue,
  };
}