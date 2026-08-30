import { createServerFn } from '@tanstack/react-start';

const loadLocalPropertyTaxCalculatorPage = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadLocalPropertyTaxCalculatorPageServer } = await import('./local-property-tax-calculator-page.server');
    return loadLocalPropertyTaxCalculatorPageServer(data.slug);
  });

export function getLocalPropertyTaxCalculatorPage(slug: string) {
  return loadLocalPropertyTaxCalculatorPage({ data: { slug } });
}
