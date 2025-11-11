import { createContext, useContext, useMemo, useState } from 'react';

const UIContext = createContext(null);

// PUBLIC_INTERFACE
export function UIProvider({ children }) {
  /** Provides UI state such as sidebar visibility and toasts. */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, ...toast }]);
    setTimeout(() => {
      setToasts((t) => t.filter(x => x.id !== id));
    }, toast.duration || 3000);
  };

  const value = useMemo(() => ({
    sidebarOpen,
    setSidebarOpen,
    toasts,
    addToast
  }), [sidebarOpen, toasts]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

// PUBLIC_INTERFACE
export function useUI() {
  /** Access UI context */
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}
