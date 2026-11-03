import { useState, useEffect } from "react";

const useLocalStorage = function <T>(key: string, initialValue: T[]) {
  const [values, setValues] = useState<T[]>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(values));
  }, [key, values]);

  return [values, setValues] as const;
};

export default useLocalStorage;
