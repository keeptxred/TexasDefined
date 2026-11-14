import { createServerFn } from '@tanstack/react-start';
import type { CountyProfile } from './county-profile';

// County pages execute the public-source lookup server-side on both initial SSR
// and client revalidation. Never fetch TSLAC or TIGERweb from a visitor browser:
// those official sites do not advertise cross-origin access for this application.
const loadCountyProfileServerFn = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string; countyName: string }) => data)
  .handler(async ({ data }): Promise<CountyProfile> => {
    const { loadCountyProfile } = await import('./county-profile');
    return loadCountyProfile(data.slug, data.countyName);
  });

export function loadCountyProfile(slug: string, countyName: string): Promise<CountyProfile> {
  return loadCountyProfileServerFn({ data: { slug, countyName } });
}
