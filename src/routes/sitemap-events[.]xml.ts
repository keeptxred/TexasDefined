import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";

const origin = `https://${texasDefinedBrand.identity.domain}`;

type SitemapEntry = { path: string; lastmod?: string };

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function toDate(value?: string) {
  if (!value) return undefined;
  const match = value.match(/^\d{4}-\d{2}-\d{2}/);
  return match?.[0];
}

export const Route = createFileRoute("/sitemap-events.xml")({
  server: {
    handlers: {
      GET: async () => {
        const {
          majorEventIndexRecords,
          hasCompliantMajorEventImageServer,
          loadSupplementalMajorEventSitemapEntriesServer,
          loadEvergreenEventSitemapEntriesServer,
          loadTemporalEventSitemapEntriesServer,
          isEvergreenEventCollectionPath,
          INDEXABLE_STATIC_PATHS,
          isIndexablePublicPath,
          normalizePublicPath,
        } = await import("@/data/sitemap-dependencies.server");

        const major: SitemapEntry[] = majorEventIndexRecords
          .filter((event) => hasCompliantMajorEventImageServer(event.slug))
          .map((event) => ({ path: `/event/${event.slug}`, lastmod: toDate(event.sourceCheckedAt) }));
        const supplemental = loadSupplementalMajorEventSitemapEntriesServer().filter((entry) => {
          const slug = entry.path.match(/^\/event\/([^/?#]+)/)?.[1];
          return slug ? hasCompliantMajorEventImageServer(slug) : true;
        });
        const evergreen = loadEvergreenEventSitemapEntriesServer();
        const temporal = loadTemporalEventSitemapEntriesServer();
        const hubs: SitemapEntry[] = INDEXABLE_STATIC_PATHS
          .filter((path) => isEvergreenEventCollectionPath(path))
          .map((path) => ({ path }));

        const entries = [...major, ...supplemental, ...evergreen, ...temporal, ...hubs];
        const unique = [...new Map(entries.map((entry) => {
          const path = normalizePublicPath(entry.path);
          return path ? [path, { ...entry, path }] as const : null;
        }).filter((entry): entry is readonly [string, SitemapEntry] => Boolean(entry) && isIndexablePublicPath(entry[1].path))).values()];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique.map((entry) => `  <url><loc>${escapeXml(`${origin}${entry.path}`)}</loc>${entry.lastmod ? `<lastmod>${escapeXml(entry.lastmod)}</lastmod>` : ""}</url>`).join("\n")}\n</urlset>\n`;

        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});
