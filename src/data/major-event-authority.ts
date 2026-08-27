import { createServerFn } from "@tanstack/react-start";

const getMajorEventAuthorityServerFn = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { getMajorEventAuthorityServer } = await import("./major-event-authority.server");
    return getMajorEventAuthorityServer(data.slug);
  });

export function getMajorEventAuthority(slug: string) {
  return getMajorEventAuthorityServerFn({ data: { slug } });
}
