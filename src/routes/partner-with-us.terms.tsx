import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/partner-with-us/terms';
const description = 'Texas Defined advertising and sponsorship commercial terms, package schedules, disclosures and electronic agreement reference.';

export const Route = createFileRoute('/partner-with-us/terms')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Advertising & Sponsorship Terms',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
