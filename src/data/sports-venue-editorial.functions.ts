import { createServerFn } from '@tanstack/react-start';

export const getSportsVenueEditorialDescription = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const { getSportsVenueEditorialDescriptionServer } = await import('./sports-venue-editorial.server');
    return getSportsVenueEditorialDescriptionServer(data.id);
  });

export const getSportsVenueEditorialDescriptions = createServerFn({ method: 'GET' })
  .inputValidator((data: { ids: string[] }) => data)
  .handler(async ({ data }) => {
    const { getSportsVenueEditorialDescriptionServer } = await import('./sports-venue-editorial.server');
    const descriptions: Record<string, string> = {};
    for (const id of new Set(data.ids)) {
      const description = getSportsVenueEditorialDescriptionServer(id);
      if (description) descriptions[id] = description;
    }
    return descriptions;
  });
