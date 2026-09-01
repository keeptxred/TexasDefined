import { createServerFn } from '@tanstack/react-start';

const loadLocalRentVsBuyPage = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadLocalRentVsBuyPageServer } = await import('./local-rent-vs-buy-page.server');
    return loadLocalRentVsBuyPageServer(data.slug);
  });

export function getLocalRentVsBuyPage(slug: string) {
  return loadLocalRentVsBuyPage({ data: { slug } });
}