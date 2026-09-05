import { createServerFn } from "@tanstack/react-start";

const loadMajorEventPage = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadMajorEventPageServer } = await import("./major-event-page.server");
    return loadMajorEventPageServer(data.slug);
  });

export function getMajorEventAuthority(slug: string) {
  return loadMajorEventPage({ data: { slug } });
}
