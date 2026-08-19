import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchItineraries } from "@/data/painted-church-itineraries";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/routes";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = "Eight Texas Painted Churches itineraries for first-time visitors, complete Schulenburg touring, regional weekends and Czech, German, Polish, Wendish and statewide heritage trips.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Churches Routes & Itineraries", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ "@context": "https://schema.org", "@type": "ItemList", "@id": `${pageUrl}#routes`, name: "Texas Painted Churches routes", numberOfItems: paintedChurchItineraries.length, itemListElement: paintedChurchItineraries.map((item, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "TouristTrip", name: item.name, description: item.summary, url: `${pageUrl}/${item.slug}` } })) })],
  }),
  component: RoutesHub,
});

function RoutesHub() {
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Routes</li></ol></nav><p className="eyebrow mt-8 text-primary">Trip planning</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Eight ways to travel the Painted Churches.</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Start with four churches in one day, complete all six around Schulenburg, build a regional weekend, or organize a trip around Czech/Moravian, German, Polish/Silesian, Wendish or statewide research themes.</p></Container></section><Container className="py-14 sm:py-18"><section className="grid gap-px border border-border bg-border md:grid-cols-2">{paintedChurchItineraries.map((item) => <article key={item.slug} className="bg-background p-7"><p className="eyebrow text-primary">{item.duration} · {item.churchSlugs.length} church{item.churchSlugs.length === 1 ? "" : "es"}</p><h2 className="mt-3 font-display text-3xl"><Link to="/explore/painted-churches/routes/$slug" params={{ slug: item.slug }} className="hover:text-primary">{item.name}</Link></h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.summary}</p><Link to="/explore/painted-churches/routes/$slug" params={{ slug: item.slug }} className="eyebrow mt-5 inline-block border-b border-primary text-primary">Open itinerary</Link></article>)}</section><section className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">Current access still controls</p><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">These are editorial route structures, not live operating schedules. Active churches can close or restrict access for Masses, funerals, weddings, holy days and parish events. Verify current access with the controlling parish, church or Schulenburg Chamber source before driving.</p></section></Container></main>;
}
