import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/texas-high-school-football-scores-schedules';

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas High School Football Scores & Schedules: 2026 UIL Guide',
      description: 'Use the UIL Texas Scoreboard for current Texas high school football schedules and scores, understand 2026 season dates, and know what the live data does and does not include.',
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
