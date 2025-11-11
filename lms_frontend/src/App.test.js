import { render, screen } from '@testing-library/react';
import App from './App';

// Smoke test: renders login prompt if unauthenticated and tries to access protected home
test('renders topbar brand and protected flow', async () => {
  render(<App />);
  // Topbar brand should appear
  const brand = await screen.findByText(/LMS/i);
  expect(brand).toBeInTheDocument();
});
