import type { SearchDocument } from "@/data/types";
import { HUNTING_AUTHORITY_TOPICS } from "./authority";

export function buildHuntingSearchDocuments(): SearchDocument[] {
  const topics = Object.values(HUNTING_AUTHORITY_TOPICS).map((topic) => ({
    id: `hunting:${topic.slug}`,
    brandId: "texasdefined" as const,
    kind: "guide" as const,
    title: topic.title,
    summary: topic.description,
    keywords: [...new Set([topic.eyebrow, ...topic.about, "Texas hunting", "TPWD", "public hunting", "hunting regulations"])],
    href: `/hunting/${topic.slug}`,
  }));

  return [
    {
      id: "hunting:hub",
      brandId: "texasdefined",
      kind: "guide",
      title: "Texas Hunting Guide — Public Land, Licenses, Seasons & Species",
      summary: "Texas hunting hub for public land, WMAs, licenses, hunter education, APH, drawn hunts, species planning and current TPWD regulation verification.",
      keywords: ["Texas hunting", "public hunting Texas", "Texas WMAs", "Texas hunting license", "Texas deer season", "Texas dove hunting", "Annual Public Hunting Permit", "hunter education"],
      href: "/hunting",
    },
    ...topics,
  ];
}
