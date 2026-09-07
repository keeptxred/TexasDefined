import { createServerFn } from "@tanstack/react-start";

const loadCountyDiscovery = createServerFn({ method: "GET" })
  .inputValidator((data: { countySlug: string }) => data)
  .handler(async ({ data }) => {
    const [{ loadCountyMajorEventsServer }, rvRegistry] = await Promise.all([
      import("./county-major-events.server"),
      import("./rv-parks/registry.server"),
    ]);

    return {
      majorEvents: loadCountyMajorEventsServer(data.countySlug),
      rvParks: rvRegistry.loadRvParksForCountyServer(data.countySlug).slice(0, 12),
    };
  });

export function getCountyDiscovery(countySlug: string) {
  return loadCountyDiscovery({ data: { countySlug } });
}

export async function getCountyMajorEvents(countySlug: string) {
  return (await getCountyDiscovery(countySlug)).majorEvents;
}
