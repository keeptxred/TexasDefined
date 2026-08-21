import { articleInternalLinks } from "../article-internal-links";

const cemeteryGuide = {
  href: "/article/texas-military-cemeteries-memorials-guide",
  label: "Texas military cemeteries & memorials",
  description: "Connect military history with Fort Sam Houston, Houston and Dallas–Fort Worth national cemeteries, grave-location tools and respectful remembrance guidance.",
};

const fortSamHouston = {
  href: "/destination/fort-sam-houston-national-cemetery",
  label: "Fort Sam Houston National Cemetery",
  description: "Visit San Antonio's interwar national cemetery beside the Fort Sam Houston military landscape.",
};

const houstonCemetery = {
  href: "/destination/houston-national-cemetery",
  label: "Houston National Cemetery",
  description: "See the VA-designed 1965 memorial landscape and its distinctive hemicycle and carillon.",
};

const dfwCemetery = {
  href: "/destination/dallas-fort-worth-national-cemetery",
  label: "Dallas–Fort Worth National Cemetery",
  description: "Understand the modern VA national cemetery serving North Texas since 2000.",
};

const additionsBySlug: Record<string, Array<{ href: string; label: string; description: string }>> = {
  "texas-military-history-timeline": [cemeteryGuide],
  "texas-medal-of-honor-heroes": [fortSamHouston, houstonCemetery, dfwCemetery, cemeteryGuide],
  "women-in-texas-military-history": [cemeteryGuide],
  "buffalo-soldiers-texas-frontier-guide": [cemeteryGuide],
  "texas-national-guard-history": [fortSamHouston, cemeteryGuide],
  "san-antonio-military-aviation-history": [fortSamHouston, cemeteryGuide],
  "texas-world-war-ii-bases-pow-camps": [fortSamHouston, houstonCemetery, cemeteryGuide],
  "texas-cold-war-military-history": [houstonCemetery, cemeteryGuide],
  "texas-recent-wars-military-history": [dfwCemetery, cemeteryGuide],
  "texas-military-museums-historic-sites-guide": [cemeteryGuide],
};

for (const [slug, additions] of Object.entries(additionsBySlug)) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = [
    ...existing,
    ...additions.filter((addition) => !existing.some((link) => link.href === addition.href)),
  ];
}
