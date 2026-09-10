import { createFileRoute } from "@tanstack/react-router";

const routeSeo = {
  canonicalPath: "/texas-blues",
  title: "Texas Blues: History, East Texas Roots & Houston Sound",
  description: "Texas blues grew from overlapping Black folk, work-song, church and string traditions and developed distinctive regional lineages that later shaped electric blues, rhythm and blues and rock-and-roll.",
} as const;

export const Route = createFileRoute("/texas-blues")({
  loader: async () => {
    const { loadTexasMusicGuideBatch1Route } = await import("@/data/texas-music-route-head");
    return loadTexasMusicGuideBatch1Route("texas-blues", routeSeo);
  },
  head: ({ loaderData }) => loaderData.head,
});
