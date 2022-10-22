import { render, screen } from '@testing-library/react';
import App from './App';

test('render app', () => {
  render(<App />);
});

test('Check if text exist', () => {
  render(<App />);
  const linkElement = screen.getByLabelText('נא הכנס את המילה שלך...');
  expect(linkElement).toBeInTheDocument();
});
