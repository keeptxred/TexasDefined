import { createServerFn } from '@tanstack/react-start';

const loadHomeownershipCostHubPage = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { loadHomeownershipCostHubPageServer } = await import('./homeownership-cost-hub-page.server');
    return loadHomeownershipCostHubPageServer();
  });

export function getHomeownershipCostHubPage() {
  return loadHomeownershipCostHubPage();
}
