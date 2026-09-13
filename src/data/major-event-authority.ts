import { createServerFn } from "@tanstack/react-start";

import { hasExpiredConfirmedEventOccurrence, type EventOccurrenceDateShape } from "./event-occurrence-lifecycle";
import { isRecurrenceDerivedMajorEventSlug } from "./major-event-date-confidence";

// These authority guides remain useful evergreen trip-planning pages even when a
// future occurrence is recurrence-derived or the last confirmed occurrence has
// already ended. In either case, withhold scheduled Event rich-result markup until
// a first-party source confirms a current or future occurrence.
function applyEventSchemaConfidencePolicy<T extends {
  slug: string;
  name: string;
  title: string;
  description: string;
  jsonLd: string;
}>(page: T, occurrence: EventOccurrenceDateShape | null): T {
  const shouldWithholdScheduledEventSchema = isRecurrenceDerivedMajorEventSlug(page.slug)
    || Boolean(occurrence && hasExpiredConfirmedEventOccurrence(occurrence));
  if (!shouldWithholdScheduledEventSchema) return page;

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
    const [{ loadMajorEventPageServer, getMajorEventRecordServer }, { hasCompliantMajorEventImageServer }] = await Promise.all([
      import("./major-event-page.server"),
      import("./major-event-schema-enrichment.server"),
    ]);
    const page = loadMajorEventPageServer(data.slug);
    const occurrence = page ? getMajorEventRecordServer(data.slug) : null;
    const governedPage = page ? applyEventSchemaConfidencePolicy(page, occurrence) : page;
    if (!governedPage) return governedPage;
    return {
      ...governedPage,
      imageCompliant: hasCompliantMajorEventImageServer(data.slug),
    };
  });

export function getMajorEventAuthority(slug: string) {
  return loadMajorEventPage({ data: { slug } });
}
