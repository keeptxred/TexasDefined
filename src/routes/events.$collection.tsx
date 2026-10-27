import { createFileRoute, notFound } from "@tanstack/react-router";

import { getEventCollectionPage } from "@/data/event-collection-page";

export const Route = createFileRoute("/events/$collection")({
  loader: async ({ params }) => {
    const page = await getEventCollectionPage(params.collection);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => loaderData?.page.head ?? {},
});
