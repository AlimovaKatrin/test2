import { useCallback, useEffect, useState } from 'react';
import { checkedResponse, readJson } from './api/client';
import { toError } from './api/errors';
import type { RequestState } from './domain/request-state';

type Account = { id: string; displayName: string; balance: string; currency: string };
type Transaction = { id: string; accountId: string; description: string; amount: string; currency: string; createdDate: number };

function records(value: unknown): Record<string, unknown>[] { if (!Array.isArray(value) || !value.every((item) => typeof item === 'object' && item !== null)) throw new Error('Invalid API payload'); return value as Record<string, unknown>[]; }
function parseAccounts(value: unknown): Account[] { return records(value).map((item) => { if (typeof item.id !== 'string' || typeof item.displayName !== 'string' || typeof item.balance !== 'string' || typeof item.currency !== 'string') throw new Error('Invalid account data'); return { id: item.id, displayName: item.displayName, balance: item.balance, currency: item.currency }; }); }
function parseTransactions(value: unknown): Transaction[] { return records(value).map((item) => { if (typeof item.id !== 'string' || typeof item.accountId !== 'string' || typeof item.description !== 'string' || typeof item.amount !== 'string' || typeof item.currency !== 'string' || typeof item.createdDate !== 'number') throw new Error('Invalid transaction data'); return { id: item.id, accountId: item.accountId, description: item.description, amount: item.amount, currency: item.currency, createdDate: item.createdDate }; }); }

function App() {
  const [accounts, setAccounts] = useState<RequestState<Account[]>>({ status: 'idle' });
  const [selectedId, setSelectedId] = useState('');
  const [transactions, setTransactions] = useState<RequestState<Transaction[]>>({ status: 'idle' });
  const [requestVersion, setRequestVersion] = useState(0);

  const loadAccounts = useCallback(async () => {
    setAccounts({ status: 'loading' });
    try { const response = await checkedResponse('/api/accounts'); const data = parseAccounts(await readJson(response)); setAccounts({ status: 'success', data }); setSelectedId((current) => current || data[0]?.id || ''); }
    catch (error: unknown) { setAccounts({ status: 'error', error: toError(error) }); }
  }, []);

  useEffect(() => { void loadAccounts(); }, [loadAccounts]);

  useEffect(() => {
    if (!selectedId) { setTransactions({ status: 'idle' }); return; }
    const controller = new AbortController();
    setTransactions({ status: 'loading' });
    void checkedResponse(`/api/accounts/${selectedId}/transactions`)
      .then(readJson).then(parseTransactions).then((data) => { if (!controller.signal.aborted) setTransactions({ status: 'success', data }); })
      .catch((error: unknown) => { if (controller.signal.aborted) return; setTransactions({ status: 'error', error: toError(error) }); });
    return () => controller.abort();
  }, [requestVersion, selectedId]);

  return <main><p className="eyebrow">Reference solution</p><h1>Account Switcher and Race Condition</h1><section className="card stack">
    {accounts.status === 'loading' || accounts.status === 'idle' ? <p role="status">Loading accounts…</p> : null}
    {accounts.status === 'error' ? <div role="alert"><p className="error">Could not load accounts.</p><button onClick={() => void loadAccounts()}>Retry accounts</button></div> : null}
    {accounts.status === 'success' && accounts.data.length === 0 ? <p>No accounts available.</p> : null}
    {accounts.status === 'success' && accounts.data.length > 0 ? <label>Account<select value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>{accounts.data.map((account) => <option key={account.id} value={account.id}>{account.displayName}</option>)}</select></label> : null}
    {transactions.status === 'loading' ? <p role="status">Loading selected account…</p> : null}
    {transactions.status === 'error' ? <div role="alert"><p className="error">Could not load this account’s transactions.</p><button onClick={() => setRequestVersion((value) => value + 1)}>Retry selected account</button></div> : null}
    {transactions.status === 'success' && transactions.data.length === 0 ? <p>No transactions for this account.</p> : null}
    {transactions.status === 'success' && transactions.data.length > 0 ? <ul>{transactions.data.map((transaction) => <li key={transaction.id}>{transaction.description} — {transaction.amount} {transaction.currency}</li>)}</ul> : null}
  </section></main>;
}

export default App;
