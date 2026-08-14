import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const surfacePathSchema = z.string().regex(/^\/sports-venue\/[a-z0-9-]+$/).max(180);

export const recordSportsVenuePageviewFn = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ surfacePath: surfacePathSchema }))
  .handler(async ({ data }) => {
    const { recordSportsVenuePageview } = await import('./sports-traffic.server');
    return recordSportsVenuePageview(data.surfacePath);
  });

export const getSportsTrafficReadiness = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ accessKey: z.string().min(20).max(200) }))
  .handler(async ({ data }) => {
    const { loadSportsTrafficReadiness } = await import('./sports-traffic.server');
    return loadSportsTrafficReadiness(data.accessKey);
  });
