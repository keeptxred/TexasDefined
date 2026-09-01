import { createServerFn } from '@tanstack/react-start';

const loadLocalSalaryNeededPage = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadLocalSalaryNeededPageServer } = await import('./local-salary-needed-page.server');
    return loadLocalSalaryNeededPageServer(data.slug);
  });

export function getLocalSalaryNeededPage(slug: string) {
  return loadLocalSalaryNeededPage({ data: { slug } });
}