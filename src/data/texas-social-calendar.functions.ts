import { createServerFn } from "@tanstack/react-start";

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
