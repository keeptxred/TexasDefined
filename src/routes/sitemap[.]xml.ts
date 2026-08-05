import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { platform, scope } from "@/data";
import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { canonicalEntityPath } from "@/data/knowledge-graph/relationships";
import { INDEXABLE_STATIC_PATHS, isIndexablePublicPath } from "@/lib/public-routes";

const origin = `https://${texasDefinedBrand.identity.domain}`;

type SitemapEntry = { path: string; lastmod?: string };

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const [articles, destinations, collections, categories, graph] = await Promise.all([
          platform.articles.list(scope),
          platform.destinations.list(scope),
          platform.collections.list(scope),
          platform.taxonomy.categories(scope),
          loadTexasKnowledgeGraph(),
        ]);

        const entries: SitemapEntry[] = [
          ...INDEXABLE_STATIC_PATHS.map((path) => ({ path })),
          ...categories.map((category) => ({ path: `/explore/${category.slug}` })),
          ...collections.map((collection) => ({ path: `/shop/${collection.slug}` })),
          ...articles.map((article) => ({ path: `/article/${article.slug}`, lastmod: toDate(article.publishedAt) })),
          ...destinations.map((destination) => ({ path: `/destination/${destination.slug}` })),
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
