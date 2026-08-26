import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/social-calendar-preview")({
  server: {
    handlers: {
      GET: async () => {
        const { buildTexasFacebookDraftWeek } = await import("@/lib/texas-social-facebook-queue");
        const week = await buildTexasFacebookDraftWeek(new Date(), {
          enabled: false,
          postsPerDay: 2,
          origin: "https://texasdefined.com",
        });

        return Response.json(
          { week },
          {
            headers: {
              "cache-control": "no-store",
              "x-robots-tag": "noindex, nofollow",
            },
          },
        );
      },
    },
  },
});
