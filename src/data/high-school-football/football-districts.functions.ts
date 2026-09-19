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
    const { getAllFootballDistricts } = await import('./football-districts.server');
    return getAllFootballDistricts();
  });

export function getFootballDistrictPage(slug: string) {
  return loadFootballDistrict({ data: { slug } });
}

export function getFootballDistrictDirectoryPage() {
  return loadFootballDistrictDirectory();
}
