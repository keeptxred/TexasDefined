import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { guidesQuery } from "@/data/queries";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

export const description = "Travel, moving, homeowner, property-tax and everyday-life guides gathered in one editorial library.";
export const practicalGuides = [
  { to: "/learn/property-taxes", label: "Property Taxes Without the Guesswork", body: "A plain-English look at appraisals, exemptions, protests, rates and the yearly tax cycle.", action: "Read the guide" },
  { to: "/decide/property-taxes", label: "Estimate Your Property Taxes", body: "Get a quick estimate using your home value, exemptions and local tax rate.", action: "Open calculator" },
  { to: "/learn/property-tax-payments", label: "Paying Your Property Taxes", body: "What to know about deadlines, escrow, payment plans, late bills and tax liens.", action: "Read the guide" },
  { to: "/do/homestead-exemption", label: "File a Homestead Exemption", body: "See who qualifies, what you need and how to file with your appraisal district.", action: "Follow the steps" },
  { to: "/do/property-tax-protest", label: "Protest Your Appraisal", body: "A step-by-step look at deadlines, evidence, informal reviews and ARB hearings.", action: "Follow the steps" },
  { to: "/learn/appraisal-districts", label: "Find Your Appraisal District", body: "Learn what your local appraisal district does and find the right county office.", action: "Read the guide" },
  { to: "/browse/counties", label: "Find Your County", body: "Start with your county and head straight to the local offices and information you need.", action: "Open directory" },
  { to: "/browse/cities", label: "Find a City", body: "Look up a city for nearby stories, moving information and local details.", action: "Open directory" },
] as const;
export const travelGuides = [
  { to: "/texas-explained", label: "Texas Explained", body: "Understand the systems behind the scenery: rivers, reservoirs, roads, courthouse towns, wildlife, homes, land and cultural regions.", note: "Ten connected evergreen guides to why Texas works the way it does." },
  { to: "/explore/painted-churches", label: "Painted Churches of Texas", body: "Explore the verified statewide collection, church-by-church history, artists, techniques, symbols, archival evidence, map and road-trip routes.", note: "A source-backed heritage reference and travel-planning system for 27 verified churches." },
  { to: "/explore/state-parks", label: "Texas State Parks Guide", body: "Choose parks by region, season, activity, camping style and drive time.", note: "A statewide guide covering all seven regions." },
  { to: "/explore/lakes-rivers", label: "Texas Lakes & Rivers Guide", body: "Plan swimming, fishing, paddling, boating and lakeside weekends with the practical details in one place.", note: "Lakes, rivers and swimming holes across the state." },
  { to: "/best-places-to-go-camping-in-texas", label: "Best Places to Go Camping in Texas", body: "Compare standout state parks, lakeside sites, beach camping, primitive areas and RV-friendly destinations across Texas.", note: "A dedicated statewide camping guide built around where to go, when to go and what style of campsite fits the trip." },
  { to: "/explore/road-trips", label: "Texas Scenic Drives", body: "Build Hill Country, Big Bend, Panhandle, Piney Woods and Gulf Coast routes worth taking slowly.", note: "Roads, stops and detours worth the mileage." },
  { to: "/explore/caverns", label: "Texas Caverns & Caves", body: "Find show caves, guided cavern tours and nearby park pairings before you make the drive.", note: "Underground Texas, mapped out." },
  { to: "/explore/small-towns", label: "Texas Small-Town Trips", body: "Plan courthouse-square, dance-hall, historic-district and local-food weekends around the town itself.", note: "Small towns worth making the destination." },
  { to: "/explore/historic-sites", label: "Texas Historic Places", body: "Browse forts, missions, battlefields, museums, historic districts and cultural landmarks.", note: "Where the past still shapes the present." },
  { to: "/sports-venues", label: "Texas Sports Venue Guide", body: "Browse stadiums, arenas, ballparks, racetracks, college venues and other sports destinations by market and sport.", note: "Verified venue guides for planning game days and sports weekends." },
] as const;
export const travelIntro = "Start with Texas Explained for the why behind the state, then move into Painted Churches, parks, water, camping, roads, caverns, small towns, historic places and sports destinations.";
const allFeaturedGuides = [...travelGuides, ...practicalGuides];
export const guideAnchor = (index: number) => `guide-${index + 1}`;
const guidesUrl = absoluteUrl(texasDefinedBrand, "/guides");

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath: "/guides", title: "The Texas Guidebook", description }),
    links: [canonicalLink(texasDefinedBrand, "/guides")],
    scripts: [jsonLd({ "@context": "https://schema.org", "@graph": [
      { "@type": "CollectionPage", "@id": `${guidesUrl}#page`, url: guidesUrl, name: "The Texas Guidebook", description, isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` }, mainEntity: { "@id": `${guidesUrl}#guide-list` } },
      { "@type": "BreadcrumbList", "@id": `${guidesUrl}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") }, { "@type": "ListItem", position: 2, name: "Guides", item: guidesUrl }] },
      { "@type": "ItemList", "@id": `${guidesUrl}#guide-list`, name: "Texas Defined guides", numberOfItems: allFeaturedGuides.length, itemListElement: allFeaturedGuides.map((guide, index) => ({ "@type": "ListItem", position: index + 1, url: `${guidesUrl}#${guideAnchor(index)}`, item: { "@type": "WebPage", "@id": absoluteUrl(texasDefinedBrand, guide.to), url: absoluteUrl(texasDefinedBrand, guide.to), name: guide.label, description: guide.body } })) },
    ] })],
  }),
  loader: async ({ context }) => { await context.queryClient.ensureQueryData(guidesQuery()); },
});
