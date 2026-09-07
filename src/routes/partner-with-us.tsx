import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/partner-with-us';
const description = 'Partner with Texas Defined on useful, clearly disclosed Texas home, moving, travel, sports-travel, Texas-brand and local-service resources while preserving editorial independence.';

type PartnerSearch = {
  partnershipType?: 'sports-travel' | 'brand-retail';
  sourcePath: string;
};

function sanitizePartnerSource(value: unknown) {
  if (typeof value !== 'string') return canonicalPath;
  if (value === '/sports-venues' || value === '/things-unique-to-texas/texas-brands') return value;
  if (/^\/sports-venue\/[a-z0-9-]+$/.test(value)) return value;
  return canonicalPath;
}

export const Route = createFileRoute('/partner-with-us')({
  validateSearch: (search: Record<string, unknown>): PartnerSearch => ({
    partnershipType: search.type === 'sports-travel'
      ? 'sports-travel'
      : search.type === 'brand-retail'
        ? 'brand-retail'
        : undefined,
    sourcePath: sanitizePartnerSource(search.source),
  }),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Partner With Texas Defined', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
