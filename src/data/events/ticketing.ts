import type {
  TexasEventTicketLink,
  TexasEventTicketProvider,
  TexasEventTicketingMetadata,
} from "./texas-event-record";

const NON_ACTIONABLE_SALE_STATUSES = new Set<TexasEventTicketLink["saleStatus"]>([
  "not-on-sale-yet",
  "sold-out",
  "off-sale",
  "cancelled",
]);

export interface ResolvedEventTicketCta {
  href: string;
  label: "Find Tickets →" | "Official Tickets →";
  provider: TexasEventTicketProvider;
  isAffiliate: boolean;
  rel: "sponsored nofollow noopener noreferrer" | "noopener noreferrer";
  disclosure?: string;
  sourceName: string;
  lastVerifiedAt: string;
}

function safeHttpsUrl(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function isExpired(value: string | undefined, now: Date) {
  if (!value) return false;
  const expiresAt = Date.parse(value);
  return !Number.isFinite(expiresAt) || expiresAt <= now.getTime();
}

function rankedLinks(ticketing: TexasEventTicketingMetadata) {
  return ticketing.links
    .map((link, index) => ({ link, index }))
    .sort((left, right) => (left.link.priority ?? Number.MAX_SAFE_INTEGER) - (right.link.priority ?? Number.MAX_SAFE_INTEGER) || left.index - right.index)
    .map(({ link }) => link);
}

function isActionable(link: TexasEventTicketLink) {
  return !NON_ACTIONABLE_SALE_STATUSES.has(link.saleStatus);
}

/**
 * Resolve one commercial ticket action only. A current affiliate deep link wins;
 * otherwise the highest-priority current official ticket URL is used. Unsafe,
 * expired and explicitly unavailable links are ignored rather than rendered as
 * fake or disabled CTAs.
 */
export function resolveEventTicketCta(ticketing: TexasEventTicketingMetadata | undefined, now = new Date()): ResolvedEventTicketCta | null {
  if (!ticketing?.links.length) return null;
  const links = rankedLinks(ticketing).filter(isActionable);

  for (const link of links) {
    const href = safeHttpsUrl(link.affiliateUrl);
    if (!href || isExpired(link.affiliateExpiresAt, now)) continue;
    return {
      href,
      label: "Find Tickets →",
      provider: link.provider,
      isAffiliate: true,
      rel: "sponsored nofollow noopener noreferrer",
      disclosure: "Affiliate link · ticket checkout is handled by the ticket provider.",
      sourceName: link.source.name,
      lastVerifiedAt: link.lastVerifiedAt,
    };
  }

  for (const link of links) {
    const href = safeHttpsUrl(link.officialTicketUrl);
    if (!href || isExpired(link.officialExpiresAt, now)) continue;
    return {
      href,
      label: "Official Tickets →",
      provider: link.provider,
      isAffiliate: false,
      rel: "noopener noreferrer",
      sourceName: link.source.name,
      lastVerifiedAt: link.lastVerifiedAt,
    };
  }

  return null;
}
