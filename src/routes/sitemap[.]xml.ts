import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { platform, scope } from "@/data";
import { fetchPublishedTexasDefinedArticles } from "@/data/articles-remote";
import { loadTexasCountyGrowth } from "@/data/census-county-growth";
import { isLegacyCountySeriesArticle } from "@/data/county-series";
import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { canonicalEntityPath, isIndexableEntityPage } from "@/data/knowledge-graph/relationships";
import { COUNTY_PROPERTY_RECORDS } from "@/data/property/county-property-data";
import { isCountyPropertyIndexReady } from "@/data/property/county-property-schema";
import { TEXAS_DATASETS } from "@/data/texas-data-center";
import { INDEXABLE_STATIC_PATHS, isExploreSitemapOwnedPath, isIndexablePublicPath, normalizePublicPath } from "@/lib/public-routes";

const origin = `https://${texasDefinedBrand.identity.domain}`;

type SitemapEntry = { path: string; lastmod?: string };

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const coreResults = await Promise.allSettled([
          platform.articles.list(scope),
          platform.collections.list(scope),
          platform.taxonomy.authors(scope),
          loadTexasKnowledgeGraph(),
          fetchPublishedTexasDefinedArticles({ limit: 200 }),
        ]);

        const failures = coreResults.filter((result) => result.status === "rejected");
        if (failures.length > 0) {
          for (const failure of failures) console.error("Primary sitemap core data unavailable", failure.reason);
          return new Response("Sitemap data temporarily unavailable", {
            status: 503,
            headers: {
              "content-type": "text/plain; charset=utf-8",
              "cache-control": "no-store",
              "retry-after": "300",
            },
          });
        }

        const [articlesResult, collectionsResult, authorsResult, graphResult, remoteArticlesResult] = coreResults;
        const articles = articlesResult.status === "fulfilled" ? articlesResult.value : [];
        const collections = collectionsResult.status === "fulfilled" ? collectionsResult.value : [];
        const authors = authorsResult.status === "fulfilled" ? authorsResult.value : [];
        const graph = graphResult.status === "fulfilled" ? graphResult.value : [];
        const remoteArticles = remoteArticlesResult.status === "fulfilled" ? remoteArticlesResult.value : [];
        const countyGrowth = await loadTexasCountyGrowth();

        const countyPages = COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady);
        const entityPages = graph.filter(isIndexableEntityPage);
        const entries: SitemapEntry[] = [
          ...INDEXABLE_STATIC_PATHS
            .filter((path) => !isExploreSitemapOwnedPath(path))
            .map((path) => ({ path })),
          ...(articles.length ? [{ path: "/news" }] : []),
          ...remoteArticles.map((article) => ({ path: `/news/${article.slug}`, lastmod: toDate(article.publishedAt) })),
          ...(countyGrowth.available ? [{ path: "/texas-data/county-growth", lastmod: "2026-03-17" }] : []),
          ...collections.map((collection) => ({ path: `/shop/${collection.slug}` })),
          ...authors.map((author) => ({ path: `/authors/${author.id}` })),
          ...articles
            .filter((article) => !isLegacyCountySeriesArticle(article.slug))
            .map((article) => ({ path: `/article/${article.slug}`, lastmod: toDate(article.publishedAt) })),
          ...countyPages.map((county) => ({ path: `/property-tax/county/${county.slug}`, lastmod: toDate(county.lastVerifiedAt ?? undefined) })),
          ...entityPages.map((entity) => ({ path: canonicalEntityPath(entity), lastmod: toDate(entity.sourceCheckedAt) })),
          ...TEXAS_DATASETS.map((dataset) => ({
            path: `/texas-data/${dataset.slug}`,
            lastmod: toDate(dataset.updated),
          })),
        ];

        const uniqueEntries = [...new Map(entries
          .map((entry) => {
            const path = normalizePublicPath(entry.path);
            return path ? { ...entry, path } : null;
          })
          .filter((entry): entry is SitemapEntry => Boolean(entry) && isIndexablePublicPath(entry.path))
          .map((entry) => [entry.path, entry])).values()];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueEntries.map(({ path, lastmod }) => `  <url><loc>${escapeXml(`${origin}${path}`)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`).join("\n")}
</urlset>`;

        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});

function toDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
}

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;", "'": "&apos;" })[character] ?? character);
}
