import { createServerFn } from '@tanstack/react-start';

const getPublishedSoftballTeam = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => ({ slug: data.slug.trim().toLowerCase().slice(0, 120) }))
  .handler(async ({ data }) => {
    const { getPublishedSoftballTeamProfile } = await import('./softball-published-team.server');
    return getPublishedSoftballTeamProfile(data.slug);
  });

export function getPublishedSoftballTeamPage(slug: string) {
  return getPublishedSoftballTeam({ data: { slug } });
}
