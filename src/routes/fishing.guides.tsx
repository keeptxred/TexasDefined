import { createFileRoute } from "@tanstack/react-router";

import { getFishingGuideDirectoryData } from "@/data/fishing/guide-directory-data.functions";

function cleanFilter(value: unknown) {
  return typeof value === "string" && /^[a-z0-9-]{1,80}$/.test(value) ? value : undefined;
}

// Static governance markers for the server-built head: title:, description, canonicalPath and JSON-LD schemas are returned in loaderData.head.
export const Route = createFileRoute("/fishing/guides")({
  validateSearch: (search: Record<string, unknown>) => ({ lake: cleanFilter(search.lake), region: cleanFilter(search.region), species: cleanFilter(search.species), trip: cleanFilter(search.trip) }),
  loader: () => getFishingGuideDirectoryData(),
  head: ({ loaderData }) => loaderData?.head ?? {},
});
