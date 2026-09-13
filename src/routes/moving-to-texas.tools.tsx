import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/moving-to-texas/tools';
const title = 'Texas Relocation Tools';
const description = 'TexasDefined relocation finders for school districts, DMV and county offices, utilities, voter registration, homestead exemptions, property taxes, emergency services, ZIP research and city comparison.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Relocation Tools', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description, url: `${siteUrl}${canonicalPath}` })],
  }),
});
