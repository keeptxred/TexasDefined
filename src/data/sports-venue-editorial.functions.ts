import { createServerFn } from '@tanstack/react-start';

export const getSportsVenueEditorialDescription = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const { getSportsVenueEditorialDescriptionServer } = await import('./sports-venue-editorial.server');
    return getSportsVenueEditorialDescriptionServer(data.id);
  });
