import { createFileRoute } from '@tanstack/react-router';
import { RelocationServiceFinder } from '@/components/relocation/RelocationServiceFinder';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/find-my-property-tax';
const title = 'Find Your Texas Property Tax and Appraisal Offices';
const description = 'Search a Texas city or county to find the local appraisal-district, property-search and tax-office path for property-tax research.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ '@context': 'https://schema.org', '@type': 'WebApplication', name: title, description, url: `${siteUrl}${canonicalPath}`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web' })],
  }),
  component: () => <RelocationServiceFinder kind="property-tax" />,
});
