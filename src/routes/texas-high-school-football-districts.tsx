import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getFootballDistrictDirectoryPage } from '@/data/high-school-football/football-districts.functions';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/texas-high-school-football-districts';

export const Route = createFileRoute(canonicalPath)({
  loader: () => getFootballDistrictDirectoryPage(),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas High School Football Districts: 2026–28 UIL Directory',
      description: 'Browse all 192 current UIL football districts for 2026–28, including every Texas 6A district plus 5A–1A six-man, with official alignments and school guides.',
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
