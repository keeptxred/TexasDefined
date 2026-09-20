import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getFootballClassificationDirectoryPage } from '@/data/high-school-football/football-classifications.functions';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/texas-high-school-football-classifications';

export const Route = createFileRoute(canonicalPath)({
  loader: () => getFootballClassificationDirectoryPage(),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas High School Football Classifications: 6A to 1A Directory',
      description: 'Browse all current UIL Texas high school football programs by classification, from 6A through 1A, with official 2026–28 enrollment bands, district counts and school profiles.',
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
