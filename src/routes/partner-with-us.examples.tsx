import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/partner-with-us/examples';
const description = 'Demonstration-only Texas Defined advertiser placement examples for events, destinations, relocation, sports travel, RV guides, hubs and sponsored features.';

export const Route = createFileRoute('/partner-with-us/examples')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Advertising Placement Examples',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
