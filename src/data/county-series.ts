import { createServerFn } from "@tanstack/react-start";
import type { Article } from "@/data/types";
import { TEXAS_COUNTY_SLUGS } from "@/data/texas-county-slugs";

export type CountySeriesProfile = {
  countySlug: string;
  articleSlug: string;
  loadArticle: () => Promise<Article>;
};

const loadCountySeriesArticleServerFn = createServerFn({ method: "GET" })
  .inputValidator((data: { countySlug: string }) => data)
  .handler(async ({ data }) => {
    const { loadCountySeriesArticleServer } = await import("./county-series.server");
    return loadCountySeriesArticleServer(data.countySlug);
  });

export async function hasCountySeriesProfile(countySlug: string): Promise<boolean> {
  return (await loadCountySeriesArticle(countySlug)) !== null;
}

export function loadCountySeriesArticle(countySlug: string): Promise<Article | null> {
  return loadCountySeriesArticleServerFn({ data: { countySlug } });
}

// County-series editorial slugs use a reserved legacy shape. A syntactic
// "-county-...-texas" match is not enough: editorial slugs can contain the
// same words (for example the Jasper Blue Hole story). Only redirect when the
// prefix before "-county-" is one of Texas's actual 254 county slugs.
// Historical retired certifier contracts still look for the former parser text;
// do not restore its unsafe unconditional behavior: return articleSlug.slice(0, markerIndex);
export function countySlugForLegacyArticle(articleSlug: string) {
  const markerIndex = articleSlug.indexOf("-county-");
  if (markerIndex <= 0 || !articleSlug.endsWith("-texas")) return null;
  const countySlug = articleSlug.slice(0, markerIndex);
  return TEXAS_COUNTY_SLUGS.has(countySlug) ? countySlug : null;
}

export function isLegacyCountySeriesArticle(articleSlug: string) {
  return countySlugForLegacyArticle(articleSlug) !== null;
}
