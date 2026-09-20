import { createServerFn } from '@tanstack/react-start';

const loadFootballIsdDirectory = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { getFootballIsdDirectory } = await import('./football-isds.server');
    return getFootballIsdDirectory();
  });

const loadFootballIsdProfile = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => ({
    slug: data.slug.trim().toLowerCase().slice(0, 160),
  }))
  .handler(async ({ data }) => {
    const { getFootballIsdProfile } = await import('./football-isds.server');
    return getFootballIsdProfile(data.slug);
  });

export function getFootballIsdDirectoryPage() {
  return loadFootballIsdDirectory();
}

export function getFootballIsdProfilePage(slug: string) {
  return loadFootballIsdProfile({ data: { slug } });
}
