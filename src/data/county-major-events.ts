import { createServerFn } from "@tanstack/react-start";

const loadCountyMajorEvents = createServerFn({ method: "GET" })
  .inputValidator((data: { countySlug: string }) => data)
  .handler(async ({ data }) => {
    const [{ loadCountyMajorEventsServer }, { loadCountyRvCampingServer }] = await Promise.all([
      import("./county-major-events.server"),
      import("./county-rv-camping.server"),
    ]);
    return {
      majorEvents: loadCountyMajorEventsServer(data.countySlug),
      rvCamping: loadCountyRvCampingServer(data.countySlug),
    };
  });

export function getCountyMajorEvents(countySlug: string) {
  return loadCountyMajorEvents({ data: { countySlug } });
}
