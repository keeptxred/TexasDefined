import { createFileRoute } from "@tanstack/react-router";

const DEFAULT_COMMERCE_API = "https://keeptxred.com";

// Last known-good upstream payload per query, kept in memory so a temporary
// upstream outage doesn't swap the live catalog for the local fixture list.
const lastGood = new Map<string, string>();

export const Route = createFileRoute("/api/public/store-products")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const incoming = new URL(request.url);
        const base = (process.env["COMMERCE_API_BASE_URL"] || DEFAULT_COMMERCE_API).replace(/\/$/, "");
        const target = new URL("/api/public/store-products", base);
        for (const [key, value] of incoming.searchParams) {
          if (["site", "collection", "limit", "id"].includes(key)) target.searchParams.set(key, value);
        }
        if (!target.searchParams.get("site")) target.searchParams.set("site", "texasdefined");
        const cacheKey = target.searchParams.toString();

        const fallback = (error: string) => {
          const cached = lastGood.get(cacheKey);
          if (cached) {
            return new Response(cached, {
              status: 200,
              headers: { "content-type": "application/json", "cache-control": "no-store", "x-catalog-source": "stale-cache" },
            });
          }
          return new Response(JSON.stringify({ ok: false, error }), {
            status: 200,
            headers: { "content-type": "application/json", "cache-control": "no-store" },
          });
        };

        try {
          const upstream = await fetch(target, {
            headers: { accept: "application/json" },
            signal: AbortSignal.timeout(8000),
          });
          const body = await upstream.text();
          if (!upstream.ok || !body.includes('"ok":true')) {
            return fallback(`Upstream storefront error (${upstream.status})`);
          }
          lastGood.set(cacheKey, body);
          return new Response(body, {
            status: 200,
            headers: { "content-type": "application/json", "cache-control": "public, max-age=60, s-maxage=300" },
          });
        } catch (error) {
          return fallback(error instanceof Error ? error.message : "Upstream unavailable");
        }
      },
    },
  },
});
