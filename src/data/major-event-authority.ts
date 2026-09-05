import { createServerFn } from "@tanstack/react-start";

import { isRecurrenceDerivedMajorEventSlug } from "./major-event-date-confidence";

// These authority guides expose useful organizer-backed recurrence rules for trip
// planning, but the displayed future occurrence has not been published as a
// dedicated year-specific schedule. Keep the evergreen guide indexable while
// withholding scheduled Event rich-result markup until first-party confirmation.
function applyEventSchemaConfidencePolicy<T extends {
  slug: string;
  name: string;
  title: string;
  description: string;
  jsonLd: string;
}>(page: T): T {
  if (!isRecurrenceDerivedMajorEventSlug(page.slug)) return page;

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
