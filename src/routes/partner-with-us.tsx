import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/partner-with-us';
const description = 'Partner with Texas Defined on useful, clearly disclosed Texas home, moving, travel, sports-travel and local-service resources while preserving editorial independence.';

const partnershipTypes = ['insurance', 'mortgage', 'real-estate', 'moving', 'travel', 'sports-travel', 'sponsorship', 'other'] as const;
type PartnershipType = typeof partnershipTypes[number];

type PartnerSearch = {
  partnershipType?: PartnershipType;
  sourcePath: string;
};

const allowedSourcePatterns = [
  /^\/sports-venues$/,
  /^\/sports-venue\/[a-z0-9-]+$/,
  /^\/texas-mortgage-calculator(?:\/[a-z0-9-]+)?$/,
  /^\/texas-home-insurance-calculator(?:\/[a-z0-9-]+)?$/,
  /^\/texas-home-affordability-calculator(?:\/[a-z0-9-]+)?$/,
  /^\/texas-homeownership-cost-calculator(?:\/[a-z0-9-]+)?$/,
  /^\/property-tax-calculators$/,
  /^\/moving-to-texas$/,
] as const;

function sanitizePartnerSource(value: unknown) {
  if (typeof value !== 'string') return canonicalPath;
  return allowedSourcePatterns.some((pattern) => pattern.test(value)) ? value : canonicalPath;
}

function sanitizePartnershipType(value: unknown): PartnershipType | undefined {
  return typeof value === 'string' && (partnershipTypes as readonly string[]).includes(value)
    ? value as PartnershipType
    : undefined;
}

export const Route = createFileRoute('/partner-with-us')({
  validateSearch: (search: Record<string, unknown>): PartnerSearch => ({
    partnershipType: sanitizePartnershipType(search.type),
    sourcePath: sanitizePartnerSource(search.source),
  }),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Partner With Texas Defined', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
