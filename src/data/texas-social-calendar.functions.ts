import { createServerFn } from "@tanstack/react-start";

// Keep the large evergreen social corpus and queue planner out of the public client bundle.
// This server function returns only the serialized seven-day read-only preview to the admin route.
export const getTexasSocialCalendarPreview = createServerFn({ method: "GET" }).handler(async () => {
  const { buildTexasFacebookDraftWeek } = await import("@/lib/texas-social-facebook-queue");

  return {
    week: buildTexasFacebookDraftWeek(new Date(), {
      enabled: false,
      postsPerDay: 2,
      origin: "https://texasdefined.com",
    }),
  };
});
