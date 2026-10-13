import type { Article, CategorySlug, ImageRef } from "../types";
import { guideEvidenceFor } from "./texas-high-intent-authority-evidence";
import { texasGuidePickEvidence } from "./texas-high-intent-pick-evidence";

/** Source-backed editorial decision guides. Comparisons are trip-fit judgments, not unverified universal rankings. */
export interface HighIntentGuideSpec {
  number: number;
  slug: string;
  title: string;
  dek: string;
  category: CategorySlug;
  hero: ImageRef;
  tags: string[];
  introduction: string;
  method: string;
  picks: { title: string; advice: string }[];
  logistics: string;
  caveats: string;
  conclusion: string;
  links: { href: string; label: string }[];
  sources: { label: string; url: string }[];
}
export function highIntentImage(src: string, alt: string): ImageRef {
  return { src, alt, width: 1600, height: 1067 };
}
export function makeHighIntentGuide(spec: HighIntentGuideSpec): Article {
  const evidence = guideEvidenceFor(spec.number);
  if (!evidence || spec.picks.length < 10 || spec.sources.length < 2
      || evidence.facts.length < 3 || evidence.photos.length < 3
      || evidence.relevantDestinationSlugs.length < 3
      || evidence.photos.some((photo) => !photo.image.credit || !photo.licenseUrl)
      || evidence.facts.some((fact) => !fact.sourceUrl.startsWith("https://") || !fact.verifiedAt)) {
    throw new Error(`Authority package incomplete: ${spec.slug}`);
  }
  return {
    id: `texas-high-intent-${spec.number}`,
    brandId: "texasdefined",
    slug: spec.slug,
    title: spec.title,
    dek: spec.dek,
    category: spec.category,
    hero: evidence.photos[0].image,
    authorId: "a-dell",
    publishedAt: "2026-10-12",
    updatedAt: "2026-10-12",
    readingMinutes: 13,
    tags: spec.tags,
    body: [
      { type: "paragraph", text: spec.introduction },
      { type: "heading", text: "How we chose these destinations" },
      { type: "paragraph", text: spec.method },
      ...spec.picks.flatMap((pick) => [
        { type: "heading" as const, text: pick.title },
        { type: "paragraph" as const, text: pick.advice },
      ]),
      { type: "heading", text: "Photography of the places in this guide" },
      ...evidence.photos.slice(1).map((photo) => ({ type: "image" as const, image: photo.image, caption: `Subject: ${photo.exactSubject}. Photo credit: ${photo.image.credit}. Reuse license: ${photo.licenseUrl}. Source record: ${photo.status === "governed-local" ? "TexasDefined governed state-park photo registry" : photo.sourceUrl}.` })),
      { type: "heading", text: "Plan the trip before you go" },
      { type: "paragraph", text: spec.logistics },
      { type: "heading", text: "What this guide cannot guarantee" },
      { type: "paragraph", text: spec.caveats },
      { type: "heading", text: "Choose for your trip, not somebody else's ranking" },
      { type: "paragraph", text: spec.conclusion },
    ],
    internalLinks: spec.links,
    relatedCollections: [],
    relatedDestinations: evidence.relevantDestinationSlugs,
    sources: [...spec.sources, ...evidence.facts.map((fact) => ({ label: fact.label, url: fact.sourceUrl })), ...(texasGuidePickEvidence[spec.number] ?? []).map((item) => ({ label: item.title + " — TPWD lake-specific fishing guide", url: item.officialUrl }))].filter((source, index, list) => list.findIndex((item) => item.url === source.url) === index),
    sourceName: evidence.facts[0].label,
    sourceUrl: evidence.facts[0].sourceUrl,
  };
}
