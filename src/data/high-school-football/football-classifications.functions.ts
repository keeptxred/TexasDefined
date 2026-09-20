import { createServerFn } from '@tanstack/react-start';

const loadClassificationDirectory = createServerFn({ method: 'GET' }).handler(async () => {
  const { getAllFootballClassifications } = await import('./football-classifications.server');
  return getAllFootballClassifications();
});

const loadClassificationProfile = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => ({
    slug: data.slug.trim().toLowerCase().slice(0, 8),
  }))
  .handler(async ({ data }) => {
    const { getFootballClassificationProfile } = await import('./football-classifications.server');
    return getFootballClassificationProfile(data.slug);
  });

export function getFootballClassificationDirectoryPage() {
  return loadClassificationDirectory();
}

export function getFootballClassificationPage(slug: string) {
  return loadClassificationProfile({ data: { slug } });
}
