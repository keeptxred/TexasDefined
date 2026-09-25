import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadPrioritySearchPage } from "@/data/priority-search-page";
import { buildPrioritySearchHead } from "@/lib/priority-search-seo";
import { jsonLd } from "@/lib/seo";

// PrioritySearchPage UI is intentionally delivered from texas-state-fair.lazy.tsx.
const canonicalPath = "/texas-state-fair";
const seoDescription = "State Fair of Texas 2026 is open Sept. 25–Oct. 18 at Fair Park in Dallas. Current hours, tickets, DART, parking, coupons, food, rides and planning.";
const faq = [
  { question: "When is the 2026 State Fair of Texas?", answer: "The 2026 State Fair of Texas runs September 25 through October 18, 2026, at Fair Park in Dallas." },
  { question: "What are the 2026 State Fair of Texas hours?", answer: "The Fair is open 10 a.m.–9 p.m. Sundays through Thursdays and 10 a.m.–10 p.m. Fridays and Saturdays. Last entry is 9 p.m. Parking gates and ticket booths open at 9:30 a.m." },
  { question: "How much are 2026 State Fair of Texas tickets?", answer: "Official 2026 prices vary by day and discount. The Fair currently lists general admission from $7 to $25, child admission ages 3–12 from $7 to $10, children age 2 and younger free, and senior admission from $7 to $20." },
  { question: "Where is the State Fair of Texas held?", answer: "The State Fair of Texas is held at Fair Park in Dallas, Texas." },
  { question: "Can I take DART to the State Fair of Texas?", answer: "Yes. DART's Green Line serves Fair Park Station and MLK Jr. Station, both convenient to fairground entrances." },
  { question: "How do State Fair of Texas coupons work?", answer: "Food, Midway rides and Midway games use Fair coupons. One coupon is currently worth $1, and unused coupons do not expire under the Fair's current policy." },
  { question: "Can I bring food and drinks into the State Fair of Texas?", answer: "The Fair allows outside food and nonalcoholic beverages subject to current container, cooler and bag restrictions. Check the official FAQ before your visit because rules can change." },
  { question: "What food won the 2026 Big Tex Choice Awards?", answer: "The 2026 winners are Burger Chop Tater Tacos for savory, Fletcher's Chocolate Corny Dog for sweet, Tropical Coco Fresca for sipper, and Berry Me in Matcha for most creative." },
  { question: "What time does the State Fair Midway open?", answer: "The 2026 Midway opens at 11 a.m. Sundays through Fridays and 10 a.m. Saturdays." },
  { question: "What is the State Fair of Texas known for?", answer: "Big Tex, the Midway, inventive fair food, livestock and agriculture, the Texas Auto Show, live music, college football and historic Fair Park are major parts of the experience." },
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
      title: "State Fair of Texas 2026: Hours, Tickets & Guide",
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
