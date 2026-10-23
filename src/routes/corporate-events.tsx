import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/corporate-events';

export const Route = createFileRoute('/corporate-events')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Corporate Events & Team Building Finder',
      description: 'Compare 45+ source-backed Texas corporate event venues across Houston, DFW, Austin, San Antonio, El Paso, Corpus Christi, Galveston, Waco and Lubbock.',
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
