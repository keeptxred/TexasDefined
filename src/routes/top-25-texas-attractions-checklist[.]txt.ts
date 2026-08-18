import { createFileRoute } from "@tanstack/react-router";

import { TOP_TEXAS_ATTRACTIONS } from "@/data/top-texas-attractions";

const origin = "https://texasdefined.com";

function checklist() {
  const rows = TOP_TEXAS_ATTRACTIONS.map((item) =>
    `[ ] ${String(item.rank).padStart(2, "0")}. ${item.name}\n    ${origin}/destination/${item.slug}`,
  ).join("\n\n");

  return `TexasDefined — Top 25 Texas Attractions Checklist\n\nCanonical collection:\n${origin}/explore/top-attractions\n\nTrip Planner:\n${origin}/explore/trip-planner\n\nHow TexasDefined cites and verifies sources:\n${origin}/citation-guide\n\nUse this checklist to save attractions while planning a Texas trip. Each canonical destination guide includes official-source visitor information, a review date, TexasDefined editorial trip assessment, three itinerary options, traveler Q&A and a full what's-in-the-area guide. Current-day hours, prices, closures and reservation availability should always be confirmed with the official source linked on the destination page.\n\n${rows}\n\nPublisher: TexasDefined\nCanonical domain: ${origin}\n`;
}

export const Route = createFileRoute("/top-25-texas-attractions-checklist.txt")({
  server: {
    handlers: {
      GET: async () => new Response(checklist(), {
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "content-disposition": "attachment; filename=texasdefined-top-25-texas-attractions-checklist.txt",
          "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
          "x-robots-tag": "noindex, follow",
        },
      }),
    },
  },
});
