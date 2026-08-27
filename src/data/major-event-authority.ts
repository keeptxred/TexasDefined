import { createServerFn } from "@tanstack/react-start";
import { loadMajorEventPageServer } from "./major-event-page.server";

const loadMajorEventPage = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => loadMajorEventPageServer(data.slug));

export function getMajorEventAuthority(slug: string) {
  return loadMajorEventPage({ data: { slug } });
}
