import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";
import { jsonLd } from "@/lib/seo";

// PrioritySearchPage UI is intentionally delivered from texas-state-fair.lazy.tsx.
const canonicalPath = "/texas-state-fair";
const seoDescription = "State Fair of Texas 2026 runs Sept. 25–Oct. 18 at Fair Park in Dallas. Plan tickets, hours, DART, parking, food, rides, Big Tex and daily events.";
const faq = [
  { question: "When is the 2026 State Fair of Texas?", answer: "The 2026 State Fair of Texas is scheduled for September 25 through October 18, 2026." },
  { question: "Where is the State Fair of Texas held?", answer: "The State Fair of Texas is held at Fair Park in Dallas. Check the official fair site for the current daily schedule, hours, tickets and transportation information." },
  { question: "What is the State Fair of Texas known for?", answer: "Big Tex, the Midway, fried-food competition, livestock and agriculture, auto exhibits, live music, college football and the historic Fair Park setting are all major parts of the fair experience." },
];

export const Route = createFileRoute("/texas-state-fair")({
  loader: async () => {
    const sourceData = await loadPrioritySearchPage("texas-state-fair");
    if (!sourceData) throw notFound();
    return { ...sourceData, faq };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const base = buildPrioritySearchHead({
      canonicalPath,
      title: "State Fair of Texas 2026: Dates & Guide",
      description: seoDescription,
      data: loaderData,
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
          description: loaderData.intro,
          organizer: { "@type": "Organization", name: "State Fair of Texas", url: "https://bigtex.com/" },
        }),
      ],
    };
  },
});
