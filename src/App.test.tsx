import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { delay, http, HttpResponse } from 'msw';
import App from './App';
import { accountTransactions, accounts } from './mocks/fixtures';
import { server } from './mocks/server';

it('loads accounts and the first account transactions', async () => {
  render(<App />);
  expect(await screen.findByRole('option', { name: 'Everyday account' })).toBeInTheDocument();
  expect(await screen.findByText(/Everyday account payment 1/)).toBeInTheDocument();
});

it('loads transactions for a newly selected account', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.selectOptions(await screen.findByLabelText('Account'), 'account-b');
  expect(await screen.findByText(/Travel account payment 1/)).toBeInTheDocument();
});

it('prevents slow Account A from overwriting fast Account B', async () => {
  server.use(
    http.get('/api/accounts/:accountId/transactions', async ({ params }) => {
      const id = String(params.accountId);
      await delay(id === 'account-a' ? 500 : 30);
      return HttpResponse.json(accountTransactions[id] ?? []);
    }),
  );
  const user = userEvent.setup();
  render(<App />);
  await user.selectOptions(await screen.findByLabelText('Account'), 'account-b');
  expect(await screen.findByText(/Travel account payment 1/)).toBeInTheDocument();
  await new Promise((resolve) => setTimeout(resolve, 550));
  expect(screen.getByText(/Travel account payment 1/)).toBeInTheDocument();
  expect(screen.queryByText(/Everyday account payment 1/)).not.toBeInTheDocument();
});

it('retries only the selected account', async () => {
  let attempt = 0;
  server.use(
    http.get('/api/accounts/:accountId/transactions', ({ params }) => {
      attempt += 1;
      return attempt === 1
        ? HttpResponse.json({ message: 'Temporary' }, { status: 500 })
        : HttpResponse.json(accountTransactions[String(params.accountId)] ?? []);
    }),
  );
  const user = userEvent.setup();
  render(<App />);
  await user.click(await screen.findByRole('button', { name: 'Retry selected account' }));
  expect(await screen.findByText(/Everyday account payment 1/)).toBeInTheDocument();
  expect(attempt).toBe(2);
});

it('renders an empty account list', async () => {
  server.use(http.get('/api/accounts', () => HttpResponse.json([])));
  render(<App />);
  expect(await screen.findByText('No accounts available.')).toBeInTheDocument();
});

it('renders a recoverable account-list error', async () => {
  server.use(
    http.get('/api/accounts', () => HttpResponse.json({ message: 'No accounts' }, { status: 500 })),
  );
  render(<App />);
  expect(await screen.findByRole('button', { name: 'Retry accounts' })).toBeInTheDocument();
});

it('uses all deterministic account fixtures', () => {
  expect(accounts.map((account) => account.id)).toEqual(['account-a', 'account-b', 'account-c']);
});
