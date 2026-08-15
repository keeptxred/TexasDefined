import { createServerFn } from "@tanstack/react-start";

export const getFishingTechniqueDirectoryData = createServerFn({ method: "GET" }).handler(async () => {
  const { loadFishingTechniqueDirectoryServer } = await import("./technique-data.server");
  return loadFishingTechniqueDirectoryServer();
});

export const getFishingTechniqueProfileData = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadFishingTechniqueProfileServer } = await import("./technique-data.server");
    return loadFishingTechniqueProfileServer(data.slug);
  });
