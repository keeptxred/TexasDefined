import { createServerFn } from '@tanstack/react-start';

const loadFeaturedFootballProgramProfile = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => ({
    slug: data.slug.trim().slice(0, 120),
  }))
  .handler(async ({ data }) => {
    const { getFeaturedFootballProgramProfile } = await import('./featured-program-profile.server');
    return getFeaturedFootballProgramProfile(data.slug);
  });

export function getFeaturedFootballProgramProfile(slug: string) {
  return loadFeaturedFootballProgramProfile({ data: { slug } });
}
