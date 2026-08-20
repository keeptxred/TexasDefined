import { createFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";
import { jsonLd } from "@/lib/seo";

const canonicalPath = "/texas-state-fair";
const data = PRIORITY_SEARCH_PAGES["texas-state-fair"];

export const Route = createFileRoute("/texas-state-fair")({
  head: () => {
    const base = buildPrioritySearchHead({
      canonicalPath,
      title: "State Fair of Texas 2026: Dates, Food, Rides & Planning",
      description: data.intro,
      data,
      about: ["State Fair of Texas", "Fair Park", "Dallas events", "Big Tex", "Texas State Fair food"],
    });
    return {
      ...base,
      scripts: [
        ...base.scripts,
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "2026 State Fair of Texas",
          startDate: "2026-09-25",
          endDate: "2026-10-18",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: "Fair Park",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Dallas",
              addressRegion: "TX",
              addressCountry: "US",
            },
          },
          url: "https://bigtex.com/",
          description: data.intro,
          organizer: { "@type": "Organization", name: "State Fair of Texas", url: "https://bigtex.com/" },
        }),
      ],
    };
  },
  component: () => <PrioritySearchPage data={data} />,
});
