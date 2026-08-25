import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'Explore Texas-made and Texas-processed products, homegrown brands, headquarters and major operations by category, city and county.';

export const Route = createFileRoute('/made-in-texas')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      title: 'Made in Texas — Products, Brands & Companies by City and County',
      description,
      canonicalPath: '/made-in-texas',
    }),
    links: [canonicalLink(texasDefinedBrand, '/made-in-texas')],
  }),
});
