import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/find-my-homestead-exemption';
const title = 'Find Where to File a Texas Homestead Exemption';
const description = 'Search a Texas city or county to identify the local appraisal-district path for a residence-homestead exemption application and official filing instructions.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Find Where to File a Texas Homestead Exemption', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ '@context': 'https://schema.org', '@type': 'WebApplication', name: title, description, url: `${siteUrl}${canonicalPath}`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web' })],
  }),
});
