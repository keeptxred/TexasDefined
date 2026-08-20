import { paintedChurchArchivalImagesBySlug } from "./painted-church-archival-images";
import { canonicalPaintedChurchFeaturesBySlug } from "./painted-church-feature-index";
import { canonicalPaintedChurchGalleryBySlug } from "./painted-church-gallery-index";
import { paintedChurchMapPointBySlug } from "./painted-church-map-points";
import { paintedChurchPeople } from "./painted-church-people";
import { canonicalPaintedChurchProfileBySlug } from "./painted-church-profile-index";
import { paintedChurchRegisterRecordBySlug } from "./painted-church-register-evidence";
import { canonicalPaintedChurchResearchBySlug } from "./painted-church-research-index";
import { paintedChurchSourcesForChurch } from "./painted-church-source-registry";
import { paintedChurchVisitorStatusBySlug } from "./painted-church-visitor-status";
import { expandedPaintedChurches } from "./painted-churches-expanded";

export type PaintedChurchReadinessDimension =
  | "profile"
  | "research"
  | "provenance"
  | "visitor"
  | "coordinates"
  | "current-imagery"
  | "archival-evidence"
  | "object-inventory"
  | "people-attribution"
  | "integrity";

export type PaintedChurchReadinessRecord = {
  slug: string;
  name: string;
  readyForIndexing: boolean;
  score: number;
  passed: PaintedChurchReadinessDimension[];
  gaps: { dimension: PaintedChurchReadinessDimension; reason: string }[];
  metrics: {
    sourceCount: number;
    galleryImageCount: number;
    archivalReferenceCount: number;
    featureCount: number;
    peopleCount: number;
    mapPrecision?: string;
  };
};

const REQUIRED: PaintedChurchReadinessDimension[] = [
  "profile",
  "research",
  "provenance",
  "visitor",
  "coordinates",
  "current-imagery",
  "archival-evidence",
  "object-inventory",
  "people-attribution",
  "integrity",
];

export const paintedChurchReadiness: PaintedChurchReadinessRecord[] = expandedPaintedChurches.map((church) => {
  const profile = canonicalPaintedChurchProfileBySlug(church.slug);
  const research = canonicalPaintedChurchResearchBySlug(church.slug);
  const sources = paintedChurchSourcesForChurch(church.slug);
  const visitor = paintedChurchVisitorStatusBySlug.get(church.slug);
  const map = paintedChurchMapPointBySlug.get(church.slug);
  const gallery = canonicalPaintedChurchGalleryBySlug(church.slug);
  const archival = paintedChurchArchivalImagesBySlug(church.slug);
  const features = canonicalPaintedChurchFeaturesBySlug(church.slug);
  const people = paintedChurchPeople.filter((person) => person.churchSlugs.includes(church.slug));
  const passed: PaintedChurchReadinessDimension[] = [];
  const gaps: PaintedChurchReadinessRecord["gaps"] = [];

  const test = (dimension: PaintedChurchReadinessDimension, condition: boolean, reason: string) => {
    if (condition) passed.push(dimension);
    else gaps.push({ dimension, reason });
  };

  test("profile", Boolean(profile && profile.quickAnswer.length >= 120 && profile.history.length && profile.paintings.length && profile.sources.length >= 2), "Needs a substantive canonical profile with history, painting analysis and at least two named sources.");
  test("research", Boolean(research && research.researchSummary.length >= 120 && research.lookFor.length >= 2 && research.interpretation.length && research.sources.length >= 2), "Needs a substantive research dossier with field-reading guidance, interpretation and multiple sources.");
  test("provenance", sources.length >= 4 && sources.some((source) => source.tier === "archive-register" || source.tier === "primary-official"), "Needs at least four deduplicated sources including a primary/register/archive record.");
  test("visitor", Boolean(visitor?.controllingSourceUrl && visitor.checkedAt), "Needs an explicit current visitor/access source; generic fallback is not acceptable.");
  test("coordinates", Boolean(map && map.precision !== "community"), "Needs a sourced exact- or near-property coordinate before public indexing.");
  test("current-imagery", gallery.length > 0 || Boolean(church.image), "Needs at least one exact-subject, rights-cleared current image.");
  test("archival-evidence", archival.length > 0 || Boolean(paintedChurchRegisterRecordBySlug(church.slug)), "Needs an archival image/reference or a formal historic-register evidence record.");
  test("object-inventory", features.length > 0, "Needs at least one object-level interior feature, artwork, furnishing, inscription or preservation feature.");
  test("people-attribution", people.length > 0 || church.interiorIntegrity === "uncertain", "Needs a documented architect/builder/artist/restorer/researcher relationship, or an explicit unresolved-attribution state.");
  test("integrity", Boolean(church.interiorIntegrity), "Needs an explicit interior-integrity classification.");

  return {
    slug: church.slug,
    name: church.name,
    readyForIndexing: gaps.length === 0,
    score: Math.round((passed.length / REQUIRED.length) * 100),
    passed,
    gaps,
    metrics: {
      sourceCount: sources.length,
      galleryImageCount: gallery.length,
      archivalReferenceCount: archival.length,
      featureCount: features.length,
      peopleCount: people.length,
      mapPrecision: map?.precision,
    },
  };
});

export const paintedChurchReadinessSummary = {
  churchCount: paintedChurchReadiness.length,
  readyCount: paintedChurchReadiness.filter((record) => record.readyForIndexing).length,
  blockedCount: paintedChurchReadiness.filter((record) => !record.readyForIndexing).length,
  averageScore: Math.round(paintedChurchReadiness.reduce((sum, record) => sum + record.score, 0) / Math.max(1, paintedChurchReadiness.length)),
};

export function paintedChurchReadinessBySlug(slug: string) {
  return paintedChurchReadiness.find((record) => record.slug === slug);
}
