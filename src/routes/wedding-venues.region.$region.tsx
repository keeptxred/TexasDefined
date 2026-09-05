import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const REGION_NAMES: Record<string, string> = {
  'austin-hill-country': 'Austin & Texas Hill Country',
  'dallas-fort-worth': 'Dallas–Fort Worth',
  'houston-gulf-coast': 'Houston & Gulf Coast',
  'san-antonio-south-texas': 'San Antonio & South Texas',
  'east-west-panhandle': 'East Texas, West Texas & the Panhandle',
};

export const Route = createFileRoute('/wedding-venues/region/$region')({
  head: ({ params }) => {
    const regionName = REGION_NAMES[params.region] ?? 'Texas';
    const canonicalPath = `/wedding-venues/region/${params.region}`;
    const description = `Browse wedding venues in ${regionName}, with TexasDefined county connections where location data is curated and direct links to venue profiles for deeper planning.`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: `Top Wedding Venues in ${regionName}`,
        description,
        canonicalPath,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
});
