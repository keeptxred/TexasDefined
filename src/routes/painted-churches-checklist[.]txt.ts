import { createFileRoute } from "@tanstack/react-router";

import { paintedChurchItineraries } from "@/data/painted-church-itineraries";
import { resolvePaintedChurchVisitorStatus } from "@/data/painted-church-visitor-status";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";

const BASE_URL = "https://texasdefined.com";

function buildChecklist() {
  const lines = [
    "TEXAS PAINTED CHURCHES FIELD CHECKLIST",
    "Texas Defined · reviewed August 18, 2026",
    "",
    "Canonical collection: https://texasdefined.com/explore/painted-churches",
    "Methodology: https://texasdefined.com/explore/painted-churches/methodology",
    "Routes: https://texasdefined.com/explore/painted-churches/routes",
    "",
    "IMPORTANT: These are active churches. Worship, funerals, weddings, holy days, prayer and parish events override sightseeing. Verify current access before travel.",
    "",
    "VERIFIED CHURCHES",
    "",
  ];

  for (const church of expandedPaintedChurches) {
    const status = resolvePaintedChurchVisitorStatus(church.slug);
    lines.push(
      `[ ] ${church.shortName}`,
      `    ${church.city}, ${church.county} County`,
      `    ${church.address ?? `${church.city}, Texas`}`,
      `    Classification: ${church.classification.replace(/-/g, " ")}`,
      `    Interior integrity: ${church.interiorIntegrity.replace(/-/g, " ")}`,
      `    Visitor status: ${status.status.replace(/-/g, " ")} · checked ${status.checkedAt}`,
      `    Guide: ${BASE_URL}/explore/painted-churches/${church.slug}`,
      "",
    );
  }

  lines.push("ROUTE MENU", "");
  for (const route of paintedChurchItineraries) {
    lines.push(
      `[ ] ${route.name}`,
      `    ${route.duration} · ${route.churchSlugs.length} church${route.churchSlugs.length === 1 ? "" : "es"}`,
      `    ${route.summary}`,
      `    Guide: ${BASE_URL}/explore/painted-churches/routes/${route.slug}`,
      "",
    );
  }

  lines.push(
    "Before publication or travel decisions, use the canonical HTML guide and the linked official church/parish/Chamber source for current information.",
  );
  return lines.join("\n");
}

export const Route = createFileRoute("/painted-churches-checklist.txt")({
  server: {
    handlers: {
      GET: async () => new Response(buildChecklist(), {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Content-Disposition": "attachment; filename=texas-painted-churches-checklist.txt",
          "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
          "X-Robots-Tag": "noindex, follow",
        },
      }),
    },
  },
});
