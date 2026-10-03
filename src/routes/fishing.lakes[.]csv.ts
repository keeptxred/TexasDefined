import { createFileRoute } from '@tanstack/react-router';

const quote = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;

export const Route = createFileRoute('/fishing/lakes.csv')({
  server: {
    handlers: {
      GET: async () => {
        const [{ fishingPlatform, fishingScope }, { isCompleteFishingLakeSlug }] = await Promise.all([
          import('@/data/fishing'),
          import('@/data/fishing/slugs'),
        ]);
        const lakes = (await fishingPlatform.lakes.list({ ...fishingScope, status: 'published', limit: 5000 }))
          .filter((lake) => isCompleteFishingLakeSlug(lake.slug))
          .sort((left, right) => left.name.localeCompare(right.name));
        const header = [
          'name', 'alternate_names', 'canonical_url', 'region', 'water_type', 'water_class', 'counties', 'nearest_cities',
          'surface_acres', 'maximum_depth_feet', 'impounded_year', 'river_basin', 'primary_waterway', 'controlling_authorities',
          'latitude', 'longitude', 'verified_at', 'source_names', 'source_urls',
        ];
        const rows = lakes.map((lake) => [
          lake.name,
          lake.aliases?.join(' | ') ?? '',
          `https://texasdefined.com/fishing/lakes/${lake.slug}`,
          lake.region,
          lake.waterType,
          lake.waterClass,
          lake.counties.join(' | '),
          lake.nearestCities.join(' | '),
          lake.surfaceAcres ?? '',
          lake.maxDepthFeet ?? '',
          lake.impoundedYear ?? '',
          lake.riverBasin ?? '',
          lake.primaryWaterway ?? '',
          lake.controllingAuthorities.join(' | '),
          lake.coordinates?.lat ?? '',
          lake.coordinates?.lng ?? '',
          lake.verifiedAt ?? '',
          lake.sources.map((source) => source.name).join(' | '),
          lake.sources.map((source) => source.url).join(' | '),
        ]);
        const csv = [header, ...rows].map((row) => row.map(quote).join(',')).join('\n');
        return new Response(`${csv}\n`, {
          headers: {
            'content-type': 'text/csv; charset=utf-8',
            'content-disposition': 'attachment; filename="texasdefined-texas-lakes-database.csv"',
            'cache-control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
            'x-robots-tag': 'noindex, follow',
          },
        });
      },
    },
  },
});
