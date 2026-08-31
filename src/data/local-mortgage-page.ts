import { createServerFn } from '@tanstack/react-start';

const loadLocalMortgagePage = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadLocalMortgagePageServer } = await import('./local-mortgage-page.server');
    return loadLocalMortgagePageServer(data.slug);
  });

export function getLocalMortgagePage(slug: string) {
  return loadLocalMortgagePage({ data: { slug } });
}
