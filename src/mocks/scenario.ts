export type MockScenario =
  | 'success'
  | 'accounts-error'
  | 'empty-accounts'
  | 'slow-account-a'
  | 'slow-account-b'
  | 'transaction-error'
  | 'empty-transactions'
  | 'network-error'
  | 'out-of-order';

const fallback: MockScenario = 'success';

export function getMockScenario(): MockScenario {
  const fromUrl =
    typeof window === 'undefined'
      ? null
      : new URLSearchParams(window.location.search).get('mockScenario');
  const candidate = fromUrl ?? import.meta.env.VITE_MOCK_SCENARIO;
  return (
    [
      'success',
      'accounts-error',
      'empty-accounts',
      'slow-account-a',
      'slow-account-b',
      'transaction-error',
      'empty-transactions',
      'network-error',
      'out-of-order',
    ] as string[]
  ).includes(candidate ?? '')
    ? (candidate as MockScenario)
    : fallback;
}
