import { render, screen } from '@testing-library/react';
import App from './App';

it('renders the candidate starter', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: 'Account Switcher and Race Condition' }),
  ).toBeInTheDocument();
});

it.todo('replace with one meaningful behavioural test during the interview');
