import type { Article, CategorySlug, ImageRef } from "../types";

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
  if (spec.picks.length < 6 || spec.sources.length < 1) {
    throw new Error(`Incomplete high-intent authority guide: ${spec.slug}`);
  }
  return {
    id: `texas-high-intent-${spec.number}`,
    brandId: "texasdefined",
    slug: spec.slug,
    title: spec.title,
    dek: spec.dek,
    category: spec.category,
    hero: spec.hero,
    authorId: "a-dell",
    publishedAt: "2026-10-12",
    updatedAt: "2026-10-12",
    readingMinutes: 10,
    tags: spec.tags,
    body: [
      { type: "paragraph", text: spec.introduction },
      { type: "heading", text: "How we chose these destinations" },
      { type: "paragraph", text: spec.method },
      ...spec.picks.flatMap((pick) => [
        { type: "heading" as const, text: pick.title },
        { type: "paragraph" as const, text: pick.advice },
      ]),
      { type: "heading", text: "Plan the trip before you go" },
      { type: "paragraph", text: spec.logistics },
      { type: "heading", text: "What this guide cannot guarantee" },
      { type: "paragraph", text: spec.caveats },
      { type: "heading", text: "Choose for your trip, not somebody else's ranking" },
      { type: "paragraph", text: spec.conclusion },
    ],
    internalLinks: spec.links,
    relatedCollections: [],
    relatedDestinations: [],
    sources: spec.sources,
    sourceName: spec.sources[0].label,
    sourceUrl: spec.sources[0].url,
  };
}
