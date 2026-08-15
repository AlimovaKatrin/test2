import { delay, http, HttpResponse } from 'msw';
import { accounts, accountTransactions } from './fixtures';
import { getMockScenario } from './scenario';
export const handlers = [
  http.get('/api/accounts', () => {
    const mode: string = getMockScenario();
    if (mode === 'accounts-error') return HttpResponse.json({ message: 'Accounts unavailable' }, { status: 500 });
    if (mode === 'empty-accounts') return HttpResponse.json([]);
    if (mode === 'network-error') return HttpResponse.error();
    return HttpResponse.json(accounts);
  }),
  http.get('/api/accounts/:accountId/transactions', async ({ params }) => {
    const accountId = String(params.accountId);
    const mode: string = getMockScenario();
    if ((mode === 'slow-account-a' || mode === 'out-of-order') && accountId === 'account-a') await delay(1500);
    if ((mode === 'slow-account-b' || mode === 'out-of-order') && accountId === 'account-b') await delay(100);
    if (mode === 'transaction-error') return HttpResponse.json({ message: 'Transactions unavailable' }, { status: 500 });
    if (mode === 'empty-transactions') return HttpResponse.json([]);
    if (mode === 'network-error') return HttpResponse.error();
    return HttpResponse.json(accountTransactions[accountId] ?? []);
  }),
];
