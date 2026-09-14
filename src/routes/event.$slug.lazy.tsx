import { useEffect } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ParkingMapPanel } from "@/components/parking/ParkingMapPanel";

const CHAPPELL_HILL_SLUG = "chappell-hill-bluebonnet-festival";
const CHAPPELL_HILL_WILDFLOWER_MAP_URL = "https://www.google.com/maps/d/u/0/embed?ehbc=2E312F&mid=1b6COvSIJuQzAg-UOzybkAXoKRVjeheE";
const CHAPPELL_HILL_WILDFLOWER_IFRAME = /<iframe\s+title="Visit Brenham Wildflower Driving Map for Washington County"[\s\S]*?<\/iframe>/;
const CHAPPELL_HILL_WILDFLOWER_DEFERRED_MARKUP = `<div data-wildflower-map-frame class="aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted sm:aspect-[16/9]">
  <button
    type="button"
    data-wildflower-map-load
    data-map-src="${CHAPPELL_HILL_WILDFLOWER_MAP_URL.replace(/&/g, "&amp;")}"
    class="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center hover:bg-background/60"
    aria-label="Load the interactive Visit Brenham Wildflower Driving Map"
  >
    <span class="font-display text-xl">Load the interactive wildflower map</span>
    <span class="max-w-xl text-sm leading-6 text-muted-foreground">The Google map stays unloaded until you ask for it, reducing memory use and background activity.</span>
  </button>
</div>`;

export const Route = createLazyFileRoute("/event/$slug")({
  component: MajorEventGuidePage,
});

function deferChappellHillWildflowerMap(slug: string, html: string) {
  if (slug !== CHAPPELL_HILL_SLUG) return html;
  return html.replace(CHAPPELL_HILL_WILDFLOWER_IFRAME, CHAPPELL_HILL_WILDFLOWER_DEFERRED_MARKUP);
}

function MajorEventGuidePage() {
  const { page, parkingMap } = Route.useLoaderData();
  const articleHtml = deferChappellHillWildflowerMap(page.slug, page.html);

  useEffect(() => {
    if (page.slug !== CHAPPELL_HILL_SLUG) return;

    const button = document.querySelector<HTMLButtonElement>("[data-wildflower-map-load]");
    const frame = document.querySelector<HTMLElement>("[data-wildflower-map-frame]");
    if (!button || !frame) return;

    const loadMap = () => {
      const src = button.dataset.mapSrc;
      if (!src || frame.querySelector("iframe")) return;

      const iframe = document.createElement("iframe");
      iframe.title = "Visit Brenham Wildflower Driving Map for Washington County";
      iframe.src = src;
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.className = "h-full w-full";
      iframe.setAttribute("allowfullscreen", "");
      frame.replaceChildren(iframe);
    };

    button.addEventListener("click", loadMap, { once: true });
    return () => button.removeEventListener("click", loadMap);
  }, [page.slug]);

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
