import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { DepartmentHero } from "@/components/editorial/DepartmentHero";
import { GuideCard } from "@/components/editorial/GuideCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { guidesQuery } from "@/data/queries";
import { recoverOrHideImage } from "@/lib/image-fallback";
import { absoluteUrl } from "@/lib/seo";

import { description, texasExplainedGuide, travelIntro } from "./guides";

const practicalGuides = [
  { to: "/property-tax-guides", label: "Texas Property Tax Guide", body: "The statewide 2026 hub for appraisals, exemptions, protests, rates, bills, deadlines and county tools.", action: "Open the guide" },
  { to: "/decide/property-taxes", label: "Estimate Your Property Taxes", body: "Get a quick estimate using your home value, exemptions and local tax rate.", action: "Open calculator" },
  { to: "/learn/property-tax-payments", label: "Paying Your Property Taxes", body: "What to know about deadlines, escrow, payment plans, late bills and tax liens.", action: "Read the guide" },
  { to: "/do/homestead-exemption", label: "File a Homestead Exemption", body: "See who qualifies, what you need and how to file with your appraisal district.", action: "Follow the steps" },
  { to: "/do/property-tax-protest", label: "Protest Your Appraisal", body: "A step-by-step look at deadlines, evidence, informal reviews and ARB hearings.", action: "Follow the steps" },
  { to: "/learn/appraisal-districts", label: "Find Your Appraisal District", body: "Learn what your local appraisal district does and find the right county office.", action: "Read the guide" },
  { to: "/browse/counties", label: "Find Your County", body: "Start with your county and head straight to the local offices and information you need.", action: "Open directory" },
  { to: "/browse/cities", label: "Find a City", body: "Look up a city for nearby stories, moving information and local details.", action: "Open directory" },
] as const;

const travelGuides = [
  texasExplainedGuide,
  { to: "/guides/citypass-texas", label: "CityPASS® in Texas", body: "Compare Dallas CityPASS®, Houston CityPASS® and San Antonio CityPASS®, all 21 current attraction choices, the nine-day use window and the math to do before buying.", note: "A practical bundle-versus-individual-ticket guide for all three current Texas CityPASS® markets." },
  { to: "/explore/painted-churches", label: "Painted Churches of Texas", body: "Explore the verified statewide collection, church-by-church history, artists, techniques, symbols, archival evidence, map and road-trip routes.", note: "A source-backed heritage reference and travel-planning system for 28 verified churches." },
  { to: "/explore/state-parks", label: "Texas State Parks Guide", body: "Choose parks by region, season, activity, camping style and drive time.", note: "A statewide guide covering all seven regions." },
  { to: "/explore/lakes-rivers", label: "Texas Lakes & Rivers Guide", body: "Plan swimming, fishing, paddling, boating and lakeside weekends with the practical details in one place.", note: "Lakes, rivers and swimming holes across the state." },
  { to: "/best-places-to-go-camping-in-texas", label: "Best Places to Go Camping in Texas", body: "Compare standout state parks, lakeside sites, beach camping, primitive areas and RV-friendly destinations across Texas.", note: "A dedicated statewide camping guide built around where to go, when to go and what style of campsite fits the trip." },
  { to: "/explore/road-trips", label: "Texas Scenic Drives", body: "Build Hill Country, Big Bend, Panhandle, Piney Woods and Gulf Coast routes worth taking slowly.", note: "Roads, stops and detours worth the mileage." },
  { to: "/explore/caverns", label: "Texas Caverns & Caves", body: "Find show caves, guided cavern tours and nearby park pairings before you make the drive.", note: "Underground Texas, mapped out." },
  { to: "/explore/small-towns", label: "Texas Small-Town Trips", body: "Plan courthouse-square, dance-hall, historic-district and local-food weekends around the town itself.", note: "Small towns worth making the destination." },
  { to: "/explore/historic-sites", label: "Texas Historic Places", body: "Browse forts, missions, battlefields, museums, historic districts and cultural landmarks.", note: "Where the past still shapes the present." },
  { to: "/sports-venues", label: "Texas Sports Venue Guide", body: "Browse stadiums, arenas, ballparks, racetracks, college venues and other sports destinations by market and sport.", note: "Verified venue guides for planning game days and sports weekends." },
] as const;

const allFeaturedGuides = [...travelGuides, ...practicalGuides];
const guideAnchor = (index: number) => `guide-${index + 1}`;
const guidesUrl = absoluteUrl(texasDefinedBrand, "/guides");
const guidesStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "CollectionPage", "@id": `${guidesUrl}#page`, url: guidesUrl, name: "The Texas Guidebook", description, isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` }, mainEntity: { "@id": `${guidesUrl}#guide-list` } },
    { "@type": "BreadcrumbList", "@id": `${guidesUrl}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") }, { "@type": "ListItem", position: 2, name: "Guides", item: guidesUrl }] },
    { "@type": "ItemList", "@id": `${guidesUrl}#guide-list`, name: "Texas Defined guides", numberOfItems: allFeaturedGuides.length, itemListElement: allFeaturedGuides.map((guide, index) => ({ "@type": "ListItem", position: index + 1, url: `${guidesUrl}#${guideAnchor(index)}`, item: { "@type": "WebPage", "@id": absoluteUrl(texasDefinedBrand, guide.to), url: absoluteUrl(texasDefinedBrand, guide.to), name: guide.label, description: guide.body } })) },
  ],
};

const TOPIC_LABELS: Record<string, { eyebrow: string; title: string }> = {
  moving: { eyebrow: "Moving Here", title: "Make the move with confidence" },
  housing: { eyebrow: "Homes & Land", title: "Buying, owning and understanding Texas property" },
  "property-taxes": { eyebrow: "Property Taxes", title: "Texas property taxes, explained" },
  money: { eyebrow: "Money & Property", title: "Plan the numbers before you decide" },
  utilities: { eyebrow: "Everyday Costs", title: "What it costs to keep a Texas home running" },
  travel: { eyebrow: "Travel", title: "Plan the next Texas getaway" },
};
const editorialLabel = (value: string) => value.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const guideImageAliases: Record<string, string> = {
  "/texas-explained": "/explore/road-trips",
  "/sports-venues": "/sports",
};
const visualNavItems = texasDefinedBrand.nav.flatMap((section) => section.children ?? []);
function travelGuideImage(path: string) {
  const imagePath = guideImageAliases[path] ?? path;
  return visualNavItems.find((item) => item.to === imagePath)?.image;
}

export const Route = createLazyFileRoute("/guides")({ component: GuidesRoute });

function GuidesRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname !== "/guides" && pathname !== "/guides/") return <Outlet />;
  return <GuidesPage />;
}

function GuidesPage() {
  const { data: guides } = useSuspenseQuery(guidesQuery());
  const topics = [...new Set(guides.map((guide) => guide.topic))];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guidesStructuredData) }} />
    <DepartmentHero current="Guides" eyebrow="The Texas Guidebook" title="Travel well. Live well. Know Texas better." description={description} />
    <Section tone="surface"><Container><SectionHeader eyebrow="Travel guides" title="Where to go and how to make the most of it" description={travelIntro} /><ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{travelGuides.map((guide, index) => {
      const image = travelGuideImage(guide.to);
      return <li key={`${guide.label}-${guide.to}`} id={guideAnchor(index)}><Link to={guide.to} className="group flex h-full flex-col overflow-hidden border border-border bg-card" style={{ borderRadius: "0.4rem", boxShadow: "var(--shadow-soft)" }}>{image ? <div className="relative aspect-[3/2] overflow-hidden bg-muted"><img src={image.src} alt={image.alt} width={1200} height={800} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} decoding="async" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" onError={(event) => recoverOrHideImage(event.currentTarget)} /><div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/35 to-transparent" aria-hidden /></div> : <div className="h-24" style={{ background: "linear-gradient(120deg, color-mix(in oklch, oklch(0.48 0.145 278) 16%, var(--surface)), color-mix(in oklch, oklch(0.69 0.15 52) 12%, var(--surface)))" }} aria-hidden />}<div className="flex flex-1 flex-col p-6"><p className="eyebrow text-primary">Guide {String(index + 1).padStart(2, "0")}</p><h2 className="mt-3 font-display text-2xl leading-tight group-hover:text-primary">{guide.label}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.body}</p><p className="mt-4 flex-1 text-xs leading-5 text-muted-foreground">{guide.note}</p><span className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">Read the guide</span></div></Link></li>;
    })}</ul></Container></Section>
    <Section><Container><SectionHeader eyebrow="Living here" title="Practical guides for making Texas home" /><ul className="mt-10 grid gap-x-8 gap-y-0 md:grid-cols-2 lg:grid-cols-4">{practicalGuides.map((guide, index) => <li key={guide.to} id={guideAnchor(travelGuides.length + index)} className="border-t border-border py-6"><Link to={guide.to} className="group block"><h2 className="font-display text-2xl leading-tight group-hover:text-primary">{guide.label}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.body}</p><span className="eyebrow mt-5 inline-block text-primary">{guide.action} →</span></Link></li>)}</ul></Container></Section>
    {topics.map((topic, index) => {
      const topicCopy = TOPIC_LABELS[topic] ?? { eyebrow: editorialLabel(topic), title: `Explore ${editorialLabel(topic)}` };
      return <Section key={topic} tone={index % 2 === 0 ? "surface" : "default"}><Container><SectionHeader eyebrow={topicCopy.eyebrow} title={topicCopy.title} /><ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{guides.filter((guide) => guide.topic === topic).map((guide) => <li key={guide.id}><GuideCard guide={guide} /></li>)}</ul></Container></Section>;
    })}
  </>;
}
