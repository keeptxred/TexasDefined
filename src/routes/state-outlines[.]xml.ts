import { createFileRoute } from "@tanstack/react-router";

const STATE_SPRITE_URL =
  "https://cdn.jsdelivr.net/gh/coryetzkorn/state-svg-defs@5e5141e6117c793abf1892d0e4c8a4ebb76b032a/state-svg-defs.svg";

export const Route = createFileRoute("/state-outlines.xml")({
  server: {
    handlers: {
      GET: async () => {
        const response = await fetch(STATE_SPRITE_URL, {
          headers: { Accept: "image/svg+xml" },
        });

        if (!response.ok) {
          return new Response("State outline artwork unavailable", {
            status: 502,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          });
        }

        return new Response(response.body, {
          headers: {
            "Content-Type": "image/svg+xml; charset=utf-8",
            "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
          },
        });
      },
    },
  },
});
