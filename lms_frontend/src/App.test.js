import { render, screen } from '@testing-library/react';
import App from './App';

// Smoke test: unauthenticated users should be redirected to /login and see login UI elements
test('redirects unauthenticated to login and shows login actions', async () => {
  render(<App />);
  // Topbar brand should appear
  const brand = await screen.findByText(/LMS/i);
  expect(brand).toBeInTheDocument();

  // Login page cues should be visible (button text or heading)
  const signInBtn = await screen.findAllByText(/Sign in/i);
  expect(signInBtn.length).toBeGreaterThan(0);
});
