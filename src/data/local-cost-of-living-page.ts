import { createServerFn } from '@tanstack/react-start';

const loadLocalCostOfLivingPage = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadLocalCostOfLivingPageServer } = await import('./local-cost-of-living-page.server');
    return loadLocalCostOfLivingPageServer(data.slug);
  });

export function getLocalCostOfLivingPage(slug: string) {
  return loadLocalCostOfLivingPage({ data: { slug } });
}