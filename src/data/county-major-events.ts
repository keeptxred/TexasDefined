import { createServerFn } from "@tanstack/react-start";

const loadCountyMajorEvents = createServerFn({ method: "GET" })
  .inputValidator((data: { countySlug: string }) => data)
  .handler(async ({ data }) => {
    const { loadCountyMajorEventsServer } = await import("./county-major-events.server");
    const { loadCountyRvCampingServer } = await import("./county-rv-camping.server");
    return {
      majorEvents: loadCountyMajorEventsServer(data.countySlug),
      rvCamping: loadCountyRvCampingServer(data.countySlug),
    };
  });

export function getCountyMajorEvents(countySlug: string) {
  return loadCountyMajorEvents({ data: { countySlug } });
}
