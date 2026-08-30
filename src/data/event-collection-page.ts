import { createServerFn } from "@tanstack/react-start";

const loadEventCollectionPage = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadEventCollectionPageServer } = await import("./event-collection-page.server");
    return loadEventCollectionPageServer(data.slug);
  });

export function getEventCollectionPage(slug: string) {
  return loadEventCollectionPage({ data: { slug } });
}
