import { createServerFn } from "@tanstack/react-start";

const loadCityMajorEvents = createServerFn({ method: "GET" })
  .inputValidator((data: { city: string }) => data)
  .handler(async ({ data }) => {
    const { loadCityMajorEventsServer } = await import("./city-major-events.server");
    return loadCityMajorEventsServer(data.city);
  });

export function getCityMajorEvents(city: string) {
  return loadCityMajorEvents({ data: { city } });
}
