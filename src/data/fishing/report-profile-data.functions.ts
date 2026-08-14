import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getFishingReportProfileData = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120) }))
  .handler(async ({ data }) => {
    const { loadFishingReportProfileDataServer } = await import("./report-profile-data.server");
    return loadFishingReportProfileDataServer(data.slug);
  });
