import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { destinationsQuery } from "@/data/queries";
import { TOP_TEXAS_ATTRACTIONS } from "@/data/top-texas-attractions";
import type { Destination } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/top-attractions";
const description = "Twenty-five landmark Texas experiences, from the Alamo and River Walk to Big Bend, the Gulf Coast, museums, caverns, gardens and historic districts — with practical trip-planning guides for each stop.";

const familyAttractionAnchors = [
  {
    category: "Theme parks",
    name: "Six Flags Over Texas",
    place: "Arlington",
    href: "https://www.sixflags.com/overtexas",
    description: "Use the official park calendar, attraction lineup, accessibility guidance and operating policies when building an Arlington theme-park day.",
  },
  {
    category: "Waterparks",
    name: "Schlitterbahn New Braunfels",
    place: "New Braunfels",
    href: "https://www.sixflags.com/schlitterbahnnewbraunfels",
    description: "A Hill Country waterpark-and-resort example where operating dates, ride availability, policies and lodging options should be checked with the park before travel.",
  },
  {
    category: "Zoos",
    name: "Fort Worth Zoo",
    place: "Fort Worth",
    href: "https://www.fortworthzoo.org/",
    description: "A major North Texas zoo with current visitor information, animal habitats, conservation work, accessibility resources and family programming on its official site.",
  },
  {
    category: "Aquariums",
    name: "Texas State Aquarium",
    place: "Corpus Christi",
    href: "https://www.texasstateaquarium.org/",
    description: "A Gulf Coast marine-life destination where daily presentations, exhibits, conservation programming and current visitor operations come directly from the aquarium.",
  },
  {
    category: "Space & science",
    name: "Space Center Houston",
    place: "Houston",
    href: "https://spacecenter.org/visitor-information",
    description: "The official visitor center of NASA Johnson Space Center, with current tram-tour availability, timed-entry information, exhibits and suggested visit lengths.",
  },
  {
    category: "Science museums",
    name: "Perot Museum of Nature and Science",
    place: "Dallas",
    href: "https://www.perotmuseum.org/visit/",
    description: "A hands-on science and natural-history anchor with official visitor policies, family exhibits and current admission planning from the museum itself.",
  },
  {
    category: "Children's museums",
    name: "Children’s Museum Houston",
    place: "Houston",
    href: "https://www.cmhouston.org/visiting/admission",
    description: "A child-focused museum where hours, age policies, ticketing, accessibility and family programming should be verified through the museum before arrival.",
  },
  {
    category: "Botanical gardens",
    name: "San Antonio Botanical Garden",
    place: "San Antonio",
    href: "https://sabgtx.org/",
    description: "A garden-and-learning destination with family programming, trails, exhibitions and current visitor information from the managing organization.",
  },
] as const;

const familyPlanningPaths = [
  { to: "/explore/attractions-comparison", label: "Compare Texas attractions", description: "Compare the broader destination catalog by region, season and planning notes before committing to a full day." },
  { to: "/browse/cities", label: "Browse Texas cities", description: "Pair a family anchor with nearby museums, parks, food and neighborhoods instead of treating it as an isolated stop." },
  { to: "/events", label: "Check Texas events", description: "Look for seasonal festivals, special exhibits, sports and recurring events that can change the best day to visit." },
  { to: "/explore/trip-planner", label: "Build the itinerary", description: "Sequence attraction time, drive time and nearby stops into a practical family day or multi-day trip." },
] as const;

function rankDestinations(destinations: Destination[], resolveAuthority: (destination: Destination) => Destination) {
  const bySlug = new Map(destinations.map((destination) => [destination.slug, destination]));
  return TOP_TEXAS_ATTRACTIONS.flatMap((entry) => {
    const destination = bySlug.get(entry.slug);
    return destination ? [{ ...entry, destination: resolveAuthority(destination) }] : [];
  });
}

export const Route = createFileRoute("/explore/top-attractions")({
  loader: async ({ context }) => {
    const [destinations, { resolveTopAttractionAuthority }] = await Promise.all([
      context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 })),
      import("@/data/top-attraction-authority-resolver"),
    ]);
    return rankDestinations(destinations, resolveTopAttractionAuthority);
  },
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const attractions = loaderData ?? [];
    const csvUrl = absoluteUrl(texasDefinedBrand, "/top-25-texas-attractions.csv");
    const jsonUrl = absoluteUrl(texasDefinedBrand, "/top-25-texas-attractions.json");
    const methodologyUrl = absoluteUrl(texasDefinedBrand, "/explore/top-attractions/methodology");
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Top 25 Texas Attractions | Texas Defined", description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${pageUrl}#page`,
            url: pageUrl,
            name: "Top 25 Texas Attractions",
            description,
            mainEntity: { "@id": `${pageUrl}#attractions` },
            isBasedOn: methodologyUrl,
            about: [
              { "@type": "Thing", name: "Texas visitor attractions" },
              { "@type": "Thing", name: "Texas family attractions" },
              { "@type": "Thing", name: "Texas trip planning" },
            ],
          },
          {
            "@type": "ItemList",
            "@id": `${pageUrl}#attractions`,
            name: "Top 25 Texas Attractions",
            numberOfItems: attractions.length,
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            itemListElement: attractions.map(({ rank, destination }) => ({
              "@type": "ListItem",
              position: rank,
              name: destination.name,
              url: absoluteUrl(texasDefinedBrand, `/destination/${destination.slug}`),
            })),
          },
          {
            "@type": "Dataset",
            "@id": `${pageUrl}#comparison-dataset`,
            name: "TexasDefined Top 25 Texas Attractions comparison dataset",
            description: "Rank, canonical location, region, category, visit-length assessment, physical effort, weather exposure, advance-planning level, family fit, first-time Texas value, source-review date, controlling visitor source, supporting authority sources and road-trip membership for the Top 25 collection.",
            creator: { "@type": "Organization", "@id": `${absoluteUrl(texasDefinedBrand, "/authors/a-hollis")}#desk`, name: "Texas Defined Editorial Desk" },
            isBasedOn: methodologyUrl,
            sameAs: pageUrl,
            variableMeasured: [
              "rank",
              "recommended visit",
              "physical effort",
              "weather exposure",
              "advance planning",
              "family fit",
              "first-time Texas value",
              "source checked date",
              "authority source count",
              "authority source URLs",
              "road-trip membership",
            ],
            distribution: [
              {
                "@type": "DataDownload",
                encodingFormat: "text/csv",
                contentUrl: csvUrl,
                name: "Top 25 Texas Attractions comparison CSV",
              },
              {
                "@type": "DataDownload",
                encodingFormat: "application/json",
                contentUrl: jsonUrl,
                name: "Top 25 Texas Attractions reference JSON",
              },
            ],
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Explore Texas", item: absoluteUrl(texasDefinedBrand, "/explore") },
              { "@type": "ListItem", position: 3, name: "Top 25 Texas Attractions", item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: TopAttractionsPage,
});

function TopAttractionsPage() {
  const attractions = Route.useLoaderData();

  return <>
    <Container className="pb-8 pt-12 sm:pt-16">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/explore">Explore</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">Top 25 attractions</span>
      </nav>
      <header className="py-10 sm:py-14">
        <p className="eyebrow text-primary">The Texas essential list</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">25 Texas attractions worth building a trip around</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">From missions and presidential history to desert national parks, Gulf beaches, caverns, gardens and big-city museums, these are 25 places that make a strong first map of Texas. Each guide includes practical visit planning, multi-source authority evidence, editorial trip assessments, three itinerary options and a full “what’s in the area” section.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/explore/trip-planner" className="inline-flex items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">Build a Texas trip →</Link>
          <Link to="/explore/top-attractions/road-trips" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">Top-25 road trips →</Link>
          <Link to="/explore/attractions-comparison" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">Compare destinations →</Link>
          <Link to="/explore/top-attractions/methodology" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">Methodology →</Link>
          <a href="/top-25-texas-attractions.csv" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">Download comparison CSV →</a>
          <a href="/top-25-texas-attractions.json" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">Download reference JSON →</a>
          <a href="/top-25-texas-attractions-checklist.txt" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">Download checklist →</a>
          <Link to="/citation-guide" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">Citation guidance →</Link>
        </div>
      </header>
    </Container>

    <Section>
      <Container>
        <SectionHeader eyebrow="How this list is researched" title="Operational facts and editorial judgment are kept separate" description="Visitor logistics come from a controlling official source and carry a review date. Supporting public, institutional, science, conservation and historic-designation sources deepen context. Visit length, effort, weather exposure, planning difficulty and first-time value remain TexasDefined editorial assessments." />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-t-2 border-foreground pt-4"><p className="eyebrow text-primary">Source hierarchy</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Each guide identifies its controlling visitor source separately from supporting authority evidence.</p></div>
          <div className="border-t-2 border-foreground pt-4"><p className="eyebrow text-primary">Trip assessment</p><p className="mt-2 text-sm leading-6 text-muted-foreground">TexasDefined compares visit time, effort, exposure and advance-planning needs using one shared scale.</p></div>
          <div className="border-t-2 border-foreground pt-4"><p className="eyebrow text-primary">Three itineraries</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Every attraction includes a short, medium and expanded way to use the stop in a real Texas trip.</p></div>
          <div className="border-t-2 border-foreground pt-4"><p className="eyebrow text-primary">Review log</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Changing operational details are separated from durable editorial context and pointed back to official sources.</p></div>
        </div>
        <div className="mt-7 flex flex-wrap gap-5 text-sm font-semibold"><Link to="/explore/top-attractions/methodology" className="border-b border-primary text-primary">Read the full methodology →</Link><Link to="/explore/top-attractions/road-trips" className="border-b border-primary text-primary">See the seven route structures →</Link></div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Family attraction planning" title="Choose the kind of family day before choosing the ticket" description="Theme parks, waterparks, zoos, aquariums, science centers, children’s museums and botanical gardens solve different trip needs. These representative Texas anchors show the range; always use the attraction’s current first-party visitor information for hours, reservations, attraction availability and policies." />
        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {familyAttractionAnchors.map((item) => (
            <article key={item.name} className="bg-background p-5">
              <p className="eyebrow text-primary">{item.category} · {item.place}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight">{item.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
              <a href={item.href} target="_blank" rel="noreferrer noopener" className="mt-5 inline-block text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4">Official visitor source ↗</a>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {familyPlanningPaths.map((item) => (
            <Link key={item.to} to={item.to} className="group bg-background p-5">
              <strong className="font-display text-xl leading-tight group-hover:text-primary">{item.label}</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span>
            </Link>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-6 text-muted-foreground">Family-attraction source review: August 30, 2026. This section is a planning framework, not a separate ranking; the Top 25 methodology and canonical destination guides remain the editorial authority for the ranked collection.</p>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeader eyebrow="The full list" title="TexasDefined’s Top 25" description="Open any attraction for the full guide, verified planning notes, multi-source evidence, nearby places, food and lodging areas, family stops, side trips, maps and a direct handoff to the Trip Planner." />
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map(({ rank, destination }) => {
            const assessment = destination.authorityGuide?.assessment;
            const sourceCount = destination.authorityGuide?.sources.length ?? 0;
            return <li key={destination.slug} className="relative">
              <div className="mb-3 flex items-baseline gap-3 border-b border-border pb-3">
                <span className="font-display text-4xl leading-none text-primary">{String(rank).padStart(2, "0")}</span>
                <span className="eyebrow text-muted-foreground">Top Texas attraction</span>
              </div>
              <DestinationCard destination={destination} />
              {assessment && <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 border-y border-border py-4 text-xs">
                <div><dt className="uppercase tracking-[0.1em] text-muted-foreground">Allow</dt><dd className="mt-1 font-medium leading-5">{assessment.recommendedVisit}</dd></div>
                <div><dt className="uppercase tracking-[0.1em] text-muted-foreground">Effort</dt><dd className="mt-1 font-medium">{assessment.physicalEffort}</dd></div>
                <div><dt className="uppercase tracking-[0.1em] text-muted-foreground">Planning</dt><dd className="mt-1 font-medium">{assessment.planningLevel}</dd></div>
                <div><dt className="uppercase tracking-[0.1em] text-muted-foreground">Evidence</dt><dd className="mt-1 font-medium">{sourceCount} authority {sourceCount === 1 ? "source" : "sources"}</dd></div>
              </dl>}
            </li>;
          })}
        </ol>
      </Container>
    </Section>

    <Section>
      <Container>
        <div className="grid gap-8 border-y border-border py-10 md:grid-cols-4">
          <div><p className="eyebrow text-primary">Turn the list into a route</p><h2 className="mt-2 font-display text-3xl">Start with one stop</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Every attraction page can seed the TexasDefined Trip Planner, which then scores other destinations around your starting point.</p></div>
          <Link to="/explore/top-attractions/road-trips" className="group border-t border-border pt-5 md:border-l md:border-t-0 md:pl-8"><strong className="font-display text-2xl transition-colors group-hover:text-primary">Use a ready-made route</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Seven editorial road-trip structures combine the Top 25 into geographic Texas itineraries.</span><span className="eyebrow mt-4 inline-block text-primary">Open road trips →</span></Link>
          <Link to="/explore/trip-planner" className="group border-t border-border pt-5 md:border-l md:border-t-0 md:pl-8"><strong className="font-display text-2xl transition-colors group-hover:text-primary">Build an itinerary</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Choose your pace, interests and trip length, then start with a favorite attraction.</span><span className="eyebrow mt-4 inline-block text-primary">Open Trip Planner →</span></Link>
          <Link to="/explore/attractions-comparison" className="group border-t border-border pt-5 md:border-l md:border-t-0 md:pl-8"><strong className="font-display text-2xl transition-colors group-hover:text-primary">Compare the broader catalog</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Go beyond the Top 25 and compare TexasDefined destinations by region, season and planning notes.</span><span className="eyebrow mt-4 inline-block text-primary">Compare attractions →</span></Link>
        </div>
      </Container>
    </Section>
  </>;
}
