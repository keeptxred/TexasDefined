import { createFileRoute } from "@tanstack/react-router";

import { getLargemouthBassPageData } from "@/data/fishing/largemouth-bass-page-data.functions";

// Static governance marker for the server-built head: canonicalPath, title: and description are returned in loaderData.head.
export const Route = createFileRoute("/fishing/species/largemouth-bass")({
  loader: () => getLargemouthBassPageData(),
  head: ({ loaderData }) => loaderData?.head ?? {},
});
