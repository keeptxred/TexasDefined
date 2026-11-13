import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';
import { parsePartnerSearch } from '@/lib/partner-search';

const canonicalPath = '/partner-with-us';
const description = 'Texas Defined advertising packages, placements, billing and agreements. Paid relationships do not buy editorial coverage, favorable rankings or changes to factual conclusions. One approved sports sponsored placement may run on a sports surface at a time.';

export const Route = createFileRoute('/partner-with-us')({
  validateSearch: parsePartnerSearch,
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Advertise & Partner With Texas Defined', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
