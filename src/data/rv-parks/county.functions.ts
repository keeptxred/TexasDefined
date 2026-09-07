import { createServerFn } from "@tanstack/react-start";

export const loadCountyRvParks = createServerFn({ method: "GET" })
  .inputValidator((data: { countySlug: string }) => data)
  .handler(async ({ data }) => {
    const registry = await import("./registry.server");
    return registry.loadRvParksForCountyServer(data.countySlug).slice(0, 12);
  });
