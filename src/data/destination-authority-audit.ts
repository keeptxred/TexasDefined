import { auditDestination } from "./destination-audit";
import { isPrimaryTripPlannerDestination } from "./destination-availability";
import type { Destination, VisitorFacilityFact } from "./types";

export type AuthorityIssueCode =
  | "editorial-quality" | "parking-unverified" | "restrooms-unverified"
  | "operator-map-unverified" | "visitor-context-missing" | "itineraries-missing"
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
  if (!sourceVerified(facilities?.parking, now, cadence)) add("parking-unverified", "Parking or vehicle access lacks a current, source-backed facility assertion; do not assume parking is available or free.", "high");
  if (!sourceVerified(facilities?.restrooms, now, cadence)) add("restrooms-unverified", "Restroom location, availability or absence has not been verified with the operator.", "high");
  if (!validUrl(facilities?.officialMapUrl)) add("operator-map-unverified", "A pin map exists, but the official on-site facility/trail map has not been verified.", "high");
  if (facilities?.officialMapUrl && !fresh(facilities.mapCheckedAt, 365, now)) add("facility-review-expired", "Operator map source requires confirmation that the link and content remain current.", "medium");
  if (!destination.authorityGuide?.whyItMatters || destination.authorityGuide.whyItMatters.length < 110) add("visitor-context-missing", "No substantive significance or interpretation section meeting the authority assessment contract.", "high");
  if ((destination.authorityGuide?.itineraries?.length ?? 0) !== 3) add("itineraries-missing", "Needs distinct short, half-day and extended visit plans appropriate to the destination.", "medium");
  if (!destination.authorityGuide?.sources?.some(source => validUrl(source.url))) add("primary-citation-missing", "Authority guide has no source-backed research record in addition to its official visitor URL.", "high");
  if (!destination.accessibilityNotes || destination.accessibilityNotes.trim().length < 45) add("accessibility-unverified", "Specific accessible access, limits or contact instructions need review.", "high");
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
