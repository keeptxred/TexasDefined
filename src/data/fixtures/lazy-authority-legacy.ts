import type { Article } from "../types";

const FOOD_CULTURE_SLUGS = new Set([
  "texas-food-beyond-brisket-guide",
  "live-2026-06-29-the-history-behind-the-texas-stock-tank-name-bxkvg7",
  "texas-dance-hall-survival",
  "friday-night-and-the-texas-town",
]);

const TRAVEL_SLUGS = new Set([
  "bluebonnet-season-field-guide",
  "big-bend-in-winter",
  "palo-duro-lighthouse-walk",
  "hill-country-two-lane-loop",
]);

const LIFE_SLUGS = new Set([
  "moving-to-houston-address-checklist",
  "texas-native-garden-that-survives-august",
]);

const INTERNAL_LINK_REPLACEMENTS = new Map([
  ["/article/texas-kolache-klobasnek-history", "/article/kolache-or-klobasnek-texas-story"],
  ["/article/texas-painted-churches-guide", "/explore/painted-churches"],
  ["/texas-life/sports", "/sports"],
  ["/texas-life/home-garden", "/home-garden"],
]);

export const legacyAuthoritySlugs = new Set([
  ...FOOD_CULTURE_SLUGS,
  ...TRAVEL_SLUGS,
  ...LIFE_SLUGS,
]);

function canonicalizeAuthorityInternalLinks(article: Article): Article {
  if (!article.internalLinks?.length) return article;
  return {
    ...article,
    internalLinks: article.internalLinks.map((link) => ({
      ...link,
      href: INTERNAL_LINK_REPLACEMENTS.get(link.href) ?? link.href,
    })),
  };
}

function wordsInAuthorityBlock(block: Article["body"][number]): number {
  const text = block.type === "list"
    ? block.items.join(" ")
    : "text" in block
      ? block.text
      : "";
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function finalizeAuthorityArticle(article: Article): Article {
  const canonicalArticle = canonicalizeAuthorityInternalLinks(article);
  const wordCount = canonicalArticle.body.reduce(
    (total, block) => total + wordsInAuthorityBlock(block),
    0,
  );

  return {
    ...canonicalArticle,
    readingMinutes: wordCount > 0
      ? Math.max(1, Math.ceil(wordCount / 220))
      : canonicalArticle.readingMinutes,
  };
}

async function loadBaseArticle(slug: string): Promise<Article | null> {
  if (slug === "texas-food-beyond-brisket-guide") {
    const { exploreFeatureArticles } = await import("./explore-feature-articles");
    return exploreFeatureArticles.find((article) => article.slug === slug) ?? null;
  }

  if (slug === "moving-to-houston-address-checklist") {
    const { relocationEvergreenDepth2Articles } = await import("./relocation-evergreen-depth-2");
    return relocationEvergreenDepth2Articles.find((article) => article.slug === slug) ?? null;
  }

  if (slug === "live-2026-06-29-the-history-behind-the-texas-stock-tank-name-bxkvg7") {
    const { stockTankNameDepthArticle } = await import("./stock-tank-name-depth");
    return stockTankNameDepthArticle;
  }

  if (slug === "texas-dance-hall-survival") {
    const { texasDanceHallPreservationArticle } = await import("./texas-dance-hall-preservation");
    return texasDanceHallPreservationArticle;
  }

  const { texasCoreDepthArticles } = await import("./texas-core-depth");
  return texasCoreDepthArticles.find((article) => article.slug === slug) ?? null;
}

export async function loadLegacyAuthorityArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !legacyAuthoritySlugs.has(slug)) return null;

  const article = await loadBaseArticle(slug);
  if (!article) return null;

  if (FOOD_CULTURE_SLUGS.has(slug)) {
    const { enrichLegacyFoodCultureArticle } = await import("./authority-legacy-food-culture");
    return finalizeAuthorityArticle(enrichLegacyFoodCultureArticle(article));
  }

  if (TRAVEL_SLUGS.has(slug)) {
    const { enrichLegacyTravelArticle } = await import("./authority-legacy-travel");
    return finalizeAuthorityArticle(enrichLegacyTravelArticle(article));
  }

  const { enrichLegacyLifeArticle } = await import("./authority-legacy-life");
  return finalizeAuthorityArticle(enrichLegacyLifeArticle(article));
}
