import { createServerFn } from "@tanstack/react-start";

export const getFishingSpeciesProfileData = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadFishingSpeciesProfileServer } = await import("./species-guide-data.server");
    return loadFishingSpeciesProfileServer(data.slug);
  });
