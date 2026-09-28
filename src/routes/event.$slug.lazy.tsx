import { createLazyFileRoute } from "@tanstack/react-router";
import { ParkingMapPanel } from "@/components/parking/ParkingMapPanel";
import { hideFailedImageContainer } from "@/lib/image-fallback";

export const Route = createLazyFileRoute("/event/$slug")({
  component: MajorEventGuidePage,
});

const CHAPPELL_HILL_MAP_FRAME = /<div class="aspect-\[4\/3\] overflow-hidden rounded-xl border border-border bg-muted sm:aspect-\[16\/9\]">\s*<iframe[\s\S]*?src="https:\/\/www\.google\.com\/maps\/d\/u\/0\/embed\?ehbc=2E312F&amp;mid=1b6COvSIJuQzAg-UOzybkAXoKRVjeheE"[\s\S]*?<\/iframe>\s*<\/div>/i;
const PLAN_VISIT_HEADING = /(<h2[^>]*>\s*Planning your visit\s*<\/h2>)/i;
const LEGACY_PLAN_VISIT_HEADING = /(<h2[^>]*>\s*)Plan the visit(\s*<\/h2>)/gi;
const FIRST_SECTION_HEADING = /(<h2[^>]*>)/i;
const EVENT_DISCOVERY_TAIL = /(<section data-event-discovery-tail="true"[^>]*>)/i;
const STAY_NEARBY_SLOT = '<section data-event-booking-funnel="true" class="my-8 border-y border-border py-7"><p class="eyebrow text-primary">Make a weekend of it</p><h2 class="mt-3 font-display text-3xl">Plan the whole weekend</h2><p class="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">Once the event fits your calendar, compare places to stay nearby and use the guide for tickets, parking and other trip details. Partner availability and prices can change.</p><div class="mt-6" data-stay-nearby-slot aria-label="Places to stay near this event"></div><p class="mt-5 text-xs leading-5 text-muted-foreground">Own or operate a relevant Texas travel business? <a href="/partner-with-us" class="font-semibold text-foreground underline decoration-border underline-offset-4">See TexasDefined partnership options</a>.</p></section>';

function stabilizeEventHtml(slug: string, html: string) {
  if (slug !== "chappell-hill-bluebonnet-festival") return html;
  return html.replace(
    CHAPPELL_HILL_MAP_FRAME,
    '<div class="rounded-xl border border-border bg-muted/30 p-5"><p class="font-semibold">Washington County wildflower map</p><p class="mt-2 text-sm leading-6 text-muted-foreground">Open Visit Brenham\'s live map in a new tab for current flower reports, photo-stop guidance and the Bluebonnet Trail Scenic Drive.</p></div>',
  );
}

function normalizeVisitorHeadings(html: string) {
  return html.replace(LEGACY_PLAN_VISIT_HEADING, "$1Planning your visit$2");
}

function injectStayNearbySlot(html: string) {
  if (/data-stay-nearby-slot/i.test(html)) return html;
  if (PLAN_VISIT_HEADING.test(html)) return html.replace(PLAN_VISIT_HEADING, `${STAY_NEARBY_SLOT}$1`);
  if (FIRST_SECTION_HEADING.test(html)) return html.replace(FIRST_SECTION_HEADING, `${STAY_NEARBY_SLOT}$1`);
  return `${html}${STAY_NEARBY_SLOT}`;
}

function splitEventHtmlForParking(html: string) {
  const match = EVENT_DISCOVERY_TAIL.exec(html);
  if (!match || match.index === undefined) return { beforeParking: html, afterParking: "" };
  return {
    beforeParking: html.slice(0, match.index),
    afterParking: html.slice(match.index),
  };
}

function MajorEventGuidePage() {
  const { page, parkingMap } = Route.useLoaderData();
  const eventHtml = injectStayNearbySlot(normalizeVisitorHeadings(stabilizeEventHtml(page.slug, page.html)));
  const { beforeParking, afterParking } = splitEventHtmlForParking(eventHtml);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: page.jsonLd }} />
      <main className="mx-auto max-w-4xl px-5 pb-20 pt-12 sm:px-8" onErrorCapture={(event) => {
        const image = event.target;
        if (image instanceof HTMLImageElement && image.dataset.majorEventEnrichmentImage === "true") hideFailedImageContainer(image);
      }}>
        <article dangerouslySetInnerHTML={{ __html: beforeParking }} />
        <ParkingMapPanel map={parkingMap} contextName={page.venue ?? page.title} />
        {afterParking ? <article dangerouslySetInnerHTML={{ __html: afterParking }} /> : null}
      </main>
    </>
  );
}
