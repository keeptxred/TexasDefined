import { createServerFn } from "@tanstack/react-start";

export const getFishingReportDirectoryData = createServerFn({ method: "GET" }).handler(async () => {
  const { loadFishingReportDirectoryDataServer } = await import("./report-directory-data.server");
  return loadFishingReportDirectoryDataServer();
});
