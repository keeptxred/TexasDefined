import { createFileRoute } from '@tanstack/react-router';
import { RelocationServiceFinder } from '@/components/relocation/RelocationServiceFinder';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/find-my-voter-registration';
const title = 'Texas Voter Registration Finder';
const description = 'Find the Texas county context for voter registration, then use the official Texas Secretary of State portal to check status, rules and registration information.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ '@context': 'https://schema.org', '@type': 'WebApplication', name: title, description, url: `${siteUrl}${canonicalPath}`, applicationCategory: 'GovernmentService', operatingSystem: 'Web' })],
  }),
  component: () => <RelocationServiceFinder kind="voter" />,
});
