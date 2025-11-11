import { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export default function useDebounce(value, delay = 300) {
  /** Debounces any changing value. */
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}
