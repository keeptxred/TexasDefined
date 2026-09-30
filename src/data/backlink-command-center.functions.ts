import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getBacklinkCommandCenter = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessKey: z.string().min(20).max(200) }))
  .handler(async ({ data }) => {
    const { loadBacklinkCommandCenter } = await import("@/data/backlink-command-center.server");
    return loadBacklinkCommandCenter(data.accessKey);
  });
