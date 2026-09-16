import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/moving-to-texas/tools';
const description = 'TexasDefined tools for county, school, utility, voter, homestead, property-tax, ZIP and city research when moving to Texas.';

export const Route = createFileRoute('/moving-to-texas/tools')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Relocation Tools',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
