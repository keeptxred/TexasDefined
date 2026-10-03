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
    const { getAllUilFootballProgramIndexEntries } = await import('./football-program-index.server');
    return getAllUilFootballProgramIndexEntries();
  });

const loadPrivateFootballProgramDirectory = createServerFn({ method: 'GET' })
  .handler(async () => {
    const [{ FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS }, { privateFootballProgramSitemapEntries }] = await Promise.all([
      import('./featured-programs'),
      import('./football-sitemap.server'),
    ]);
    const paths = new Set(privateFootballProgramSitemapEntries().map((entry) => entry.path));
    return FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS
      .map((program) => ({
        slug: program.slug,
        schoolName: program.displayName,
        profilePath: `/texas-high-school-football-teams/${program.slug}`,
        governingBodyHint: program.governingBodyHint,
      }))
      .filter((program) => paths.has(program.profilePath))
      .sort((left, right) => left.schoolName.localeCompare(right.schoolName));
  });

export function getFootballProgramProfilePage(slug: string) {
  return loadFootballProgramProfile({ data: { slug } });
}

export function getFootballProgramDirectoryPage() {
  return loadFootballProgramDirectory();
}

export function getPrivateFootballProgramDirectoryPage() {
  return loadPrivateFootballProgramDirectory();
}
