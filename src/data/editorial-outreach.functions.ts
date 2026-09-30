import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getEditorialOutreachDashboard = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessKey: z.string().min(20).max(200) }))
  .handler(async ({ data }) => {
    const { loadEditorialOutreachDashboard } = await import("@/data/editorial-outreach.server");
    return loadEditorialOutreachDashboard(data.accessKey);
  });
