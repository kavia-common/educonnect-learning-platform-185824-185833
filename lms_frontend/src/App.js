import './App.css';
import AppRoutes from './routes';
import { AuthProvider } from './state/authContext';
import { UIProvider } from './state/uiContext';

// PUBLIC_INTERFACE
function App() {
  /** Root app component wiring providers and routes. */
  return (
    <UIProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </UIProvider>
  );
}

export default App;
