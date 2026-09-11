import { createServerFn } from "@tanstack/react-start";

import { isRecurrenceDerivedMajorEventSlug } from "./major-event-date-confidence";

// Keep useful event guides indexable while withholding scheduled Event rich-result
// markup when a future date is recurrence-derived or the last verified occurrence
// has already ended. A newly verified occurrence restores scheduled Event markup.
function applyEventSchemaConfidencePolicy<T extends {
  slug: string;
  name: string;
  title: string;
  description: string;
  jsonLd: string;
  occurrenceHasEnded: boolean;
}>(page: T): T {
  if (!isRecurrenceDerivedMajorEventSlug(page.slug) && !page.occurrenceHasEnded) return page;

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
