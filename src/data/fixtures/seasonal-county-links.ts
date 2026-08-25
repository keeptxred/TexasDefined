import { articleInternalLinks } from "../article-internal-links";
import { countySeasonalLinksBySlug, legacyCountyArticleSlugByCountySlug } from "../county-seasonal-links";

for (const [countySlug, articleSlug] of Object.entries(legacyCountyArticleSlugByCountySlug)) {
  const links = countySeasonalLinksBySlug[countySlug] ?? [];
  const existing = articleInternalLinks[articleSlug] ?? [];
  articleInternalLinks[articleSlug] = [
    ...existing,
    ...links.filter((addition) => !existing.some((link) => link.href === addition.href)),
  ];
}
