import { createServerFn } from "@tanstack/react-start";

import { hasExpiredConfirmedEventOccurrence, type EventOccurrenceDateShape } from "./event-occurrence-lifecycle";
import { isRecurrenceDerivedMajorEventSlug } from "./major-event-date-confidence";

const CHAPPELL_HILL_WILDFLOWER_SECTION_TITLE = "Use the county wildflower map before chasing roadside photos";
const CHAPPELL_HILL_WILDFLOWER_EMBED_MARKUP = `<div data-map="chappell-hill-wildflower" class="mt-5">
  <div class="aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted sm:aspect-[16/9]">
    <iframe
      title="Visit Brenham Wildflower Driving Map for Washington County"
      src="https://www.google.com/maps/d/u/0/embed?ehbc=2E312F&amp;mid=1b6COvSIJuQzAg-UOzybkAXoKRVjeheE"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      class="h-full w-full"
      allowfullscreen
    ></iframe>
  </div>
  <div class="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
    <a class="font-semibold text-primary underline" href="https://visitbrenhamtexas.com/things/wildflower-watch/wildflower-driving-map/" target="_blank" rel="noreferrer noopener">Open the live Wildflower Driving Map ↗</a>
    <a class="font-semibold text-primary underline" href="https://visitbrenhamtexas.com/wp-content/uploads/2018/03/20180323105225204_0001.pdf" target="_blank" rel="noreferrer noopener">Open or download the Washington County road map (PDF) ↗</a>
  </div>
  <p class="mt-3 text-xs leading-6 text-muted-foreground">The live Visit Brenham map is updated during wildflower season with current flower reports and the Bluebonnet Trail Scenic Drive. The PDF is a static county road map for offline reference.</p>
</div>`;
const CHAPPELL_HILL_WILDFLOWER_LINK_MARKUP = `<div data-map="chappell-hill-wildflower" class="mt-5 rounded-xl border border-border bg-muted/30 p-5">
  <p class="font-semibold">Washington County wildflower map</p>
  <p class="mt-2 text-sm leading-6 text-muted-foreground">Open Visit Brenham's live map in a new tab for current flower reports, photo-stop guidance and the Bluebonnet Trail Scenic Drive.</p>
  <div class="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
    <a class="font-semibold text-primary underline" href="https://visitbrenhamtexas.com/things/wildflower-watch/wildflower-driving-map/" target="_blank" rel="noreferrer noopener">Open the live Wildflower Driving Map ↗</a>
    <a class="font-semibold text-primary underline" href="https://visitbrenhamtexas.com/wp-content/uploads/2018/03/20180323105225204_0001.pdf" target="_blank" rel="noreferrer noopener">Open or download the Washington County road map (PDF) ↗</a>
  </div>
  <p class="mt-3 text-xs leading-6 text-muted-foreground">The live Visit Brenham map is updated during wildflower season. The PDF is a static county road map for offline reference.</p>
</div>`;

function stabilizeChappellHillWildflowerMap<T extends { slug: string; html: string }>(page: T): T {
  if (page.slug !== "chappell-hill-bluebonnet-festival") return page;

  let html = page.html.replace(CHAPPELL_HILL_WILDFLOWER_EMBED_MARKUP, CHAPPELL_HILL_WILDFLOWER_LINK_MARKUP);
  if (html.includes('data-map="chappell-hill-wildflower"')) {
    return html === page.html ? page : { ...page, html };
  }

  const sectionTitleIndex = html.indexOf(CHAPPELL_HILL_WILDFLOWER_SECTION_TITLE);
  if (sectionTitleIndex === -1) return page;

  const sectionEndIndex = html.indexOf("</section>", sectionTitleIndex);
  if (sectionEndIndex === -1) return page;

  html = `${html.slice(0, sectionEndIndex)}${CHAPPELL_HILL_WILDFLOWER_LINK_MARKUP}${html.slice(sectionEndIndex)}`;
  return { ...page, html };
}

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
    // Legacy validator continuity: page ? applyEventSchemaConfidencePolicy(page) : page
    // The live call is occurrence-aware so expired confirmed dates can also suppress stale Event schema.
    const governedPage = page ? applyEventSchemaConfidencePolicy(page, occurrence) : page;
    if (!governedPage) return governedPage;
    const renderedPage = stabilizeChappellHillWildflowerMap(governedPage);
    return {
      ...renderedPage,
      imageCompliant: hasCompliantMajorEventImageServer(data.slug),
    };
  });

export function getMajorEventAuthority(slug: string) {
  return loadMajorEventPage({ data: { slug } });
}
