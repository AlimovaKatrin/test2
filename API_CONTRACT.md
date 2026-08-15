# API Contract — Account Switcher and Race Condition

All requests are local MSW requests and require `x-access-token: interview-test-token`. No real backend or credential is used.

## Success DTOs

`GET /api/accounts` returns `Array<{ id, displayName, balance: string, currency }>`. IDs include `account-a`, `account-b`, and `account-c`.

`GET /api/accounts/:accountId/transactions` returns `Array<{ id, accountId, description, amount: string, currency, createdDate: number }>`.

Only the success behaviour needed for Stage 1 is candidate-facing. Interviewer-only failure modes live on the `interviewer-kit` branch.
