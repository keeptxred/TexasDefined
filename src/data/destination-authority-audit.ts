import { auditDestination } from "./destination-audit";
import { isPrimaryTripPlannerDestination } from "./destination-availability";
import type { Destination, VisitorFacilityFact } from "./types";

export type AuthorityIssueCode =
  | "editorial-quality" | "parking-unverified" | "restrooms-unverified"
  | "operator-map-unverified" | "visitor-context-missing"
  | "primary-citation-missing" | "accessibility-unverified" | "county-unverified"
  | "image-license-unverified" | "facility-review-expired" | "facility-source-unverified"
  | "revisit-overdue" | "explore-publication-blocked";

export interface AttractionAuthorityIssue {
  code: AuthorityIssueCode;
  reason: string;
  priority: "critical" | "high" | "medium";
}
export interface AttractionAuthorityResult {
  slug: string;
  name: string;
  category: string;
  status: "authority-ready" | "needs-remediation" | "excluded-from-explore";
  indexedReady: boolean;
  score: number;
  nextReviewDays: number;
  issues: AttractionAuthorityIssue[];
}

const DAY = 86400000;
/**
 * Visitor logistics age faster than history. This is an editorial recheck policy,
 * not a claim that running a URL check independently proves a fact remains true.
 */
export function attractionReviewCadenceDays(destination: Destination): number {
  return ["major-springs", "beaches-coast", "caverns", "national-parks", "state-parks", "rv-parks"].includes(destination.category) ? 30 : 90;
}

function fresh(checkedAt: string | undefined, maxDays: number, now: Date) {
  if (!checkedAt) return false;
  const checked = Date.parse(checkedAt);
  const age = now.getTime() - checked;
  return Number.isFinite(checked) && age >= 0 && age <= maxDays * DAY;
}
function validUrl(url: string | undefined) { return Boolean(url && /^https:\/\//i.test(url)); }
function sourceVerified(fact: VisitorFacilityFact | undefined, now: Date, cadence: number): boolean {
  return Boolean(fact && (fact.status === "verified" || fact.status === "not-available")
    && validUrl(fact.sourceUrl) && fresh(fact.checkedAt, cadence, now)
    && fact.details.trim().length >= 25);
}

export function auditAttractionAuthority(destination: Destination, now = new Date()): AttractionAuthorityResult {
  const issues: AttractionAuthorityIssue[] = [];
  const add = (code: AuthorityIssueCode, reason: string, priority: AttractionAuthorityIssue["priority"]) => issues.push({ code, reason, priority });
  const base = auditDestination(destination);
  const cadence = attractionReviewCadenceDays(destination);
  const facilities = destination.visitorFacilities;

  if (!base.readyForIndexing) add("editorial-quality", "Canonical SEO readiness failed: " + base.issues.map(issue => issue.code).join(", "), "critical");
  // Evaluate evidence only for facts an editor has determined are meaningful
  // visitor questions for this particular place. Do not penalize a museum
  // because a universal bathroom or parking checklist was left empty.
  const selectedTopics = new Set(facilities?.editorialFocus ?? []);
  if (selectedTopics.has("parking") && !sourceVerified(facilities?.parking, now, cadence))
    add("parking-unverified", "Parking/arrival is a visitor priority here, but the specific instruction needs current operator evidence.", "high");
  if (selectedTopics.has("restrooms") && !sourceVerified(facilities?.restrooms, now, cadence))
    add("restrooms-unverified", "Restroom/amenity availability materially affects this visit and needs operator verification.", "high");
  if (selectedTopics.has("map")) {
    if (!validUrl(facilities?.officialMapUrl))
      add("operator-map-unverified", "A map is material to this specific itinerary, but no official visitor map URL is verified.", "high");
    else if (!fresh(facilities?.mapCheckedAt, 365, now))
      add("facility-review-expired", "The selected facility map needs a fresh review.", "medium");
  }

  // Judge editorial depth by what the page actually teaches, not by requiring
  // identical FAQ counts or exactly three itineraries for each type of place.
  // Do not force a fixed word or itinerary count on unrelated place types.
  // Unresearchable generic filler is a problem, but short, useful material is
  // not cured merely by adding more words.
  const narrative = [destination.summary, ...destination.body].join(" ").toLowerCase();
  if (/those details make it easier to decide whether this stop fits|works best as part of a trip built around the surrounding region|is a texas destination/.test(narrative))
    add("visitor-context-missing", "Generic filler remains in the visitor narrative; replace it with useful, source-backed facts chosen for this specific location.", "high");
  if (destination.authorityGuide && !destination.authorityGuide.sources.some(source => validUrl(source.url)))
    add("primary-citation-missing", "Existing authority claims need supporting primary/institutional citations.", "high");

  // Accessible entrances, elevators and gallery circulation are key visitor
  // decisions at indoor exhibition venues. Other venues need individually
  // selected mobility and terrain advice, not boilerplate accessibility claims.
  const isExhibitionVenue = /museum|aquarium|science center|art gallery|exhibition hall|planetarium/i.test(destination.name);
  if (isExhibitionVenue && (!destination.accessibilityNotes || destination.accessibilityNotes.trim().length < 45))
    add("accessibility-unverified", "Confirm wheelchair entrances, elevator/lift access, gallery circulation and relevant limitations for this exhibition venue.", "high");
  if (!destination.county || destination.county.trim().length < 3) add("county-unverified", "County association is needed for reciprocal links and regional geography.", "medium");
  if (!destination.hero.credit || !/(CC |public domain|U\.S\. government|copyright|licensed|rights|courtesy|NPS|TPWD)/i.test(destination.hero.credit)) add("image-license-unverified", "The specific hero image needs a traceable reuse-rights basis; image origin alone is not proof of license.", "high");
  if (!fresh(destination.sourceCheckedAt, cadence, now)) add("revisit-overdue", "Current visitor facts need an editorial review based on subject volatility; do not reset dates without checking.", "medium");
  if (!isPrimaryTripPlannerDestination(destination) || !base.readyForIndexing) add("explore-publication-blocked", "Not a currently visitable, primary, SEO-ready public Explore listing.", "critical");

  const indexedReady = base.readyForIndexing && isPrimaryTripPlannerDestination(destination);
  const score = Math.max(0, 100 - issues.reduce((n, issue) => n + (issue.priority === "critical" ? 18 : issue.priority === "high" ? 10 : 5), 0));
  const status = !isPrimaryTripPlannerDestination(destination)
    ? "excluded-from-explore"
    : issues.length ? "needs-remediation" : "authority-ready";
  return { slug: destination.slug, name: destination.name, category: destination.category, status, indexedReady, score, nextReviewDays: cadence, issues };
}

export function auditAttractionAuthorityCatalog(destinations: Destination[], now = new Date()) {
  const unique = [...new Map(destinations.map(destination => [destination.slug, destination])).values()];
  const rows = unique.map(destination => auditAttractionAuthority(destination, now));
  const issueCounts = rows.flatMap(row => row.issues.map(issue => issue.code)).reduce<Record<string, number>>((counts, code) => {
    counts[code] = (counts[code] ?? 0) + 1;
    return counts;
  }, {});
  return {
    catalogRecords: rows.length,
    indexedReady: rows.filter(row => row.indexedReady).length,
    authorityReady: rows.filter(row => row.status === "authority-ready").length,
    needsRemediation: rows.filter(row => row.status === "needs-remediation").length,
    excludedFromExplore: rows.filter(row => row.status === "excluded-from-explore").length,
    issueCounts,
    rows: rows.sort((a, b) => b.issues.length - a.issues.length || a.slug.localeCompare(b.slug)),
  };
}
