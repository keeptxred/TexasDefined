import { createFileRoute } from "@tanstack/react-router";

const routeSeo = {
  canonicalPath: "/texas-rock-rockabilly",
  title: "Texas Rock & Rockabilly: Buddy Holly, Orbison & Roots",
  description: "Texas helped shape rock through blues, western swing, R&B and rockabilly, then produced artists and scenes from Lubbock to Port Arthur and Austin whose influence reached far beyond the state.",
} as const;

export const Route = createFileRoute(routeSeo.canonicalPath)({
  loader: async () => {
    const { loadTexasMusicGuideBatch2Route } = await import("@/data/texas-music-route-head");
    return loadTexasMusicGuideBatch2Route("texas-rock-rockabilly", routeSeo);
  },
  head: ({ loaderData }) => loaderData.head,
});
