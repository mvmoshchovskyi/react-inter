import { useState, useEffect } from "react";

const useDebounce = function <T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, value]);

  return debounced;
};

export default useDebounce;
