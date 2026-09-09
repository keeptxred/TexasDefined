import { createFileRoute } from "@tanstack/react-router";

// Static governance marker for the server-built head: canonicalPath, title: and description are returned in loaderData.head for both the hub and breed pages.
export const Route = createFileRoute("/dogs/{-$breed}")({
  loader: ({ params }) => import("@/data/texas-dogs.functions").then((m) => m.loadDogsPage(params.breed)),
  head: ({ loaderData }) => loaderData?.head ?? {},
});
