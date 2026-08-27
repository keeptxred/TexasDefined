import { createFileRoute } from "@tanstack/react-router";

import { getExploreCategoryAuthorityHtmlServer } from "@/data/explore-category-authority.server";
import type { CategorySlug } from "@/data/types";

const ALLOWED = new Set<CategorySlug>(["outdoors", "caverns"]);

export const Route = createFileRoute("/api/public/explore-category-authority")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const category = new URL(request.url).searchParams.get("category") as CategorySlug | null;
        if (!category || !ALLOWED.has(category)) {
          return new Response("Not found", { status: 404, headers: { "cache-control": "public, max-age=300" } });
        }
        const html = getExploreCategoryAuthorityHtmlServer(category);
        if (!html) {
          return new Response("Not found", { status: 404, headers: { "cache-control": "public, max-age=300" } });
        }
        return new Response(html, {
          status: 200,
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "public, max-age=300, s-maxage=86400, stale-while-revalidate=604800",
            "x-content-type-options": "nosniff",
          },
        });
      },
    },
  },
});
