import { createServerFn } from "@tanstack/react-start";

// These authority guides expose useful organizer-backed recurrence rules for trip
// planning, but the displayed future occurrence has not been published as a
// dedicated year-specific schedule. Keep the evergreen guide indexable while
// withholding scheduled Event rich-result markup until first-party confirmation.
const recurrenceDerivedDateSlugs = new Set([
  "dallas-holiday-parade",
  "schulenburg-festival",
  "westfest",
  "luling-watermelon-thump",
  "national-polka-festival",
  "sweetwater-rattlesnake-roundup",
  "granbury-founders-day-jubilee",
  "come-and-take-it-celebration",
  "hopkins-county-stew-contest",
  "texas-state-championship-fiddlers-frolics",
]);

function applyEventSchemaConfidencePolicy<T extends {
  slug: string;
  name: string;
  title: string;
  description: string;
  jsonLd: string;
}>(page: T): T {
  if (!recurrenceDerivedDateSlugs.has(page.slug)) return page;

  const canonicalUrl = `https://texasdefined.com/event/${page.slug}`;
  return {
    ...page,
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url: canonicalUrl,
      about: {
        "@type": "Thing",
        name: page.name,
        url: canonicalUrl,
      },
    }),
  };
}

const loadMajorEventPage = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadMajorEventPageServer } = await import("./major-event-page.server");
    const page = loadMajorEventPageServer(data.slug);
    return page ? applyEventSchemaConfidencePolicy(page) : page;
  });

export function getMajorEventAuthority(slug: string) {
  return loadMajorEventPage({ data: { slug } });
}
