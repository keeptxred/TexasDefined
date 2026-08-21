import { createServerFn } from "@tanstack/react-start";
import type { Article } from "@/data/types";

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

// County-series editorial slugs use a reserved legacy shape. Keep the parser
// lightweight in the browser while the authoritative completion registry stays
// server-only with the actual county profile loaders.
export function countySlugForLegacyArticle(articleSlug: string) {
  const markerIndex = articleSlug.indexOf("-county-");
  if (markerIndex <= 0 || !articleSlug.endsWith("-texas")) return null;
  return articleSlug.slice(0, markerIndex);
}

export function isLegacyCountySeriesArticle(articleSlug: string) {
  return countySlugForLegacyArticle(articleSlug) !== null;
}
