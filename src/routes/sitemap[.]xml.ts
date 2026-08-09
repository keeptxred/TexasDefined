import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { platform, scope } from "@/data";
import { supplementalExploreCategories } from "@/data/explore-categories";
import { fetchCoreExploreDestinations } from "@/data/explore-core-remote";
import { fetchExploreDestinations } from "@/data/explore-remote";
import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { canonicalEntityPath } from "@/data/knowledge-graph/relationships";
import { TEXAS_DATASETS } from "@/data/texas-data-center";
import { INDEXABLE_STATIC_PATHS, isIndexablePublicPath, normalizePublicPath } from "@/lib/public-routes";

const origin = `https://${texasDefinedBrand.identity.domain}`;

type SitemapEntry = { path: string; lastmod?: string };

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const coreResults = await Promise.allSettled([
          platform.articles.list(scope),
          platform.destinations.list(scope),
          platform.collections.list(scope),
          platform.taxonomy.categories(scope),
          platform.taxonomy.regions(scope),
          loadTexasKnowledgeGraph(),
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

        const [articlesResult, fixtureDestinationsResult, collectionsResult, categoriesResult, regionsResult, graphResult] = coreResults;
        const articles = articlesResult.status === "fulfilled" ? articlesResult.value : [];
        const fixtureDestinations = fixtureDestinationsResult.status === "fulfilled" ? fixtureDestinationsResult.value : [];
        const collections = collectionsResult.status === "fulfilled" ? collectionsResult.value : [];
        const baseCategories = categoriesResult.status === "fulfilled" ? categoriesResult.value : [];
        const regions = regionsResult.status === "fulfilled" ? regionsResult.value : [];
        const graph = graphResult.status === "fulfilled" ? graphResult.value : [];

        const categoryMap = new Map(baseCategories.map((category) => [category.slug, category]));
        for (const category of supplementalExploreCategories) {
          if (!categoryMap.has(category.slug)) categoryMap.set(category.slug, category);
        }
        const categories = [...categoryMap.values()];

        let remoteDestinations = [] as Awaited<ReturnType<typeof fetchExploreDestinations>>;
        try {
          remoteDestinations = await fetchExploreDestinations({ limit: 5000 });
        } catch (error) {
          console.error("Primary sitemap enrichment unavailable; retrying core remote catalog", error);
          try {
            remoteDestinations = await fetchCoreExploreDestinations({ limit: 5000 });
          } catch (coreError) {
            console.error("Primary sitemap core remote catalog unavailable; using outage fixtures", coreError);
          }
        }

        const destinations = remoteDestinations.length ? remoteDestinations : fixtureDestinations;
        const entries: SitemapEntry[] = [
          ...INDEXABLE_STATIC_PATHS.map((path) => ({ path })),
          ...categories.map((category) => ({ path: `/explore/${category.slug}` })),
          ...regions.map((region) => ({ path: `/explore/region/${region.id}` })),
          ...collections.map((collection) => ({ path: `/shop/${collection.slug}` })),
          ...articles.map((article) => ({ path: `/article/${article.slug}`, lastmod: toDate(article.publishedAt) })),
          ...destinations
            .filter((destination) => destination.slug)
            .map((destination) => ({ path: `/destination/${destination.slug}`, lastmod: toDate(destination.sourceCheckedAt) })),
          ...TEXAS_DATASETS.map((dataset) => ({
            path: `/texas-data/${dataset.slug}`,
            lastmod: toDate(dataset.updated),
          })),
          ...graph
            .filter((entity) => entity.status === "active" || entity.status === "seasonal")
            .map((entity) => ({ path: canonicalEntityPath(entity), lastmod: toDate(entity.sourceCheckedAt) })),
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
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[character] ?? character);
}