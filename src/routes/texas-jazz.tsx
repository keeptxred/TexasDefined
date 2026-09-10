import { createFileRoute } from "@tanstack/react-router";

const routeSeo = {
  canonicalPath: "/texas-jazz",
  title: "Texas Jazz: History, Fort Worth, Houston & Innovators",
  description: "Texas jazz history runs through territory bands, school music programs, dance orchestras and urban scenes that produced innovators such as Teddy Wilson, Arnett Cobb, Charlie Christian and Ornette Coleman.",
} as const;

export const Route = createFileRoute(routeSeo.canonicalPath)({
  loader: async () => {
    const { loadTexasMusicGuideBatch2Route } = await import("@/data/texas-music-route-head");
    return loadTexasMusicGuideBatch2Route("texas-jazz", routeSeo);
  },
  head: ({ loaderData }) => loaderData.head,
});
