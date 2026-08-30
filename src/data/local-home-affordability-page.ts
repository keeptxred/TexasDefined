import { createServerFn } from '@tanstack/react-start';

const loadLocalHomeAffordabilityPage = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadLocalHomeAffordabilityPageServer } = await import('./local-home-affordability-page.server');
    return loadLocalHomeAffordabilityPageServer(data.slug);
  });

export function getLocalHomeAffordabilityPage(slug: string) {
  return loadLocalHomeAffordabilityPage({ data: { slug } });
}
