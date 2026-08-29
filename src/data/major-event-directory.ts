import { createServerFn } from "@tanstack/react-start";

export const getMajorEventGuideDirectory = createServerFn({ method: "GET" }).handler(async () => {
  const { loadMajorEventGuideDirectoryServer } = await import("./major-event-directory.server");
  return loadMajorEventGuideDirectoryServer();
});
