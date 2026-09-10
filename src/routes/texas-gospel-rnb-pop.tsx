import { createFileRoute } from "@tanstack/react-router";

const routeSeo = {
  canonicalPath: "/texas-gospel-rnb-pop",
  title: "Texas Gospel, R&B & Pop: Church Roots, Houston Soul & Global Stars",
  description: "Texas gospel, R&B and pop connect church training, Houston soul, Fort Worth gospel, San Antonio crossover music and globally influential artists such as Beyoncé and Selena Gomez.",
} as const;

export const Route = createFileRoute("/texas-gospel-rnb-pop")({
  loader: async () => {
    const { loadTexasMusicGuideBatch3Route } = await import("@/data/texas-music-route-head");
    return loadTexasMusicGuideBatch3Route("texas-gospel-rnb-pop", routeSeo);
  },
  head: ({ loaderData }) => loaderData.head,
});
