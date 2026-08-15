# Practical Stages — Account Switcher and Race Condition

Reveal exactly one stage at a time. Do not disclose future requirements.

## Stage 1

**Requirement:** Load the available accounts. Display an accessible account selector. Load transactions for the selected account. Display the selected account’s transactions.

**Business purpose:** Deliver the next smallest user-visible risk reduction for Account Switcher and Race Condition.

**Expected behaviour:** The candidate demonstrates the requirement in the preview and explains observable request states.

**Acceptance criteria:**

- The visible requirement works using the local API.
- Types describe real values; no `any` is introduced.
- Errors do not become successful data or permanent loading.
- Controls and status output are accessible.
- The candidate confirms preview or test evidence.

**Available API behaviour:** GET /api/accounts; GET /api/accounts/:accountId/transactions.

**Product clarification answer:** Prefer the simplest behaviour that preserves useful data and prevents invalid or stale user-visible results.

**Hidden edge cases:** failure, empty data, duplicate or stale action, and malformed boundary data where relevant.

**Likely mistakes:** broad rewrite, swallowed error, unsafe assertion, one global loading flag, state mutation, or implementation-detail testing.

**Follow-up:** “What user-visible state proves this is correct?”

**Suggested time:** 8–20 minutes.

**Proceed when:** a working vertical slice is demonstrated or the time budget is exhausted.

## Stage 2

**Requirement:** Handle a deterministic race where slow Account A resolves after fast Account B; B must remain visible and cancellation must not surface as an error.

**Business purpose:** Deliver the next smallest user-visible risk reduction for Account Switcher and Race Condition.

**Expected behaviour:** The candidate demonstrates the requirement in the preview and explains observable request states.

**Acceptance criteria:**

- The visible requirement works using the local API.
- Types describe real values; no `any` is introduced.
- Errors do not become successful data or permanent loading.
- Controls and status output are accessible.
- The candidate confirms preview or test evidence.

**Available API behaviour:** GET /api/accounts; GET /api/accounts/:accountId/transactions.

**Product clarification answer:** Prefer the simplest behaviour that preserves useful data and prevents invalid or stale user-visible results.

**Hidden edge cases:** failure, empty data, duplicate or stale action, and malformed boundary data where relevant.

**Likely mistakes:** broad rewrite, swallowed error, unsafe assertion, one global loading flag, state mutation, or implementation-detail testing.

**Follow-up:** “What user-visible state proves this is correct?”

**Suggested time:** 20–32 minutes.

**Proceed when:** a working vertical slice is demonstrated or the time budget is exhausted.

## Stage 3

**Requirement:** Choose and implement a refetch UX, keep errors account-scoped, and add account-scoped Retry without ever showing A data as B data.

**Business purpose:** Deliver the next smallest user-visible risk reduction for Account Switcher and Race Condition.

**Expected behaviour:** The candidate demonstrates the requirement in the preview and explains observable request states.

**Acceptance criteria:**

- The visible requirement works using the local API.
- Types describe real values; no `any` is introduced.
- Errors do not become successful data or permanent loading.
- Controls and status output are accessible.
- The candidate confirms preview or test evidence.

**Available API behaviour:** GET /api/accounts; GET /api/accounts/:accountId/transactions.

**Product clarification answer:** Prefer the simplest behaviour that preserves useful data and prevents invalid or stale user-visible results.

**Hidden edge cases:** failure, empty data, duplicate or stale action, and malformed boundary data where relevant.

**Likely mistakes:** broad rewrite, swallowed error, unsafe assertion, one global loading flag, state mutation, or implementation-detail testing.

**Follow-up:** “What user-visible state proves this is correct?”

**Suggested time:** 32–45 minutes.

**Proceed when:** a working vertical slice is demonstrated or the time budget is exhausted.

## Stage 4

**Requirement:** Write a deterministic behavioural test for A starts → B starts → B resolves → A resolves, proving B remains visible.

**Business purpose:** Deliver the next smallest user-visible risk reduction for Account Switcher and Race Condition.

**Expected behaviour:** The candidate demonstrates the requirement in the preview and explains observable request states.

**Acceptance criteria:**

- The visible requirement works using the local API.
- Types describe real values; no `any` is introduced.
- Errors do not become successful data or permanent loading.
- Controls and status output are accessible.
- The candidate confirms preview or test evidence.

**Available API behaviour:** GET /api/accounts; GET /api/accounts/:accountId/transactions.

**Product clarification answer:** Prefer the simplest behaviour that preserves useful data and prevents invalid or stale user-visible results.

**Hidden edge cases:** failure, empty data, duplicate or stale action, and malformed boundary data where relevant.

**Likely mistakes:** broad rewrite, swallowed error, unsafe assertion, one global loading flag, state mutation, or implementation-detail testing.

**Follow-up:** “What user-visible state proves this is correct?”

**Suggested time:** 45–52 minutes.

**Proceed when:** a working vertical slice is demonstrated or the time budget is exhausted.
