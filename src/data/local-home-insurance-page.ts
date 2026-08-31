import { createServerFn } from '@tanstack/react-start';

const loadLocalHomeInsurancePage = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadLocalHomeInsurancePageServer } = await import('./local-home-insurance-page.server');
    return loadLocalHomeInsurancePageServer(data.slug);
  });

export function getLocalHomeInsurancePage(slug: string) {
  return loadLocalHomeInsurancePage({ data: { slug } });
}
