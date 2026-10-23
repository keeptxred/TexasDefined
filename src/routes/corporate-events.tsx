import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/corporate-events';

export const Route = createFileRoute('/corporate-events')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Corporate Events & Team Building Finder',
      description: 'Compare sourced Texas group activities and corporate venues in Houston, Dallas–Fort Worth, Austin and San Antonio by headcount, event type and budget. Build a team shortlist and share a proposal.',
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
