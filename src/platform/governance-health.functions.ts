import { createServerFn } from '@tanstack/react-start';

export const getGovernanceHealth = createServerFn({ method: 'GET' }).handler(async () => {
  const { governanceHealth } = await import('@/platform/governance-event-store');
  return governanceHealth();
});
