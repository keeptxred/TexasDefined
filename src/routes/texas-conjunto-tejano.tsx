import { createFileRoute } from "@tanstack/react-router";

const routeSeo = {
  canonicalPath: "/texas-conjunto-tejano",
  title: "Texas Conjunto & Tejano: History, San Antonio & Border Sound",
  description: "Conjunto and Tejano music grew from South Texas and border communities where Mexican traditions met accordion technology, dance-hall culture, radio, country, polka and later popular styles.",
} as const;

export const Route = createFileRoute("/texas-conjunto-tejano")({
  loader: async () => {
    const { loadTexasMusicGuideBatch1Route } = await import("@/data/texas-music-route-head");
    return loadTexasMusicGuideBatch1Route("texas-conjunto-tejano", routeSeo);
  },
  head: ({ loaderData }) => loaderData.head,
});
