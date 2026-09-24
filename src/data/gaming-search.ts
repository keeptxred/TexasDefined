import type { SearchDocument } from "./types";
import { GAMING_PAGES } from "./gaming";

const HUB_KEYWORDS = [
  "Texas gaming",
  "Texas esports",
  "video game companies in Texas",
  "game studios in Texas",
  "gaming jobs Texas",
  "Dallas gaming",
  "Austin gaming",
  "online gaming Texas",
] as const;

export function buildGamingSearchDocuments(): SearchDocument[] {
  const hub: SearchDocument = {
    id: "collection:gaming",
    brandId: "texasdefined",
    kind: "collection",
    title: "Gaming & Esports in Texas",
    summary: "Texas game development, studios, esports, college programs, careers, events, internet infrastructure and online-gaming latency.",
    keywords: [...HUB_KEYWORDS],
    href: "/gaming",
  };
  const pages = GAMING_PAGES.map<SearchDocument>((page) => ({
    id: `gaming:${page.slug}`,
    brandId: "texasdefined",
    kind: "guide",
    title: page.title,
    summary: page.description,
    keywords: [...new Set([page.shortTitle, page.eyebrow, ...page.sections.map((section) => section.title)])],
    href: `/gaming/${page.slug}`,
  }));
  return [hub, ...pages];
}
