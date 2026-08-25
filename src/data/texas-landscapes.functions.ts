import { createServerFn } from '@tanstack/react-start';

export const getTexasLandscapeHub = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { loadTexasLandscapeHubServer } = await import('./texas-landscapes.server');
    return loadTexasLandscapeHubServer();
  });

export const getTexasLandscapePage = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadTexasLandscapePageServer } = await import('./texas-landscapes.server');
    return loadTexasLandscapePageServer(data.slug);
  });
