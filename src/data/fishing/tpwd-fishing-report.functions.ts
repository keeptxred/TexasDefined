import { createServerFn } from "@tanstack/react-start";

export const getLatestTpwdFishingReport = createServerFn({ method: "GET" })
  .inputValidator((data: { sourceUrl: string }) => ({ sourceUrl: String(data.sourceUrl ?? "").trim() }))
  .handler(async ({ data }) => {
    const { loadLatestTpwdFishingReport } = await import("./tpwd-fishing-report.server");
    return loadLatestTpwdFishingReport(data.sourceUrl);
  });
