import { createFileRoute } from "@tanstack/react-router";

import { getFishingTechniqueDirectoryData } from "@/data/fishing/technique-data.functions";

type TechniqueSearch = { category?: string; species?: string; season?: string };

export const Route = createFileRoute("/fishing/techniques")({
  validateSearch: (search: Record<string, unknown>): TechniqueSearch => ({
    category: slug(search.category),
    species: slug(search.species),
    season: slug(search.season),
  }),
  loader: () => getFishingTechniqueDirectoryData(),
  head: ({ loaderData }) => loaderData?.head ?? {},
});

function slug(value: unknown) { return typeof value === "string" && /^[a-z0-9-]+$/.test(value) ? value : undefined; }
