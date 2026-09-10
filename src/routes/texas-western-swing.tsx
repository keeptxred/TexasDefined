import { createFileRoute } from "@tanstack/react-router";

const routeSeo = {
  canonicalPath: "/texas-western-swing",
  title: "Texas Western Swing: History, Bob Wills & Dance Hall Sound",
  description: "Western swing formed in Texas as fiddle music, blues, jazz, pop standards and amplified instruments met on crowded dance floors, creating a band style built for motion, improvisation and regional radio.",
} as const;

export const Route = createFileRoute("/texas-western-swing")({
  loader: async () => {
    const { loadTexasMusicGuideBatch1Route } = await import("@/data/texas-music-route-head");
    return loadTexasMusicGuideBatch1Route("texas-western-swing", routeSeo);
  },
  head: ({ loaderData }) => loaderData.head,
});
