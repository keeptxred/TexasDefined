import { createFileRoute } from "@tanstack/react-router";

const routeSeo = {
  canonicalPath: "/texas-country-outlaw",
  title: "Texas Country & Outlaw Country: History & Austin Roots",
  description: "Texas country music grew through fiddle traditions, radio, dance halls, honky-tonks and songwriting communities before Austin's 1970s progressive and outlaw movement gave artists a new way to work outside Nashville convention.",
} as const;

export const Route = createFileRoute("/texas-country-outlaw")({
  loader: async () => {
    const { loadTexasMusicGuideBatch2Route } = await import("@/data/texas-music-route-head");
    return loadTexasMusicGuideBatch2Route("texas-country-outlaw", routeSeo);
  },
  head: ({ loaderData }) => loaderData.head,
});
