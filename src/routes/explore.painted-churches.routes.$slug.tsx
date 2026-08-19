import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchItineraryBySlug } from "@/data/painted-church-itineraries";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/explore/painted-churches/routes/$slug")({
  loader: ({ params }) => {
    const itinerary = paintedChurchItineraryBySlug.get(params.slug);
    if (!itinerary) throw notFound();
    return { itinerary };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Painted Church route unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { itinerary } = loaderData;
    const canonicalPath = `/explore/painted-churches/routes/${params.slug}`;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const churches = expandedPaintedChurches.filter((church) => itinerary.churchSlugs.includes(church.slug));
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: itinerary.name, description: itinerary.summary }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        "@id": `${pageUrl}#trip`,
        name: itinerary.name,
        description: itinerary.summary,
        url: pageUrl,
        itinerary: itinerary.churchSlugs.map((slug, index) => {
          const church = churches.find((item) => item.slug === slug);
          return { "@type": "ListItem", position: index + 1, item: { "@type": "Church", name: church?.name ?? slug, url: `${siteUrl}/explore/painted-churches/${slug}` } };
        }),
      })],
    };
  },
  component: ItineraryPage,
});

function ItineraryPage() {
  const { itinerary } = Route.useLoaderData();
  const churches = itinerary.churchSlugs.map((slug) => expandedPaintedChurches.find((church) => church.slug === slug)).filter((church): church is NonNullable<typeof church> => Boolean(church));
  const directionsUrl = churches.length > 1
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(churches[0].address ?? `${churches[0].name}, ${churches[0].city}, Texas`)}&destination=${encodeURIComponent(churches[churches.length - 1].address ?? `${churches[churches.length - 1].name}, ${churches[churches.length - 1].city}, Texas`)}${churches.length > 2 ? `&waypoints=${churches.slice(1, -1).map((church) => encodeURIComponent(church.address ?? `${church.name}, ${church.city}, Texas`)).join("%7C")}` : ""}`
    : churches[0] ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(churches[0].address ?? `${churches[0].name}, ${churches[0].city}, Texas`)}` : "";
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches/routes">Routes</Link></li><li aria-hidden>·</li><li aria-current="page">{itinerary.name}</li></ol></nav><p className="eyebrow mt-8 text-primary">{itinerary.duration} · {itinerary.theme}</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{itinerary.name}</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{itinerary.summary}</p>{directionsUrl ? <a href={directionsUrl} target="_blank" rel="noreferrer" className="mt-6 inline-block border-b border-primary text-sm font-semibold text-primary">Open route in Google Maps</a> : null}</Container></section><Container className="py-14 sm:py-18"><section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Stops</p><ol className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">{churches.map((church, index) => <li key={church.slug} className="bg-background p-7"><p className="eyebrow text-primary">Stop {index + 1} · {church.city}</p><h2 className="mt-3 font-display text-3xl"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{church.summary}</p><p className="mt-4 text-xs leading-6 text-muted-foreground">Integrity: {church.interiorIntegrity.replace(/-/g, " ")} · Classification: {church.classification.replace(/-/g, " ")}</p></li>)}</ol></section><section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Planning notes</p><ul className="mt-5 list-disc space-y-3 pl-5 text-base leading-8 text-muted-foreground">{itinerary.planningNotes.map((note) => <li key={note}>{note}</li>)}</ul></section><section className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">Before you drive</p><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">This route is editorial trip-planning synthesis. Current access, services, funerals, weddings, holy days, closures and parish events override any itinerary. Open each church guide and verify the controlling current source before travel.</p></section></Container></main>;
}
