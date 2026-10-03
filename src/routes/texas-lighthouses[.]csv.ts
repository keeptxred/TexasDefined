import { createFileRoute } from "@tanstack/react-router";

const quote = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;

export const Route = createFileRoute("/texas-lighthouses.csv")({
  server: {
    handlers: {
      GET: async () => {
        const [{ texasLighthouseMapPoints }, { lighthouseVisitorPlans }] = await Promise.all([
          import("@/data/texas-lighthouse-map-points"),
          import("@/data/lighthouse-visitor-planning"),
        ]);

        const planBySlug = new Map(lighthouseVisitorPlans.map((plan) => [plan.slug, plan]));
        const header = [
          "name",
          "slug",
          "county",
          "latitude",
          "longitude",
          "status",
          "era",
          "public_access",
          "best_for",
          "pair_with",
          "planning_note",
          "canonical_url",
          "county_url",
          "primary_source_name",
          "primary_source_url",
        ];

        const rows = texasLighthouseMapPoints.map((point) => {
          const plan = planBySlug.get(point.slug);
          return [
            point.name,
            point.slug,
            point.county,
            point.lat,
            point.lon,
            point.status,
            point.era,
            plan?.publicAccess ?? "",
            plan?.bestFor ?? "",
            plan?.pairWith ?? "",
            plan?.planningNote ?? "",
            `https://texasdefined.com${point.articleHref ?? "/explore/lighthouses"}`,
            `https://texasdefined.com${point.countyHref}`,
            point.sourceLabel,
            point.sourceUrl,
          ];
        });

        const csv = [header, ...rows].map((row) => row.map(quote).join(",")).join("\n");
        return new Response(csv, {
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": "attachment; filename=texas-lighthouse-database.csv",
            "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
            "X-Robots-Tag": "noindex, follow",
          },
        });
      },
    },
  },
});
