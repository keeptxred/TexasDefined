import { createServerFn } from "@tanstack/react-start";

export const getFishingGuideProfileData = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadFishingGuideProfileDataServer } = await import("./guide-profile-data.server");
    return loadFishingGuideProfileDataServer(data.slug);
  });
