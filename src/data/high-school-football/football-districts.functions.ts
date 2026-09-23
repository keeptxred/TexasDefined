import { createServerFn } from '@tanstack/react-start';

const loadFootballDistrict = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => ({
    slug: data.slug.trim().toLowerCase().slice(0, 120),
  }))
  .handler(async ({ data }) => {
    const { getFootballDistrictProfile } = await import('./football-districts.server');
    return getFootballDistrictProfile(data.slug);
  });

const loadFootballDistrictDirectory = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { getAllUilFootballProgramIndexEntries } = await import('./football-program-index.server');
    const programs = getAllUilFootballProgramIndexEntries();
    const districts = new Map<string, {
      slug: string;
      profilePath: string;
      classification: string;
      division: 1 | 2 | null;
      district: number;
      footballType: string;
      programCount: number;
    }>();

    for (const program of programs) {
      const divisionPart = program.division === 1 ? 'division-i' : program.division === 2 ? 'division-ii' : null;
      const slug = [program.classification.toLowerCase(), divisionPart, 'district', String(program.district)]
        .filter(Boolean)
        .join('-');
      const existing = districts.get(slug);
      if (existing) {
        existing.programCount += 1;
        continue;
      }
      districts.set(slug, {
        slug,
        profilePath: `/texas-high-school-football-districts/${slug}`,
        classification: program.classification,
        division: program.division,
        district: program.district,
        footballType: program.footballType,
        programCount: 1,
      });
    }

    const result = [...districts.values()];
    if (result.length !== 192) throw new Error(`UIL football district directory expected 192 districts; found ${result.length}.`);
    return result;
  });

export function getFootballDistrictPage(slug: string) {
  return loadFootballDistrict({ data: { slug } });
}

export function getFootballDistrictDirectoryPage() {
  return loadFootballDistrictDirectory();
}
