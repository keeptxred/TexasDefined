import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/texas-data/research/texas-homeowners-premiums-vs-coverage';
const description = 'TexasDefined Research Desk compares Texas homeowners average annual premiums and average insured coverage, 2016–2025, using one Texas Department of Insurance statistical-plan series.';

export const Route = createFileRoute('/texas-data/research/texas-homeowners-premiums-vs-coverage')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Did Texas Home Insurance Premiums Outpace Coverage Growth?', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
