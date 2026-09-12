import { createFileRoute, notFound } from "@tanstack/react-router";

// Static governance marker for the loader-built head: canonicalPath, title: and description are returned in loaderData.head for both the hub and breed pages.
export const Route = createFileRoute("/dogs/{-$breed}")({
  loader: async ({ params }) => {
    const { getDogBreedPage, getDogHubData } = await import("@/data/texas-dogs.data");
    const data = params.breed ? await getDogBreedPage(params.breed) : await getDogHubData();
    if (params.breed && !data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
});
