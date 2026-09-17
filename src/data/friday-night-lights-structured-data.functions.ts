import { createServerFn } from "@tanstack/react-start";

export const getFridayNightLightsStructuredData = createServerFn({ method: "GET" }).handler(async () => {
  const { loadFridayNightLightsStructuredDataServer } = await import("./friday-night-lights-structured-data.server");
  return loadFridayNightLightsStructuredDataServer();
});
