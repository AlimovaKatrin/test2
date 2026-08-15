# Failure Scenarios — Account Switcher and Race Condition

Set a browser scenario with `?mockScenario=<name>` or `VITE_MOCK_SCENARIO`. Tests should prefer `server.use(...)`.

- `success`: deterministic success behaviour.
- `accounts-error`: deterministic accounts error behaviour.
- `empty-accounts`: deterministic empty accounts behaviour.
- `slow-account-a`: deterministic slow account a behaviour.
- `slow-account-b`: deterministic slow account b behaviour.
- `transaction-error`: deterministic transaction error behaviour.
- `empty-transactions`: deterministic empty transactions behaviour.
- `network-error`: deterministic network error behaviour.
- `out-of-order`: deterministic out of order behaviour.

No handler uses random values, a live clock, a database, a public API, or a real token. Unhandled requests fail tests.
