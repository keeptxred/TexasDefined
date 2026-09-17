import type { SearchDocument } from "@/data/types";
import { HUNTING_AUTHORITY_TOPICS } from "./authority";
import { HUNTING_AUTHORITY_TOPICS_V2 } from "./authority-v2";

export function buildHuntingSearchDocuments(): SearchDocument[] {
  const allTopics = { ...HUNTING_AUTHORITY_TOPICS, ...HUNTING_AUTHORITY_TOPICS_V2 };
  const topics = Object.values(allTopics).map((topic) => ({
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
      keywords: ["Texas hunting", "public hunting Texas", "Texas WMAs", "Texas hunting license", "Texas deer season", "Texas dove hunting", "Annual Public Hunting Permit", "hunter education", "Texas squirrel hunting", "Texas migratory game birds", "Texas trapping regulations"],
      href: "/hunting",
    },
    ...topics,
  ];
}