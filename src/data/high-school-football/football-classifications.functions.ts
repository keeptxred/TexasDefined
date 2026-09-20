import { createServerFn } from '@tanstack/react-start';

const loadFootballClassification = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => ({
    slug: data.slug.trim().toLowerCase().slice(0, 8),
  }))
  .handler(async ({ data }) => {
    const { getFootballClassificationProfile } = await import('./football-classifications.server');
    return getFootballClassificationProfile(data.slug);
  });

export function getFootballClassificationPage(slug: string) {
  return loadFootballClassification({ data: { slug } });
}
