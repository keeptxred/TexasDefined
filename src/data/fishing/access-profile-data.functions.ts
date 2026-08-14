import { createServerFn } from "@tanstack/react-start";

export const getFishingAccessProfileData = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadFishingAccessProfileDataServer } = await import("./access-profile-data.server");
    return loadFishingAccessProfileDataServer(data.slug);
  });
