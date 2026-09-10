import { createFileRoute } from "@tanstack/react-router";

const routeSeo = {
  canonicalPath: "/texas-hip-hop",
  title: "Texas Hip-Hop: Houston Rap, DJ Screw, Geto Boys & UGK",
  description: "Texas hip-hop built national influence through Houston's independent labels and neighborhood scenes, DJ Screw's slowed-down tape culture, Port Arthur's UGK and a distinct Gulf Coast approach to rap production and identity.",
} as const;

export const Route = createFileRoute(routeSeo.canonicalPath)({
  loader: async () => {
    const { loadTexasMusicGuideBatch2Route } = await import("@/data/texas-music-route-head");
    return loadTexasMusicGuideBatch2Route("texas-hip-hop", routeSeo);
  },
  head: ({ loaderData }) => loaderData.head,
});
