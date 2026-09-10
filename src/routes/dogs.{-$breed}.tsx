import { createFileRoute } from "@tanstack/react-router";

import { loadDogsPage } from "@/data/texas-dogs.functions";

// Static governance marker for the server-built head: canonicalPath, title: and description are returned in loaderData.head for both the hub and breed pages.
export const Route = createFileRoute("/dogs/{-$breed}")({
  loader: ({ params }) => loadDogsPage(params.breed),
  head: ({ loaderData }) => loaderData?.head ?? {},
});
