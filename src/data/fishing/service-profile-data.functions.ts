import { createServerFn } from "@tanstack/react-start";

export const getFishingServiceProfileData = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadFishingServiceProfileDataServer } = await import("./service-profile-data.server");
    return loadFishingServiceProfileDataServer(data.slug);
  });
