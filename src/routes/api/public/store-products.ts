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
          // Never propagate an upstream 5xx as our own 500 — that surfaces as a
          // runtime/blank-screen error. Report it as a handled { ok: false } payload
          // so the client can quietly use its fallback catalog.
          const ok = upstream.ok;
          return new Response(
            ok ? body : JSON.stringify({ ok: false, error: `Upstream storefront error (${upstream.status})`, upstream: body.slice(0, 500) }),
            {
              status: 200,
              headers: {
                "content-type": "application/json",
                "cache-control": ok ? "public, max-age=60, s-maxage=300" : "no-store",
              },
            },
          );
        } catch (error) {
          return new Response(
            JSON.stringify({ ok: false, error: error instanceof Error ? error.message : "Upstream unavailable" }),
            { status: 200, headers: { "content-type": "application/json", "cache-control": "no-store" } },
          );
        }
      },
    },
  },
});
