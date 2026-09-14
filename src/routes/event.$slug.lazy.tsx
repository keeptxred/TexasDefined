import { createLazyFileRoute } from "@tanstack/react-router";
import { ParkingMapPanel } from "@/components/parking/ParkingMapPanel";

const CHAPPELL_HILL_WILDFLOWER_SECTION_TITLE = "Use the county wildflower map before chasing roadside photos";
const CHAPPELL_HILL_WILDFLOWER_MAP_MARKUP = `<div data-map="chappell-hill-wildflower" class="mt-5">
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

export const Route = createLazyFileRoute("/event/$slug")({
  component: MajorEventGuidePage,
});

function injectChappellHillWildflowerMap(slug: string, html: string) {
  if (slug !== "chappell-hill-bluebonnet-festival" || html.includes('data-map="chappell-hill-wildflower"')) return html;

  const sectionTitleIndex = html.indexOf(CHAPPELL_HILL_WILDFLOWER_SECTION_TITLE);
  if (sectionTitleIndex === -1) return html;

  const sectionEndIndex = html.indexOf("</section>", sectionTitleIndex);
  if (sectionEndIndex === -1) return html;

  return `${html.slice(0, sectionEndIndex)}${CHAPPELL_HILL_WILDFLOWER_MAP_MARKUP}${html.slice(sectionEndIndex)}`;
}

function MajorEventGuidePage() {
  const { page, parkingMap } = Route.useLoaderData();
  const articleHtml = injectChappellHillWildflowerMap(page.slug, page.html);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: page.jsonLd }} />
      <main className="mx-auto max-w-4xl px-5 pb-20 pt-12 sm:px-8">
        <article dangerouslySetInnerHTML={{ __html: articleHtml }} />
        <ParkingMapPanel map={parkingMap} contextName={page.venue ?? page.title} />
      </main>
    </>
  );
}
