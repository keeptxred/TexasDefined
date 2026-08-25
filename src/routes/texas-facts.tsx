import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

export const description = 'A sourced-minded guide to essential Texas facts covering the Republic, geography, symbols, culture, industry and government.';

export const Route = createFileRoute('/texas-facts')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      title: '100 Essential Texas Facts — History, Geography, Culture & Industry',
      description,
      canonicalPath: '/texas-facts',
    }),
    links: [canonicalLink(texasDefinedBrand, '/texas-facts')],
  }),
});
