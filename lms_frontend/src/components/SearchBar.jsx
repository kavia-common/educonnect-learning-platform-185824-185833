import { useState } from 'react';
import useDebounce from '../hooks/useDebounce';

// PUBLIC_INTERFACE
export default function SearchBar({ placeholder = 'Search', onSearch }) {
  /** Debounced search input */
  const [q, setQ] = useState('');
  const debounced = useDebounce(q, 300);

  // emit on debounce change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const emit = (value) => onSearch?.(value);

  if (debounced !== q) {
    emit(debounced);
  }

  return (
    <input className="input" placeholder={placeholder} value={q} onChange={(e) => setQ(e.target.value)} />
  );
}
