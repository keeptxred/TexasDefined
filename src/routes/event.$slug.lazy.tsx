import { createLazyFileRoute } from "@tanstack/react-router";
import { ParkingMapPanel } from "@/components/parking/ParkingMapPanel";

export const Route = createLazyFileRoute("/event/$slug")({
  component: MajorEventGuidePage,
});

const CHAPPELL_HILL_MAP_FRAME = /<div class="aspect-\[4\/3\] overflow-hidden rounded-xl border border-border bg-muted sm:aspect-\[16\/9\]">\s*<iframe[\s\S]*?src="https:\/\/www\.google\.com\/maps\/d\/u\/0\/embed\?ehbc=2E312F&amp;mid=1b6COvSIJuQzAg-UOzybkAXoKRVjeheE"[\s\S]*?<\/iframe>\s*<\/div>/i;

function stabilizeEventHtml(slug: string, html: string) {
  if (slug !== "chappell-hill-bluebonnet-festival") return html;
  return html.replace(
    CHAPPELL_HILL_MAP_FRAME,
    '<div class="rounded-xl border border-border bg-muted/30 p-5"><p class="font-semibold">Washington County wildflower map</p><p class="mt-2 text-sm leading-6 text-muted-foreground">Open Visit Brenham\'s live map in a new tab for current flower reports, photo-stop guidance and the Bluebonnet Trail Scenic Drive.</p></div>',
  );
}

function MajorEventGuidePage() {
  const { page, parkingMap } = Route.useLoaderData();
  const eventHtml = stabilizeEventHtml(page.slug, page.html);
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
