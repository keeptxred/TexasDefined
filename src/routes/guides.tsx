import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { GuideCard } from "@/components/editorial/GuideCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { guidesQuery } from "@/data/queries";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description =
  "Straightforward travel, moving, homeowner, property-tax and everyday-life guides gathered in one place.";

const migratedGuides = [
  { to: "/learn/property-taxes", label: "Property Taxes Without the Guesswork", body: "A plain-English look at appraisals, exemptions, protests, rates and the yearly tax cycle." },
  { to: "/decide/property-taxes", label: "Estimate Your Property Taxes", body: "Get a quick estimate using your home value, exemptions and local tax rate." },
  { to: "/learn/property-tax-payments", label: "Paying Your Property Taxes", body: "What to know about deadlines, escrow, payment plans, late bills and tax liens." },
  { to: "/do/homestead-exemption", label: "File a Homestead Exemption", body: "See who qualifies, what you need and how to file with your appraisal district." },
  { to: "/do/property-tax-protest", label: "Protest Your Appraisal", body: "A step-by-step look at deadlines, evidence, informal reviews and ARB hearings." },
  { to: "/learn/appraisal-districts", label: "Find Your Appraisal District", body: "Learn what your local appraisal district does and find the right county office." },
  { to: "/browse/counties", label: "Find Your County", body: "Start with your county and head straight to the local offices and information you need." },
  { to: "/browse/cities", label: "Find a City", body: "Look up a city for nearby stories, moving information and local details." },
] as const;

const travelGuides = [
  {
    to: "/explore/state-parks",
    label: "Texas State Parks Guide",
    body: "Choose parks by region, season, activity, camping style and drive time. Includes reservation planning, family trips, hiking, swimming and nearby stops.",
    note: "A statewide guide covering all seven regions.",
  },
  {
    to: "/explore/lakes-rivers",
    label: "Texas Lakes & Rivers Guide",
    body: "Plan swimming, fishing, paddling, boating and lakeside weekends while checking water levels, ramp access, weather and public shoreline access.",
    note: "Lakes, rivers and swimming holes in one place.",
  },
  {
    to: "/explore/outdoors",
    label: "Texas Camping Guide",
    body: "Compare state-park, lakeside, primitive and RV camping, with practical advice for seasons, burn bans, water, weather, insects and remote-road preparation.",
    note: "A practical starting point for camping across the state.",
  },
  {
    to: "/explore/road-trips",
    label: "Texas Scenic Drives",
    body: "Build Hill Country, Big Bend, Panhandle, Piney Woods and Gulf Coast routes with seasonal timing, fuel planning, photography stops and worthwhile detours.",
    note: "Routes worth taking slowly.",
  },
  {
    to: "/explore/road-trips",
    label: "Texas Wildflower Seasons",
    body: "Use a month-by-month approach to bluebonnets and other blooms, with regional timing, responsible roadside viewing and flexible spring road-trip planning.",
    note: "A spring guide for timing the blooms and taking the long way.",
  },
  {
    to: "/explore/caverns",
    label: "Texas Caverns & Caves",
    body: "Find show caves, guided cavern tours and nearby park pairings, and check tour schedules, accessibility, footwear rules and seasonal conditions before driving.",
    note: "Underground stops worth planning ahead for.",
  },
  {
    to: "/explore/small-towns",
    label: "Texas Small-Town Trips",
    body: "Plan courthouse-square, dance-hall, historic-district and local-food weekends without treating the town as only a stop between larger attractions.",
    note: "Weekend ideas built around the town itself.",
  },
  {
    to: "/explore/historic-sites",
    label: "Texas Historic Places",
    body: "Browse forts, missions, battlefields, museums, historic districts and cultural landmarks, then combine them with nearby towns and scenic routes.",
    note: "Places where the past still feels close.",
  },
] as const;

const allFeaturedGuides = [...travelGuides, ...migratedGuides];
const guideAnchor = (index: number) => `guide-${index + 1}`;
const guidesUrl = absoluteUrl(texasDefinedBrand, "/guides");

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/guides",
      title: "Guides for Travel and Everyday Life",
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, "/guides")],
    scripts: [
      jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${guidesUrl}#page`,
            url: guidesUrl,
            name: "Guides for Travel and Everyday Life",
            description,
            isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
            mainEntity: { "@id": `${guidesUrl}#guide-list` },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${guidesUrl}#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Guides", item: guidesUrl },
            ],
          },
          {
            "@type": "ItemList",
            "@id": `${guidesUrl}#guide-list`,
            name: "Texas Defined guides",
            numberOfItems: allFeaturedGuides.length,
            itemListElement: allFeaturedGuides.map((guide, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${guidesUrl}#${guideAnchor(index)}`,
              item: {
                "@type": "WebPage",
                "@id": absoluteUrl(texasDefinedBrand, guide.to),
                url: absoluteUrl(texasDefinedBrand, guide.to),
                name: guide.label,
                description: guide.body,
              },
            })),
          },
        ],
      }),
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(guidesQuery());
  },
  component: GuidesPage,
});

function GuidesPage() {
  const { data: guides } = useSuspenseQuery(guidesQuery());
  const topics = [...new Set(guides.map((guide) => guide.topic))];

  return (
    <>
      <Container className="pb-6 pt-16 sm:pt-24">
        <p className="eyebrow text-primary">Good to know</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight sm:text-6xl">
          Texas travel and everyday life, made easier
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
      </Container>

      <Section tone="surface">
        <Container>
          <SectionHeader
            eyebrow="Before you go"
            title="Guides for seeing more of Texas"
            description="A few dependable starting points for parks, water, camping, road trips, caverns, small towns and historic places."
          />
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {travelGuides.map((guide, index) => (
              <li key={`${guide.label}-${guide.to}`} id={guideAnchor(index)}>
                <Link
                  to="/explore/$category"
                  params={{ category: guide.to.replace("/explore/", "") }}
                  className="block h-full rounded-md border border-border bg-background p-5 transition-colors hover:border-primary/50"
                >
                  <h2 className="font-display text-xl">{guide.label}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.body}</p>
                  <p className="mt-4 text-xs leading-5 text-muted-foreground">{guide.note}</p>
                  <span className="mt-5 inline-block text-sm font-medium text-primary">Open the guide →</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Living Here" title="The questions homeowners ask us most" />
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {migratedGuides.map((guide, index) => (
              <li key={guide.to} id={guideAnchor(travelGuides.length + index)}>
                <Link
                  to={guide.to}
                  className="block h-full rounded-md border border-border bg-background p-5 transition-colors hover:border-primary/50"
                >
                  <h2 className="font-display text-xl">{guide.label}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.body}</p>
                  <span className="mt-5 inline-block text-sm font-medium text-primary">Start here →</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {topics.map((topic, index) => (
        <Section key={topic} tone={index % 2 === 0 ? "surface" : "default"}>
          <Container>
            <SectionHeader eyebrow={topic} title={`More help with ${topic.toLowerCase()}`} />
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {guides
                .filter((guide) => guide.topic === topic)
                .map((guide) => (
                  <li key={guide.id}>
                    <GuideCard guide={guide} />
                  </li>
                ))}
            </ul>
          </Container>
        </Section>
      ))}
    </>
  );
}
