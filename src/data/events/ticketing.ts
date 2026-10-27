import type {
  TexasEventTicketLink,
  TexasEventTicketProvider,
  TexasEventTicketingMetadata,
} from "./texas-event-record";
import { isEventSpecificTicketDestination, publicTicketHostname } from "./ticket-provider.ts";

const NON_ACTIONABLE_SALE_STATUSES = new Set<TexasEventTicketLink["saleStatus"]>([
  "not-on-sale-yet",
  "sold-out",
  "off-sale",
  "cancelled",
]);

export interface ResolvedEventTicketCta {
  href: string;
  label: "Find Tickets →" | "Official Tickets →" | "Resale Tickets →" | "View Tickets →";
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
    return url.protocol === "https:" && !url.username && !url.password && !url.port
      && publicTicketHostname(url.hostname) && isEventSpecificTicketDestination(url.toString()) ? url.toString() : null;
  } catch {
    return null;
  }
}

/**
 * Only Ticketmaster's approved publisher 7758914 Impact feed currently has
 * an authorized affiliate adapter. HTTPS alone never proves authorization.
 * Match the redirect destination against this exact official event URL.
 */
function approvedAffiliateHref(link: TexasEventTicketLink): string | null {
  if (link.source.kind !== "provider" || link.source.name !== "Ticketmaster"
    || (link.provider !== "ticketmaster" && link.provider !== "ticketweb")) return null;
  const href = safeHttpsUrl(link.affiliateUrl);
  const officialHref = safeHttpsUrl(link.officialTicketUrl);
  if (!href || !officialHref) return null;
  const affiliate = new URL(href);
  const official = new URL(officialHref);
  if (affiliate.hostname !== "ticketmaster.evyy.net"
    || !/^\/c\/7758914\/264167\/4272\/?$/.test(affiliate.pathname)
    || affiliate.searchParams.size !== 4
    || affiliate.searchParams.getAll("u").length !== 1
    || affiliate.searchParams.getAll("subId1").length !== 1
    || affiliate.searchParams.get("subId1") !== "texasdefined"
    || affiliate.searchParams.getAll("partnerpropertyid").length !== 1
    || affiliate.searchParams.get("partnerpropertyid") !== "8837726"
    || affiliate.searchParams.getAll("MediaPartnerPropertyId").length !== 1
    || affiliate.searchParams.get("MediaPartnerPropertyId") !== "8837726") return null;
  const officialHost = official.hostname.toLowerCase();
  const isTicketmasterEvent = (officialHost === "ticketmaster.com" || officialHost === "www.ticketmaster.com")
    && /\/event\/[A-Za-z0-9_-]+\/?$/.test(official.pathname);
  const isTicketwebEvent = (officialHost === "ticketweb.com" || officialHost === "www.ticketweb.com")
    && /^\/event\/[^/]+\/[A-Za-z0-9_-]+\/?$/.test(official.pathname);
  if (!isTicketmasterEvent && !isTicketwebEvent) return null;
  const destinationHref = safeHttpsUrl(affiliate.searchParams.get("u") ?? undefined);
  if (destinationHref !== officialHref) return null;
  return href;
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

export function mergeEventTicketing(
  primary: TexasEventTicketingMetadata | undefined,
  provider: TexasEventTicketingMetadata | undefined,
): TexasEventTicketingMetadata | undefined {
  if (!primary) return provider;
  if (!provider) return primary;

  // Duplicate official checkout identities can enter via an organizer Offer
  // followed by the matching provider feed. The presence of Impact wrapping
  // must not turn ONE show into two competing internal ticket records.
  // Compare the exact event destination (including performance query), not
  // the affiliate wrapper; fragments are not an admission identity.
  const canonicalDestination = (link: TexasEventTicketLink) => {
    const url = safeHttpsUrl(link.officialTicketUrl);
    if (!url) return link.officialTicketUrl ? `official:${link.officialTicketUrl}`
      : `affiliate:${link.affiliateUrl ?? link.provider + ":" + link.source.name + ":" + link.lastVerifiedAt}`;
    const parsed = new URL(url);
    parsed.hash = "";
    return `official:${parsed.toString()}`;
  };
  const byDestination = new Map<string, TexasEventTicketLink>();
  for (const link of [...primary.links, ...provider.links]) {
    const key = canonicalDestination(link);
    const previous = byDestination.get(key);
    if (!previous) { byDestination.set(key, link); continue; }
    const linkAffiliateApproved = Boolean(approvedAffiliateHref(link));
    const previousAffiliateApproved = Boolean(approvedAffiliateHref(previous));
    // Authorized event-exact Impact takes precedence over an unsigned manual
    // link, but unapproved commercial URLs never earn priority.
    if ((linkAffiliateApproved && !previousAffiliateApproved)
      || (!previousAffiliateApproved && !linkAffiliateApproved
        && link.source.kind === "provider" && previous.source.kind !== "provider")) {
      byDestination.set(key, link);
    }
  }
  const links = [...byDestination.values()];

  const seenOffers = new Set<string>();
  const offers = [...primary.offers, ...provider.offers].filter((offer) => {
    const key = `${offer.url}:${offer.name}`;
    if (seenOffers.has(key)) return false;
    seenOffers.add(key);
    return true;
  });

  return { links, offers };
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
    const href = approvedAffiliateHref(link);
    // An approved Impact wrapper cannot revive an expired underlying checkout.
    // Honor BOTH the affiliate tracking lease and official event URL expiry.
    if (!href || isExpired(link.affiliateExpiresAt, now) || isExpired(link.officialExpiresAt, now)) continue;
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
      label: link.provider === "vivid-seats" ? "Resale Tickets →"
        : link.provider === "seatgeek" ? "View Tickets →" : "Official Tickets →",
      provider: link.provider,
      isAffiliate: false,
      rel: "noopener noreferrer",
      disclosure: link.provider === "vivid-seats"
        ? "Third-party resale marketplace · not the event organizer's box office. Ticket prices and fees may differ from face value."
        : link.provider === "seatgeek"
          ? "SeatGeek may offer primary or resale tickets. Confirm ticket type, seller, and total fees before purchasing."
          : undefined,
      sourceName: link.source.name,
      lastVerifiedAt: link.lastVerifiedAt,
    };
  }

  return null;
}
