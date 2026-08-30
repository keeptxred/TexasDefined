import { createServerFn } from "@tanstack/react-start";

export const getMajorEventGuideDirectory = createServerFn({ method: "GET" }).handler(async () => {
  const { loadMajorEventGuideDirectoryServer } = await import("./major-event-directory.server");
  return loadMajorEventGuideDirectoryServer();
});

export const getMajorEventLandingDirectory = createServerFn({ method: "GET" }).handler(async () => {
  const { loadMajorEventLandingDirectoryServer } = await import("./major-event-directory.server");
  return loadMajorEventLandingDirectoryServer();
});
