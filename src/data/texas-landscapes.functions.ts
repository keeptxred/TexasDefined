import { createServerFn } from '@tanstack/react-start';

export const getTexasLandscapePage = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadTexasLandscapePageServer } = await import('./texas-landscapes.server');
    return loadTexasLandscapePageServer(data.slug);
  });
