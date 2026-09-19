import { createServerFn } from '@tanstack/react-start';

const loadFootballProgramProfile = createServerFn({ method: 'GET' })
  .inputValidator((data: { teamSlug: string }) => ({
    teamSlug: data.teamSlug.trim().toLowerCase().slice(0, 160),
  }))
  .handler(async ({ data }) => {
    const { getFootballProgramProfile } = await import('./football-directory.server');
    return getFootballProgramProfile(data.teamSlug);
  });

export function getFootballProgramProfilePage(teamSlug: string) {
  return loadFootballProgramProfile({ data: { teamSlug } });
}
