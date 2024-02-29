import { useEffect, useState } from "react";

const useDebounce = <T>(str: T, delay = 400) => {
  const [debounce, setDebounce] = useState<T>(str);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(str);
    }, delay);

    return () => clearTimeout(timeout);
  }, [str]);

  return debounce;
};

export default useDebounce;
