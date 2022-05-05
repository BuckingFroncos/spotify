import { render, screen } from '@testing-library/react';
import Home from './pages/Home'

test('check to see for Heading in Home page', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
});
