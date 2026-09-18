import { createLazyFileRoute } from "@tanstack/react-router";
import { ParkingMapPanel } from "@/components/parking/ParkingMapPanel";

export const Route = createLazyFileRoute("/event/$slug")({
  component: MajorEventGuidePage,
});

const CHAPPELL_HILL_MAP_FRAME = /<div class="aspect-\[4\/3\] overflow-hidden rounded-xl border border-border bg-muted sm:aspect-\[16\/9\]">\s*<iframe[\s\S]*?src="https:\/\/www\.google\.com\/maps\/d\/u\/0\/embed\?ehbc=2E312F&amp;mid=1b6COvSIJuQzAg-UOzybkAXoKRVjeheE"[\s\S]*?<\/iframe>\s*<\/div>/i;
const PLAN_VISIT_HEADING = /(<h2[^>]*>\\s*(?:Planning your visit|Plan the visit)\\s*<\\/h2>)/i;\nconst FIRST_SECTION_HEADING = /(<h2[^>]*>)/i;
const STAY_NEARBY_SLOT = '<div data-stay-nearby-slot class="my-10" aria-label="Places to stay near this event"></div>';

function stabilizeEventHtml(slug: string, html: string) {
  if (slug !== "chappell-hill-bluebonnet-festival") return html;
  return html.replace(
    CHAPPELL_HILL_MAP_FRAME,
    '<div class="rounded-xl border border-border bg-muted/30 p-5"><p class="font-semibold">Washington County wildflower map</p><p class="mt-2 text-sm leading-6 text-muted-foreground">Open Visit Brenham\'s live map in a new tab for current flower reports, photo-stop guidance and the Bluebonnet Trail Scenic Drive.</p></div>',
  );
}

function injectStayNearbySlot(html: string) {
  if (/data-stay-nearby-slot/i.test(html)) return html;
  if (PLAN_VISIT_HEADING.test(html)) return html.replace(PLAN_VISIT_HEADING, `${STAY_NEARBY_SLOT}$1`);
  if (FIRST_SECTION_HEADING.test(html)) return html.replace(FIRST_SECTION_HEADING, `${STAY_NEARBY_SLOT}$1`);
  return `${html}${STAY_NEARBY_SLOT}`;
}

function MajorEventGuidePage() {
  const { page, parkingMap } = Route.useLoaderData();
  const eventHtml = injectStayNearbySlot(stabilizeEventHtml(page.slug, page.html));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: page.jsonLd }} />
      <main className="mx-auto max-w-4xl px-5 pb-20 pt-12 sm:px-8">
        <article dangerouslySetInnerHTML={{ __html: eventHtml }} />
        <ParkingMapPanel map={parkingMap} contextName={page.venue ?? page.title} />
      </main>
    </>
  );
}
