import { createFileRoute } from '@tanstack/react-router';
import { RelocationServiceFinder } from '@/components/relocation/RelocationServiceFinder';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/find-my-emergency-services';
const title = 'Find Texas Emergency and Community Services';
const description = 'Search a Texas city or county for local context and connect to official emergency and community-service resources. Call 911 for an immediate emergency.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ '@context': 'https://schema.org', '@type': 'WebApplication', name: title, description, url: `${siteUrl}${canonicalPath}`, applicationCategory: 'ReferenceApplication', operatingSystem: 'Web' })],
  }),
  component: () => <RelocationServiceFinder kind="emergency" />,
});
