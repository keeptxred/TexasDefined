/**
 * TexasDefined's canonical attraction, experience and event identity contract.
 *
 * Viator/Ticketmaster are DISCOVERY and BOOKING sources, never owners of the
 * editorial identity or proof of a scheduled public event. In particular, do
 * not index Viator-unique attraction content or auto-create indexable pages.
 */
export type DiscoveryKind = "attraction" | "annual-event" | "scheduled-event" | "recurring-experience";
export type DiscoveryProvider = "texasdefined" | "official-organizer" | "viator" | "ticketmaster" | "tpwd" | "tourism-board" | "venue";
export type EvidencePurpose = "identity" | "location" | "schedule" | "admission" | "booking" | "editorial";
export type DiscoveryReviewStatus = "candidate" | "verified" | "published" | "retired";

export interface DiscoveryEvidence {
  provider: DiscoveryProvider;
  purpose: EvidencePurpose;
  url: string;
  checkedAt: string; // YYYY-MM-DD from a real check, never inferred from build time
  /** Viator/Ticketmaster supplier links alone cannot verify event occurrence. */
  official: boolean;
}

export interface DiscoveryOccurrence {
  startDate: string; // YYYY-MM-DD, local event day
  endDate?: string;
  /** Organizer-confirmed, not inferred from last year's event. */
  sourceUrl: string;
  verifiedAt: string;
  status: "confirmed" | "postponed" | "cancelled";
  /** Optional actual ISO date-times with an explicit venue offset. */
  startsAt?: string;
  endsAt?: string;
}

export interface DiscoveryBookingOffer {
  provider: "viator" | "ticketmaster" | "official-venue" | "other-affiliate";
  providerProductId?: string;
  url: string;
  /** Which canonical experience/event this offers access to, if confirmed. */
  relationship: "admission" | "related-tour" | "nearby-experience";
  affiliate: boolean;
  lastVerifiedAt: string;
}

export interface DiscoveryEntity {
  id: string; // stable TexasDefined-owned ID, not Viator productCode
  kind: DiscoveryKind;
  name: string;
  city: string;
  countySlug?: string;
  canonicalPath?: string; // only an existing, quality-reviewed TexasDefined route
  status: DiscoveryReviewStatus;
  evidence: readonly DiscoveryEvidence[];
  offers: readonly DiscoveryBookingOffer[];
  occurrences?: readonly DiscoveryOccurrence[];
  /** No automatic publication for supplier-derived entities. */
  editorialOriginal: boolean;
  /** Human/authority reviewed; independent of a supplier's star rating. */
  qualityApproved: boolean;
  providerRefs?: Partial<Record<DiscoveryProvider, string>>;
}

export interface SourceCandidate {
  provider: DiscoveryProvider;
  providerId: string;
  name: string;
  city: string;
  countySlug?: string;
}

function normalize(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}
function normalizedCity(value: string) { return normalize(value).replace(/ texas$/, ""); }
function isoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value + "T12:00:00Z");
  return Number.isFinite(d.getTime()) && d.toISOString().slice(0, 10) === value;
}
function trustedHttpUrl(input: string) {
  try { const u = new URL(input); return u.protocol === "https:" && !u.username && !u.password; }
  catch { return false; }
}

/** Distinguish provider duplicates from similar but different public places. */
export function matchSourceCandidate(candidate: SourceCandidate, entities: readonly DiscoveryEntity[]) {
  const byProviderId = entities.filter((item) => item.providerRefs?.[candidate.provider] === candidate.providerId);
  if (byProviderId.length === 1) return { outcome: "matched" as const, entity: byProviderId[0], reason: "provider-id" as const };
  if (byProviderId.length > 1) return { outcome: "review" as const, reason: "duplicate-provider-id" as const };
  const sameNameAndCity = entities.filter((item) =>
    normalize(item.name) === normalize(candidate.name) &&
    normalizedCity(item.city) === normalizedCity(candidate.city));
  if (sameNameAndCity.length === 1) {
    const item = sameNameAndCity[0];
    if (candidate.countySlug && item.countySlug && candidate.countySlug !== item.countySlug) {
      return { outcome: "review" as const, reason: "county-conflict" as const };
    }
    return { outcome: "review" as const, reason: "name-and-city-candidate" as const, suggestedEntity: item };
  }
  return { outcome: "review" as const, reason: sameNameAndCity.length ? "ambiguous-name" as const : "new-candidate" as const };
}

/** Indexability cannot be earned merely by a valid affiliate link. */
export function mayIndexDiscoveryEntity(entity: DiscoveryEntity) {
  if (entity.status !== "published" || !entity.qualityApproved || !entity.editorialOriginal ||
      !entity.canonicalPath?.startsWith("/") || entity.canonicalPath.startsWith("//")) return false;
  if (!entity.evidence.some((e) =>
    (e.official || e.provider === "texasdefined") && e.purpose === "editorial" &&
    isoDate(e.checkedAt) && trustedHttpUrl(e.url))) return false;
  if (entity.kind === "annual-event" || entity.kind === "scheduled-event") {
    return (entity.occurrences ?? []).some((o) =>
      isoDate(o.startDate) && isoDate(o.endDate ?? o.startDate) &&
      (o.endDate ?? o.startDate) >= o.startDate &&
      isoDate(o.verifiedAt) && trustedHttpUrl(o.sourceUrl) &&
      o.status === "confirmed");
  }
  return true;
}

/** Only official schedule evidence can update a recurring event's dates. */
export function reconcileConfirmedOccurrence(
  entity: DiscoveryEntity,
  occurrence: DiscoveryOccurrence,
  evidence: DiscoveryEvidence,
): DiscoveryEntity {
  if (!["annual-event", "scheduled-event"].includes(entity.kind)) throw Error("Not an event");
  if (evidence.purpose !== "schedule" || !evidence.official || evidence.url !== occurrence.sourceUrl ||
      evidence.checkedAt !== occurrence.verifiedAt ||
      !trustedHttpUrl(evidence.url) || !isoDate(evidence.checkedAt) ||
      !isoDate(occurrence.startDate) || !isoDate(occurrence.endDate ?? occurrence.startDate) ||
      (occurrence.endDate ?? occurrence.startDate) < occurrence.startDate) throw Error("Unverified event occurrence");
  const occurrences = (entity.occurrences ?? []).filter((o) => o.startDate !== occurrence.startDate);
  return { ...entity, occurrences: [...occurrences, occurrence].sort((a, b) => a.startDate.localeCompare(b.startDate)), evidence: [...entity.evidence, evidence] };
}

/** One booking supplier may offer many products, but identical products appear once. */
export function deduplicateBookingOffers(offers: readonly DiscoveryBookingOffer[]) {
  const seen = new Set<string>();
  return offers.filter((offer) => {
    if (!trustedHttpUrl(offer.url) || !isoDate(offer.lastVerifiedAt)) return false;
    const key = `${offer.provider}:${offer.providerProductId || offer.url}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
