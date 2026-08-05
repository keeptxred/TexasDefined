import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { platform, scope } from "@/data";
import { fetchExploreDestinations } from "@/data/explore-remote";
import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { canonicalEntityPath } from "@/data/knowledge-graph/relationships";
import { TEXAS_DATASETS } from "@/data/texas-data-center";
import { INDEXABLE_STATIC_PATHS, isIndexablePublicPath } from "@/lib/public-routes";

const origin = `https://${texasDefinedBrand.identity.domain}`;

type SitemapEntry = { path: string; lastmod?: string };

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const [articles, fixtureDestinations, collections, categories, graph] = await Promise.all([
          platform.articles.list(scope),
          platform.destinations.list(scope),
          platform.collections.list(scope),
          platform.taxonomy.categories(scope),
          loadTexasKnowledgeGraph(),
        ]);

        let remoteDestinations = [] as Awaited<ReturnType<typeof fetchExploreDestinations>>;
        try {
          remoteDestinations = await fetchExploreDestinations({ limit: 5000 });
        } catch (error) {
          console.error("Primary sitemap could not load the remote Explore catalog; using fixture destinations", error);
        }

        const destinations = remoteDestinations.length ? remoteDestinations : fixtureDestinations;
        const entries: SitemapEntry[] = [
          ...INDEXABLE_STATIC_PATHS.map((path) => ({ path })),
          ...categories.map((category) => ({ path: `/explore/${category.slug}` })),
          ...collections.map((collection) => ({ path: `/shop/${collection.slug}` })),
          ...articles.map((article) => ({ path: `/article/${article.slug}`, lastmod: toDate(article.publishedAt) })),
          ...destinations.filter((destination) => destination.slug).map((destination) => ({ path: `/destination/${destination.slug}` })),
          ...TEXAS_DATASETS.map((dataset) => ({
            path: `/texas-data/${dataset.slug}`,
            lastmod: toDate(dataset.updated),
          })),
          ...graph
            .filter((entity) => entity.status === "active" || entity.status === "seasonal")
            .map((entity) => ({ path: canonicalEntityPath(entity), lastmod: toDate(entity.sourceCheckedAt) })),
        ];

        const uniqueEntries = [...new Map(entries
          .filter(({ path }) => isIndexablePublicPath(path))
          .map((entry) => [entry.path, entry])).values()];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueEntries.map(({ path, lastmod }) => `  <url><loc>${escapeXml(`${origin}${path}`)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`).join("\n")}
</urlset>`;

        return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
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
