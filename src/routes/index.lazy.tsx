import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useBrand } from "@/brand/context";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { EventCard } from "@/components/editorial/EventCard";
import { FeatureHero } from "@/components/editorial/FeatureHero";
import { GuideCard } from "@/components/editorial/GuideCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { homepageFaqs } from "@/content/homepage";
import { articlesQuery, destinationsQuery, eventsQuery, guidesQuery, regionsQuery } from "@/data/queries";
import { formatReadingTime } from "@/domain/utils/format";

const HOMEPAGE_DESTINATION_LIMIT = 24;
const HOMEPAGE_ROAD_TRIP_LIMIT = 8;
const texasExplainedPicks = [
  { title: "Major Rivers of Texas", description: "Follow Texas river basins and major waterways across mountains, plains, cities, farming country and the Gulf-bound landscape.", to: "/article/texas-rivers-explained" },
  { title: "Farm-to-Market Roads Explained", description: "Understand the state highway designations that connected rural Texas—and why many are no longer rural at all.", to: "/article/texas-farm-to-market-roads-explained" },
  { title: "The Cultural Regions of Texas", description: "See how migration and settlement created distinct regional identities inside one enormous state.", to: "/article/texas-cultural-regions-explained" },
] as const;
const sportsTravelPicks = [
  { eyebrow: "Statewide directory", title: "Texas Sports Venues", description: "Browse verified stadium, arena, ballpark, racetrack, college and tournament venue guides from across Texas.", to: "/sports-venues" },
  { eyebrow: "North Texas", title: "Dallas–Fort Worth Sports Venues", description: "Plan around major-league stadiums, racing, college sports, golf and other sports destinations across DFW.", to: "/sports-venues/dallas-fort-worth" },
  { eyebrow: "Texas football", title: "Football Stadiums", description: "Find professional, college and high-school football venues, then open the individual guide for visitor planning.", to: "/sports-venues/football" },
  { eyebrow: "Race weekends", title: "Texas Motorsports Venues", description: "Explore major speedways, circuits and motorsports destinations with event-day planning context and official links.", to: "/sports-venues/motorsports" },
] as const;
const popularTexasSearches = [
  { title: "Best places to go camping in Texas", description: "Compare standout parks, regions, seasons and camping styles across the state.", to: "/best-places-to-go-camping-in-texas" },
  { title: "State Fair of Texas", description: "2026 dates, Fair Park planning, food, rides, Big Tex and visitor basics.", to: "/texas-state-fair" },
  { title: "Texas vs every other state", description: "Open the 49-state comparison hub for culture, geography, cost and quality-of-life context.", to: "/texas-vs-every-state" },
  { title: "Texas fishing license", description: "Requirements, endorsements, official purchase links and practical fishing-license guidance.", to: "/texas-fishing-license" },
  { title: "Texas driver license", description: "DPS renewals, appointments, REAL ID, replacements and address changes.", to: "/texas-drivers-license" },
  { title: "Texas flag", description: "History, Lone Star symbolism, display rules and related Texas symbols.", to: "/texas-flag" },
  { title: "Texas Two Step", description: "How the Texas Lottery game works, plus the path to Texas dance-hall culture.", to: "/texas-two-step" },
  { title: "Texas resources", description: "Start here for practical Texas services, moving, property, outdoors, culture and tools.", to: "/texas-resources" },
  { title: "Texas Outdoors & Wildlife", description: "Explore parks, trails, wildlife, birding, dark skies, rivers and public lands across Texas.", to: "/explore/outdoors" },
  { title: "Rio Grande River Guide", description: "Follow Texas' international river through its vast basin, desert country, reservoirs and border landscape.", to: "/article/texas-rio-grande-river-guide" },
  { title: "Texas Cities & Regions", description: "Compare major Texas cities and the regional differences that shape daily life, climate, culture and growth.", to: "/article/texas-major-cities-regional-differences" },
  { title: "Texas Lakes & Reservoirs", description: "Understand the reservoirs, river systems and water-supply geography behind the lakes Texans use most.", to: "/article/texas-lakes-reservoirs-explained" },
] as const;

export const Route = createLazyFileRoute("/")({ component: HomePage });

function HomePage() {
  const brand = useBrand();
  const { data: featured } = useSuspenseQuery(articlesQuery({ featured: true, limit: 5 }));
  const { data: latest } = useSuspenseQuery(articlesQuery({ limit: 16 }));
  const { data: destinations } = useSuspenseQuery(destinationsQuery({ limit: HOMEPAGE_DESTINATION_LIMIT }));
  const { data: roadTrips } = useSuspenseQuery(destinationsQuery({ category: "road-trips", limit: HOMEPAGE_ROAD_TRIP_LIMIT }));
  const { data: regions } = useSuspenseQuery(regionsQuery());
  const { data: guides } = useSuspenseQuery(guidesQuery());
  const { data: events } = useSuspenseQuery(eventsQuery({ limit: 4 }));
  const hero = featured[0];
  const editorPicks = featured.slice(1, 4);
  const featuredArticleIds = new Set(featured.map((article) => article.id));
  const uniqueLatest = latest.filter((article) => !featuredArticleIds.has(article.id));
  const explicitlyFeatured = destinations.filter((item) => item.featured);
  const featuredDestinations = (explicitlyFeatured.length ? explicitlyFeatured : destinations).slice(0, 4);
  const featuredIds = new Set(featuredDestinations.map((item) => item.id));
  const hiddenGems = destinations.filter((item) => !featuredIds.has(item.id)).slice(0, 3);
  const worthTheDrive = roadTrips[0] ?? destinations[0];
  const regionName = (id: string) => regions.find((region) => region.id === id)?.name;

  return <>
    <header className="border-b border-border bg-surface px-5 py-8 sm:px-8"><div className="mx-auto max-w-6xl"><p className="eyebrow text-primary">Texas Defined</p><h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">The places, stories & life of Texas</h1><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">Texas Defined is a guide to Texas places, culture, food, history, travel and practical living for Texans, newcomers and visitors.</p><dl className="mt-6 grid gap-5 md:grid-cols-2">{homepageFaqs.map((item) => <div key={item.question}><dt><h3 className="font-display text-lg font-semibold">{item.question}</h3></dt><dd className="mt-1 text-sm leading-6 text-muted-foreground">{item.answer}</dd></div>)}</dl></div></header>
    {hero && <FeatureHero variant="split" eyebrow="This month's feature" title={hero.title} dek={hero.dek} image={hero.hero} to="/article/$slug" params={{ slug: hero.slug }} meta={formatReadingTime(hero.readingMinutes)} />}
    {featuredDestinations.length > 0 && <Section><Container><SectionHeader eyebrow="Editor's picks" title="Places to put on your list" description="A considered mix of landscapes, towns and stops that show a different side of the state." actionLabel="Explore the full guide" actionTo="/explore" /><ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{featuredDestinations.map((destination) => <li key={destination.id}><DestinationCard destination={destination} tone="overlay" regionLabel={regionName(destination.region)} /></li>)}</ul></Container></Section>}
    {editorPicks.length > 0 && <Section tone="surface"><Container><SectionHeader eyebrow="From the editors" title="More stories from this issue" description="People, places and ideas that reveal something memorable about Texas." /><div className="mt-10 grid gap-8 lg:grid-cols-[1.45fr_1fr]"><ArticleCard article={editorPicks[0]} size="feature" /><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">{editorPicks.slice(1).map((article) => <ArticleCard key={article.id} article={article} size="compact" />)}</div></div></Container></Section>}
    <Section><Container><SectionHeader eyebrow="Texas Explained" title="Why Texas works the way it does" description="Ten connected guides to the water, roads, towns, landscapes, wildlife, homes, land and migration patterns behind everyday Texas." actionLabel="Read all 10 guides" actionTo="/texas-explained" /><ul className="mt-10 grid gap-0 border-y border-border md:grid-cols-3 md:divide-x md:divide-border">{texasExplainedPicks.map((pick, index) => <li key={pick.to} className={index > 0 ? "border-t border-border md:border-t-0" : undefined}><Link to={pick.to} className="group block h-full px-1 py-7 md:px-6"><p className="eyebrow text-primary">Guide {String(index + 1).padStart(2, "0")}</p><h3 className="mt-3 font-display text-2xl leading-tight transition-colors group-hover:text-primary">{pick.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{pick.description}</p><span className="eyebrow mt-5 inline-block text-primary">Read the guide →</span></Link></li>)}</ul></Container></Section>
    {brand.features.events && events.length > 0 && <Section><Container><SectionHeader eyebrow="On the calendar" title="What’s happening around Texas" description="Fairs, festivals, rodeos and local events worth putting on the calendar." actionLabel="See all events" actionTo="/events" /><div className="mt-8 grid gap-x-12 md:grid-cols-2">{events.map((event) => <EventCard key={event.id} event={event} regionLabel={regionName(event.region)} />)}</div></Container></Section>}
    <Section tone="surface"><Container><SectionHeader eyebrow="Texas sports travel" title="Make game day part of the trip" description="Start with a statewide venue directory, then narrow the trip by market or sport and open the individual venue guide for visitor-planning details." actionLabel="Browse all sports venues" actionTo="/sports-venues" /><ul className="mt-10 grid gap-0 border-y border-border sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">{sportsTravelPicks.map((pick, index) => <li key={pick.to} className={`${index > 0 ? "border-t border-border sm:border-t-0" : ""} ${index >= 2 ? "sm:border-t sm:border-border lg:border-t-0" : ""}`}><Link to={pick.to} className="group block h-full px-1 py-7 sm:px-5 lg:px-6"><p className="eyebrow text-primary">{pick.eyebrow}</p><h2 className="mt-3 font-display text-2xl leading-tight transition-colors group-hover:text-primary">{pick.title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{pick.description}</p><span className="eyebrow mt-5 inline-block text-primary">Open the guide →</span></Link></li>)}</ul></Container></Section>
    {worthTheDrive && <Section tone="surface"><Container><div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]"><img src={worthTheDrive.hero.src} alt={worthTheDrive.hero.alt} width={worthTheDrive.hero.width} height={worthTheDrive.hero.height} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" /><div><p className="eyebrow text-primary">Worth the drive</p><h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{worthTheDrive.name}</h2><p className="mt-5 text-base leading-7 text-muted-foreground">{worthTheDrive.summary}</p><Link to="/destination/$slug" params={{ slug: worthTheDrive.slug }} className="eyebrow mt-7 inline-block border-b-2 border-primary pb-1 text-primary">Plan the trip</Link></div></div></Container></Section>}
    {hiddenGems.length > 0 && <Section><Container><SectionHeader eyebrow="Beyond the usual" title="Take the long way" description="Quieter corners, overlooked stops and places that reward leaving the obvious route." /><ul className="mt-10 grid gap-8 md:grid-cols-[1.15fr_0.85fr]"><li className="md:row-span-2"><DestinationCard destination={hiddenGems[0]} tone="overlay" regionLabel={regionName(hiddenGems[0].region)} /></li>{hiddenGems.slice(1).map((destination) => <li key={destination.id}><DestinationCard destination={destination} regionLabel={regionName(destination.region)} /></li>)}</ul></Container></Section>}
    <Section><Container><SectionHeader eyebrow="Popular Texas searches" title="Texas answers people are looking for" description="Direct paths to the practical guides, traditions and statewide topics readers search for most often." actionLabel="Open all Texas resources" actionTo="/texas-resources" /><ul className="mt-10 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">{popularTexasSearches.map((item) => <li key={item.to} className="border-b border-border sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+4)]:border-b-0"><Link to={item.to} className="group block h-full px-1 py-6 sm:px-5"><h2 className="font-display text-xl leading-tight transition-colors group-hover:text-primary">{item.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p><span className="eyebrow mt-4 inline-block text-primary">Open guide →</span></Link></li>)}</ul></Container></Section>
    <Section tone="surface"><Container><div className="grid gap-8 border-y border-border py-9 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center"><div className="max-w-3xl"><p className="eyebrow text-primary">Start here</p><h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Need a Texas answer, not another destination?</h2><p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">Start with practical guides for moving, property taxes, state agencies, official records and the everyday questions that come with living in Texas.</p></div><Link to="/texas-resources" className="group border-l-2 border-primary pl-6"><span className="font-display text-2xl leading-tight transition-colors group-hover:text-primary">Texas Resources &amp; State Agencies</span><span className="eyebrow mt-4 block text-primary">Open Start Here →</span></Link></div></Container></Section>
    {brand.features.guides && guides.length > 0 && <Section tone="surface"><Container><SectionHeader eyebrow="Texas Life" title="The practical side of living here" description="Homes, moving, money and useful answers for making Texas home." actionLabel="Browse the guidebook" actionTo="/guides" /><ul className="mt-10 grid gap-6 md:grid-cols-3">{guides.slice(0, 3).map((guide) => <li key={guide.id}><GuideCard guide={guide} /></li>)}</ul></Container></Section>}
    {uniqueLatest.length > 0 && <Section><Container><SectionHeader eyebrow="Latest" title="New from Texas Defined" description="The newest stories, destinations and guides from across the state." /><ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{uniqueLatest.slice(0, 8).map((article) => <li key={article.id}><ArticleCard article={article} size="compact" /></li>)}</ul></Container></Section>}
  </>;
}
