import { createServerFn } from '@tanstack/react-start';

const loadFootballProgramProfile = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => ({
    slug: data.slug.trim().toLowerCase().slice(0, 160),
  }))
  .handler(async ({ data }) => {
    const { getFootballProgramProfile } = await import('./football-program-profile.server');
    return getFootballProgramProfile(data.slug);
  });

const loadFootballProgramDirectory = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { getAllUilFootballPrograms } = await import('./football-program-profile.server');
    return getAllUilFootballPrograms();
  });

export function getFootballProgramProfilePage(slug: string) {
  return loadFootballProgramProfile({ data: { slug } });
}

export function getFootballProgramDirectoryPage() {
  return loadFootballProgramDirectory();
}
