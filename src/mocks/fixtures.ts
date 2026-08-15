export type AccountDto = { id: string; displayName: string; balance: string; currency: string };
export type AccountTransactionDto = {
  id: string;
  accountId: string;
  description: string;
  amount: string;
  currency: string;
  createdDate: number;
};
export const accounts: AccountDto[] = [
  { id: 'account-a', displayName: 'Everyday account', balance: '1240.50', currency: 'GBP' },
  { id: 'account-b', displayName: 'Travel account', balance: '845.20', currency: 'EUR' },
  { id: 'account-c', displayName: 'Savings account', balance: '5120.00', currency: 'GBP' },
];
export const accountTransactions: Record<string, AccountTransactionDto[]> = Object.fromEntries(
  accounts.map((account, accountIndex) => [
    account.id,
    [1, 2, 3].map((value) => ({
      id: account.id + '-tx-' + value,
      accountId: account.id,
      description: account.displayName + ' payment ' + value,
      amount: String(10 * value + accountIndex),
      currency: account.currency,
      createdDate: 1760000000000 - value * 86400000,
    })),
  ]),
);
