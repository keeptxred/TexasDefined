import { createServerFn } from '@tanstack/react-start';

const loadLocalHomeownershipCostPage = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadLocalHomeownershipCostPageServer } = await import('./local-homeownership-cost-page.server');
    return loadLocalHomeownershipCostPageServer(data.slug);
  });

export function getLocalHomeownershipCostPage(slug: string) {
  return loadLocalHomeownershipCostPage({ data: { slug } });
}
