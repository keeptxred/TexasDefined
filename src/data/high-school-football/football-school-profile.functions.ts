import { createServerFn } from '@tanstack/react-start';

const loadFootballSchoolProfile = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => ({
    slug: data.slug.trim().toLowerCase().slice(0, 160),
  }))
  .handler(async ({ data }) => {
    const { getFootballSchoolProfile } = await import('./football-school-profile.server');
    return getFootballSchoolProfile(data.slug);
  });

const loadFootballSchoolDirectory = createServerFn({ method: 'GET' })
  .handler(async () => {
    const {
      UIL_FOOTBALL_PROFILE_DIRECTORY,
      UIL_FOOTBALL_PROFILE_COUNTS,
      uilFootballProfilePath,
    } = await import('./uil-football-profile-index.server');

    return {
      programs: UIL_FOOTBALL_PROFILE_DIRECTORY.map((program) => ({
        ...program,
        profilePath: uilFootballProfilePath(program),
      })),
      counts: UIL_FOOTBALL_PROFILE_COUNTS,
    };
  });

export function getFootballSchoolProfilePage(slug: string) {
  return loadFootballSchoolProfile({ data: { slug } });
}

export function getFootballSchoolDirectory() {
  return loadFootballSchoolDirectory();
}
