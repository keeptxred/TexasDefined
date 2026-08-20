import { canonicalPaintedChurchArchivalImagesBySlug } from "./painted-church-archival-image-index";
import { canonicalPaintedChurchContributors } from "./painted-church-contributor-index";
import { canonicalPaintedChurchFeaturesBySlug } from "./painted-church-feature-index";
import { canonicalPaintedChurchGalleryBySlug } from "./painted-church-gallery-index";
import { paintedChurchMapPointBySlug } from "./painted-church-map-points";
import { canonicalPaintedChurchProfileBySlug } from "./painted-church-profile-index";
import { canonicalPaintedChurchResearchBySlug } from "./painted-church-research-index";
import { paintedChurchSymbols } from "./painted-church-symbols";
import { paintedChurchVisitorStatusBySlug } from "./painted-church-visitor-status";
import { expandedPaintedChurches } from "./painted-churches-expanded";

export type PaintedChurchReadinessDimension = {
  id: string;
  label: string;
  complete: boolean;
  requiredForIndexLaunch: boolean;
  detail: string;
};

export type PaintedChurchReadinessRecord = {
  slug: string;
  name: string;
  city: string;
  requiredComplete: boolean;
  score: number;
  dimensions: PaintedChurchReadinessDimension[];
};

export const paintedChurchReadiness: PaintedChurchReadinessRecord[] = expandedPaintedChurches.map((church) => {
  const profile = canonicalPaintedChurchProfileBySlug(church.slug);
  const research = canonicalPaintedChurchResearchBySlug(church.slug);
  const gallery = canonicalPaintedChurchGalleryBySlug(church.slug);
  const archives = canonicalPaintedChurchArchivalImagesBySlug(church.slug);
  const mapPoint = paintedChurchMapPointBySlug.get(church.slug);
  const visitor = paintedChurchVisitorStatusBySlug.get(church.slug);
  const features = canonicalPaintedChurchFeaturesBySlug(church.slug);
  const contributors = canonicalPaintedChurchContributors.filter((item) => item.churchSlugs.includes(church.slug));
  const symbols = paintedChurchSymbols.filter((item) => item.churchSlugs.includes(church.slug));
  const sourceCount = new Set([
    church.sourceUrl,
    church.secondarySourceUrl,
    ...(profile?.sources.map((item) => item.url) ?? []),
    ...(research?.sources.map((item) => item.url) ?? []),
    ...features.map((item) => item.sourceUrl),
  ].filter((value): value is string => Boolean(value))).size;

  const dimensions: PaintedChurchReadinessDimension[] = [
    { id: "canonical-profile", label: "Canonical narrative profile", complete: Boolean(profile), requiredForIndexLaunch: true, detail: profile ? "Canonical profile resolves." : "No canonical profile resolves." },
    { id: "research-dossier", label: "Research dossier", complete: Boolean(research), requiredForIndexLaunch: true, detail: research ? "Church-specific research dossier resolves." : "No church-specific research dossier resolves." },
    { id: "source-density", label: "Multi-source provenance", complete: sourceCount >= 2, requiredForIndexLaunch: true, detail: `${sourceCount} distinct church/profile/research/feature source URLs.` },
    { id: "visitor-control", label: "Explicit visitor-status research", complete: Boolean(visitor), requiredForIndexLaunch: true, detail: visitor ? `${visitor.status}; evidence scope ${visitor.evidenceScope}.` : "No explicit visitor-status record." },
    { id: "map", label: "Mapped location", complete: Boolean(mapPoint), requiredForIndexLaunch: true, detail: mapPoint ? `${mapPoint.precision} coordinate from ${mapPoint.sourceLabel}.` : "No sourced map point." },
    { id: "map-exact", label: "Exact-property coordinate", complete: mapPoint?.precision === "exact-property", requiredForIndexLaunch: false, detail: mapPoint?.precision === "exact-property" ? "Exact-property coordinate documented." : `Best current precision: ${mapPoint?.precision ?? "none"}.` },
    { id: "object-inventory", label: "Object-level interior feature inventory", complete: features.length > 0, requiredForIndexLaunch: true, detail: `${features.length} documented interior feature record${features.length === 1 ? "" : "s"}.` },
    { id: "reusable-imagery", label: "Rights-cleared current photography", complete: gallery.length > 0 || Boolean(church.image), requiredForIndexLaunch: true, detail: `${gallery.length} canonical gallery image${gallery.length === 1 ? "" : "s"}${church.image ? "; canonical hero available" : ""}.` },
    { id: "archival-evidence", label: "Archival visual evidence", complete: archives.length > 0, requiredForIndexLaunch: false, detail: `${archives.length} archival/reference image record${archives.length === 1 ? "" : "s"}.` },
    { id: "contributors", label: "Contributor / authorship graph", complete: contributors.length > 0, requiredForIndexLaunch: false, detail: `${contributors.length} documented contributor entit${contributors.length === 1 ? "y" : "ies"}.` },
    { id: "techniques", label: "Documented decorative technique", complete: church.techniques.length > 0, requiredForIndexLaunch: false, detail: church.techniques.length ? church.techniques.join(", ") : "Technique attribution remains unresolved." },
    { id: "symbols", label: "Documented iconography", complete: symbols.length > 0, requiredForIndexLaunch: false, detail: `${symbols.length} symbol relationship${symbols.length === 1 ? "" : "s"}.` },
    { id: "integrity", label: "Interior integrity resolved", complete: church.interiorIntegrity !== "uncertain", requiredForIndexLaunch: false, detail: church.interiorIntegrity.replaceAll("-", " ") },
    { id: "fieldwork", label: "Original Texas Defined fieldwork", complete: false, requiredForIndexLaunch: false, detail: "Reserved for a future documented Texas Defined visit/interview/photo survey. Never auto-completed from secondary research." },
  ];
  const required = dimensions.filter((item) => item.requiredForIndexLaunch);
  const score = Math.round((dimensions.filter((item) => item.complete).length / dimensions.length) * 100);
  return { slug: church.slug, name: church.name, city: church.city, requiredComplete: required.every((item) => item.complete), score, dimensions };
});

export const paintedChurchIndexLaunchReady = paintedChurchReadiness.every((record) => record.requiredComplete);
export const paintedChurchLaunchBlockers = paintedChurchReadiness.filter((record) => !record.requiredComplete);
export const paintedChurchAuthorityStretchQueue = paintedChurchReadiness.filter((record) => record.dimensions.some((item) => !item.requiredForIndexLaunch && !item.complete));
