import { createServerFn } from "@tanstack/react-start";

const loadMajorEventPage = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadMajorEventPageExtendedServer } = await import("./major-event-page-extended.server");
    return loadMajorEventPageExtendedServer(data.slug);
  });

export function getMajorEventAuthority(slug: string) {
  return loadMajorEventPage({ data: { slug } });
}
