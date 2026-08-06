import { createFileRoute } from "@tanstack/react-router";

const DEFAULT_COMMERCE_API = "https://keeptxred.com";

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

        try {
          const upstream = await fetch(target, {
            headers: { accept: "application/json" },
            signal: AbortSignal.timeout(8000),
          });
          const body = await upstream.text();
          return new Response(body, {
            status: upstream.status,
            headers: {
              "content-type": "application/json",
              "cache-control": "public, max-age=60, s-maxage=300",
            },
          });
        } catch (error) {
          return new Response(
            JSON.stringify({ ok: false, error: error instanceof Error ? error.message : "Upstream unavailable" }),
            { status: 502, headers: { "content-type": "application/json" } },
          );
        }
      },
    },
  },
});
