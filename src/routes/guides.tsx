import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { DepartmentHero } from "@/components/editorial/DepartmentHero";
import { GuideCard } from "@/components/editorial/GuideCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { guidesQuery } from "@/data/queries";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description = "Travel, moving, homeowner, property-tax and everyday-life guides gathered in one editorial library.";
const practicalGuides = [
  { to: "/learn/property-taxes", label: "Property Taxes Without the Guesswork", body: "A plain-English look at appraisals, exemptions, protests, rates and the yearly tax cycle.", action: "Read the guide" },
  { to: "/decide/property-taxes", label: "Estimate Your Property Taxes", body: "Get a quick estimate using your home value, exemptions and local tax rate.", action: "Open calculator" },
  { to: "/learn/property-tax-payments", label: "Paying Your Property Taxes", body: "What to know about deadlines, escrow, payment plans, late bills and tax liens.", action: "Read the guide" },
  { to: "/do/homestead-exemption", label: "File a Homestead Exemption", body: "See who qualifies, what you need and how to file with your appraisal district.", action: "Follow the steps" },
  { to: "/do/property-tax-protest", label: "Protest Your Appraisal", body: "A step-by-step look at deadlines, evidence, informal reviews and ARB hearings.", action: "Follow the steps" },
  { to: "/learn/appraisal-districts", label: "Find Your Appraisal District", body: "Learn what your local appraisal district does and find the right county office.", action: "Read the guide" },
  { to: "/browse/counties", label: "Find Your County", body: "Start with your county and head straight to the local offices and information you need.", action: "Open directory" },
  { to: "/browse/cities", label: "Find a City", body: "Look up a city for nearby stories, moving information and local details.", action: "Open directory" },
] as const;
const travelGuides = [
  { to: "/explore/state-parks", label: "Texas State Parks Guide", body: "Choose parks by region, season, activity, camping style and drive time.", note: "A statewide guide covering all seven regions." },
  { to: "/explore/lakes-rivers", label: "Texas Lakes & Rivers Guide", body: "Plan swimming, fishing, paddling, boating and lakeside weekends with the practical details in one place.", note: "Lakes, rivers and swimming holes across the state." },
  { to: "/explore/outdoors", label: "Texas Camping Guide", body: "Compare state-park, lakeside, primitive and RV camping with practical seasonal advice.", note: "A field guide to camping across Texas." },
  { to: "/explore/road-trips", label: "Texas Scenic Drives", body: "Build Hill Country, Big Bend, Panhandle, Piney Woods and Gulf Coast routes worth taking slowly.", note: "Roads, stops and detours worth the mileage." },
  { to: "/explore/caverns", label: "Texas Caverns & Caves", body: "Find show caves, guided cavern tours and nearby park pairings before you make the drive.", note: "Underground Texas, mapped out." },
  { to: "/explore/small-towns", label: "Texas Small-Town Trips", body: "Plan courthouse-square, dance-hall, historic-district and local-food weekends around the town itself.", note: "Small towns worth making the destination." },
  { to: "/explore/historic-sites", label: "Texas Historic Places", body: "Browse forts, missions, battlefields, museums, historic districts and cultural landmarks.", note: "Where the past still shapes the present." },
] as const;
const allFeaturedGuides = [...travelGuides, ...practicalGuides];
const guideAnchor = (index: number) => `guide-${index + 1}`;
const guidesUrl = absoluteUrl(texasDefinedBrand, "/guides");
const TOPIC_LABELS: Record<string, { eyebrow: string; title: string }> = {
  moving: { eyebrow: "Moving Here", title: "Make the move with confidence" },
  housing: { eyebrow: "Homes & Land", title: "Buying, owning and understanding Texas property" },
  "property-taxes": { eyebrow: "Property Taxes", title: "Texas property taxes, explained" },
  money: { eyebrow: "Money & Property", title: "Plan the numbers before you decide" },
  utilities: { eyebrow: "Everyday Costs", title: "What it costs to keep a Texas home running" },
  travel: { eyebrow: "Travel", title: "Plan the next Texas getaway" },
};
const editorialLabel = (value: string) => value.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

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
  component: GuidesPage,
});

function GuidesPage() {
  const { data: guides } = useSuspenseQuery(guidesQuery());
  const topics = [...new Set(guides.map((guide) => guide.topic))];
  return <>
    <DepartmentHero current="Guides" eyebrow="The Texas Guidebook" title="Travel well. Live well. Know Texas better." description={description} />
    <Section tone="surface"><Container><SectionHeader eyebrow="Travel guides" title="Where to go and how to make the most of it" description="Parks, water, camping, roads, caverns, small towns and historic places—edited into useful starting points." /><ul className="mt-10 divide-y divide-border border-y border-border md:grid md:grid-cols-2 md:divide-y-0 lg:grid-cols-4">{travelGuides.map((guide, index) => <li key={`${guide.label}-${guide.to}`} id={guideAnchor(index)} className="border-border py-6 md:border-b md:p-6 lg:border-r lg:last:border-r-0"><Link to="/explore/$category" params={{ category: guide.to.replace("/explore/", "") }} className="group block h-full"><p className="eyebrow text-muted-foreground">Guide {String(index + 1).padStart(2, "0")}</p><h2 className="mt-3 font-display text-2xl leading-tight group-hover:text-primary">{guide.label}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.body}</p><p className="mt-4 text-xs leading-5 text-muted-foreground">{guide.note}</p><span className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">Read the guide</span></Link></li>)}</ul></Container></Section>
    <Section><Container><SectionHeader eyebrow="Living here" title="Practical guides for making Texas home" /><ul className="mt-10 grid gap-x-8 gap-y-0 md:grid-cols-2 lg:grid-cols-4">{practicalGuides.map((guide, index) => <li key={guide.to} id={guideAnchor(travelGuides.length + index)} className="border-t border-border py-6"><Link to={guide.to} className="group block"><h2 className="font-display text-2xl leading-tight group-hover:text-primary">{guide.label}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.body}</p><span className="eyebrow mt-5 inline-block text-primary">{guide.action} →</span></Link></li>)}</ul></Container></Section>
    {topics.map((topic, index) => {
      const topicCopy = TOPIC_LABELS[topic] ?? { eyebrow: editorialLabel(topic), title: `Explore ${editorialLabel(topic)}` };
      return <Section key={topic} tone={index % 2 === 0 ? "surface" : "default"}><Container><SectionHeader eyebrow={topicCopy.eyebrow} title={topicCopy.title} /><ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{guides.filter((guide) => guide.topic === topic).map((guide) => <li key={guide.id}><GuideCard guide={guide} /></li>)}</ul></Container></Section>;
    })}
  </>;
}
