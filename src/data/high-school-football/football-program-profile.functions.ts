import { createServerFn } from '@tanstack/react-start';

const loadFootballProgramProfile = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => ({
    slug: data.slug.trim().toLowerCase().slice(0, 160),
  }))
  .handler(async ({ data }) => {
    try {
      const { getFootballProgramProfile } = await import('./football-program-profile.server');
      return await getFootballProgramProfile(data.slug);
    } catch (error) {
      // Give production/Miniflare a scoped real stack trace while retaining the
      // same fail-closed HTTP response and original exception for strict CI.
      console.error('[football-profile:ssr-loader] Failed for public school slug ' + data.slug, error);
      throw error;
    }
  });

const loadFootballProgramDirectory = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { getAllUilFootballProgramIndexEntries } = await import('./football-program-index.server');
    return getAllUilFootballProgramIndexEntries();
  });

export function getFootballProgramProfilePage(slug: string) {
  return loadFootballProgramProfile({ data: { slug } });
}

export function getFootballProgramDirectoryPage() {
  return loadFootballProgramDirectory();
}
