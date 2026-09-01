import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/partner-with-us';
const description = 'Partner with Texas Defined on useful, clearly disclosed Texas home, moving, travel, sports-travel and local-service resources while preserving editorial independence.';

type PartnerSearch = {
  partnershipType?: 'sports-travel';
  sourcePath: string;
};

function sanitizePartnerSource(value: unknown) {
  if (typeof value !== 'string') return canonicalPath;
  if (value === '/sports-venues') return value;
  if (/^\/sports-venue\/[a-z0-9-]+$/.test(value)) return value;
  return canonicalPath;
}

export const Route = createFileRoute('/partner-with-us')({
  validateSearch: (search: Record<string, unknown>): PartnerSearch => ({
    partnershipType: search.type === 'sports-travel' ? 'sports-travel' : undefined,
    sourcePath: sanitizePartnerSource(search.source),
  }),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Partner With Texas Defined', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
