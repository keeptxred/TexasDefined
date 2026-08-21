import { createServerFn } from '@tanstack/react-start';

// Keep the heavy governance event store on the server; the admin UI only receives its health summary.
export const getGovernanceHealth = createServerFn({ method: 'GET' }).handler(async () => {
  const { governanceHealth } = await import('@/platform/governance-event-store');
  return governanceHealth();
});
