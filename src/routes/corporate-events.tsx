import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/corporate-events';

export const Route = createFileRoute('/corporate-events')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Corporate Events & Team Building Finder',
      description: 'Find source-backed Texas corporate event venues in Houston, DFW, Austin, San Antonio, Bryan–College Station, Tyler, Beaumont and more. Compare by group size and budget.',
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
