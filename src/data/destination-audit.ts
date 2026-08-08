import { isDestinationPhotoPlaceholder } from "./explore-hero-reconciliation";
import type { Destination } from "./types";

export type DestinationAuditIssue = {
  code: string;
  severity: "error" | "warning";
  message: string;
};

export type DestinationAuditResult = {
  slug: string;
  score: number;
  readyForIndexing: boolean;
  issues: DestinationAuditIssue[];
};

const GENERIC_BEST_SEASON = "check current conditions before visiting";
const GENERIC_ENTRY = "confirm current hours, fees, reservations, and access with the official source";
const GENERATED_COPY_MARKERS = [
  " is a texas destination",
  "those details make it easier to decide whether this stop fits a quick outing",
  "works best as part of a trip built around the surrounding region",
  "use the official visitor-information link on this page for the latest details",
];

function validCoordinates(destination: Destination) {
  const { lat, lng } = destination.coordinates;
  return Number.isFinite(lat) && Number.isFinite(lng) && lat >= 25 && lat <= 37 && lng >= -107 && lng <= -93;
}

function usefulUrl(value?: string) {
  return Boolean(value && /^https?:\/\//i.test(value));
}

function containsGeneratedFallbackCopy(summary: string, bodyText: string) {
  const combined = `${summary} ${bodyText}`.toLowerCase();
  return GENERATED_COPY_MARKERS.some((marker) => combined.includes(marker));
}

export function auditDestination(destination: Destination): DestinationAuditResult {
  const issues: DestinationAuditIssue[] = [];
  const summary = destination.summary.trim();
  const bodyText = destination.body.join(" ").trim();
  const uniqueBody = new Set(destination.body.map((item) => item.trim()).filter(Boolean));

  if (!destination.name.trim() || !destination.slug.trim()) {
    issues.push({ code: "identity", severity: "error", message: "Destination is missing a usable name or slug." });
  }
  if (summary.length < 90) {
    issues.push({ code: "summary-thin", severity: "error", message: "Summary is too thin to work well as search and card copy." });
  } else if (summary.length > 320) {
    issues.push({ code: "summary-long", severity: "warning", message: "Summary is unusually long for metadata and card surfaces." });
  }
  if (destination.body.length < 3 || bodyText.length < 450 || uniqueBody.size < 3) {
    issues.push({ code: "body-thin", severity: "error", message: "Destination needs at least three genuinely substantive, non-duplicate editorial paragraphs." });
  }
  if (containsGeneratedFallbackCopy(summary, bodyText)) {
    issues.push({ code: "generic-fallback-copy", severity: "error", message: "Destination still depends on generated fallback boilerplate and must be hand-curated before indexing." });
  }
  if (destination.highlights.filter(Boolean).length < 3) {
    issues.push({ code: "highlights-thin", severity: "warning", message: "Destination needs at least three useful visit highlights." });
  }
  if (isDestinationPhotoPlaceholder(destination.hero.src)) {
    issues.push({ code: "hero-placeholder", severity: "error", message: "Destination still uses a placeholder hero image." });
  }
  if (!destination.hero.alt || destination.hero.alt.trim().length < 20) {
    issues.push({ code: "hero-alt", severity: "warning", message: "Hero image needs descriptive alt text." });
  }
  if (!validCoordinates(destination)) {
    issues.push({ code: "coordinates", severity: "error", message: "Destination coordinates are missing or outside the expected Texas area." });
  }
  if (!destination.nearestTown || destination.nearestTown.trim().toLowerCase() === "texas") {
    issues.push({ code: "nearest-town", severity: "warning", message: "Destination lacks a useful nearest-town value." });
  }
  if (!usefulUrl(destination.officialUrl)) {
    issues.push({ code: "official-source", severity: "warning", message: "Destination lacks an official visitor-information source." });
  }
  if (!destination.bestSeason || destination.bestSeason.trim().toLowerCase() === GENERIC_BEST_SEASON) {
    issues.push({ code: "best-season", severity: "warning", message: "Destination still has generic seasonal guidance." });
  }
  if (!destination.entryNote || destination.entryNote.trim().toLowerCase().startsWith(GENERIC_ENTRY)) {
    issues.push({ code: "entry-note", severity: "warning", message: "Destination still has generic arrival, fee or reservation guidance." });
  }

  const errors = issues.filter((issue) => issue.severity === "error").length;
  const warnings = issues.length - errors;
  const score = Math.max(0, 100 - errors * 18 - warnings * 6);
  return { slug: destination.slug, score, readyForIndexing: errors === 0 && score >= 76, issues };
}

export function isSeoReadyDestination(destination: Destination): boolean {
  return auditDestination(destination).readyForIndexing;
}

export function filterSeoReadyDestinations(destinations: Destination[]): Destination[] {
  return destinations.filter(isSeoReadyDestination);
}

export function auditDestinationCatalog(destinations: Destination[]) {
  const results = destinations.map(auditDestination);
  return {
    total: results.length,
    ready: results.filter((result) => result.readyForIndexing).length,
    notReady: results.filter((result) => !result.readyForIndexing).length,
    results: results.sort((left, right) => left.score - right.score || left.slug.localeCompare(right.slug)),
  };
}
