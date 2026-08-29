import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";

const BASE_URL = `https://${texasDefinedBrand.identity.domain}`;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const Route = createFileRoute("/sitemap-texas-icons.xml")({
  server: {
    handlers: {
      GET: async () => {
        const [
          { loadTexasIconsServer },
          { applyTexasIconEditorialHoldSummary },
          { applyTexasIconRosterCorrection },
        ] = await Promise.all([
          import("@/data/texas-icons.server"),
          import("@/data/texas-icons-editorial-holds.server"),
          import("@/data/texas-icons-roster-corrections.server"),
        ]);

        const data = await loadTexasIconsServer();
        const present = (icon: (typeof data.icons)[number]) =>
          applyTexasIconEditorialHoldSummary(applyTexasIconRosterCorrection(icon));
        const paths = [...new Set(
          data.icons
            .map(present)
            .filter((icon) => icon.indexableAtOwnRoute && icon.href === `/texas-icons/${icon.slug}`)
            .map((icon) => icon.href),
        )].sort();

        if (!paths.length) {
          return new Response("Texas Icons sitemap has no publishable narrative profiles.", {
            status: 503,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          });
        }

        const entries = paths
          .map((path) => `  <url>\n    <loc>${escapeXml(`${BASE_URL}${path}`)}</loc>\n  </url>`)
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});
