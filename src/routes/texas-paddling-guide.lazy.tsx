import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

const officialSources = [
  { label: "Texas Parks & Wildlife — Texas Paddling Trails", href: "https://tpwd.texas.gov/boating/paddling-trails/", note: "Statewide official trail system, trail finder and regional planning entry point." },
  { label: "Texas Parks & Wildlife — Lady Bird Lake Paddling Trail", href: "https://tpwd.texas.gov/boating/paddling-trails/hill-country/lady-bird-lake/", note: "Official access points, route lengths, float-time context, wind and water-level guidance for Austin." },
  { label: "Texas Parks & Wildlife — Buffalo Bayou Paddling Trail", href: "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/", note: "Official Houston access points, segment timing, water-quality notes and trail map guidance." },
  { label: "Texas Parks & Wildlife — Bosque Bluffs & Brazos Bridges", href: "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bosque-bluffs-and-brazos-bridges/", note: "Official Waco trail access, route design and high-flow/rainfall cautions." },
  { label: "Texas Parks & Wildlife — Hell's Half Acre Paddling Trail", href: "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/hells-half-acre/", note: "Official Caddo Lake access, route markers, variable-water-level and motorboat-traffic guidance." },
  { label: "Texas Parks & Wildlife — Lighthouse Lakes Paddling Trail", href: "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/lighthouse-lakes/", note: "Official coastal loop, access, navigation and seagrass-conservation guidance near Aransas Pass." },
] as const;

const trails = [
  {
    name: "Lady Bird Lake Paddling Trail",
    region: "Austin · Hill Country",
    summary: "An urban Colorado River reservoir with multiple public access points and several loop options rather than one fixed start-to-finish trip.",
    details: [
      "TPWD describes roughly 11 miles of total paddling with shorter loops around Tom Miller Dam, Barton Springs and Festival Beach. Multiple access points make it easier to scale the outing to time and conditions instead of treating the entire lake as one mandatory route.",
      "Wind speed and water levels affect float time, so a saved estimate should not control the day. Check current weather and local water conditions before launching, and use the official access list rather than assuming every shoreline point is a legal put-in or takeout.",
    ],
  },
  {
    name: "Buffalo Bayou Paddling Trail",
    region: "Houston · Gulf Coast",
    summary: "A 26-mile urban bayou trail designed to be paddled in segments between numerous public access points.",
    details: [
      "TPWD says the full trail is too long for a typical one-day paddle and publishes access points and estimated segment times from Highway 6 to Allen's Landing. That makes shuttle and takeout planning part of the trip before anyone gets on the water.",
      "Water level, flow and water quality can vary. TPWD notes that swimming is generally unsuitable on the bayou, so visitors should treat paddling access and contact with the water as separate planning questions and check current conditions after storms or high runoff.",
    ],
  },
  {
    name: "Bosque Bluffs & Brazos Bridges Paddling Trails",
    region: "Waco · Prairies and Lakes",
    summary: "Two accessible urban river routes with loop-style options and official warnings about rainfall-driven flow changes.",
    details: [
      "The Waco trails use established access points on the Bosque and Brazos and were designed to support relatively straightforward day outings. Their urban setting does not remove river risk: TPWD specifically warns that heavy rain and high water can create dangerous conditions.",
      "Use the current trail map and river information before launching. Rainfall runoff can also temporarily affect water quality, so same-day conditions matter more than an itinerary built around normal flow assumptions.",
    ],
  },
  {
    name: "Hell's Half Acre Paddling Trail",
    region: "Caddo Lake · Piney Woods",
    summary: "An 8.8-mile loop through Big Cypress Bayou and Caddo Lake's bald-cypress swamp, with marked boat roads and highly variable water levels.",
    details: [
      "TPWD marks the route with reflective arrows and notes that the trail shares portions of the Caddo Lake boat-road network. Water levels can change access and motorboat traffic can be seasonally heavy, so the swamp should not be treated like a static flatwater maze.",
      "Private-property boundaries, surrounding wildlife-management land and seasonal hunting activity add planning context. Follow the marked route and current TPWD guidance rather than wandering onto adjacent banks or assuming every visible channel is part of the certified trail.",
    ],
  },
  {
    name: "Lighthouse Lakes Paddling Trail",
    region: "Aransas Pass · Gulf Coast",
    summary: "The first Texas Paddling Trail, built as a series of coastal loops through mangroves, seagrass flats, sloughs and back lakes.",
    details: [
      "TPWD lists four loops ranging from short outings to longer coastal paddles. Tides, wind and open-water exposure make current marine conditions part of launch planning even when the mapped route itself is familiar.",
      "The trail lies within the Redfish Bay State Scientific Area, where seagrass protection matters. Use the official route and access guidance and avoid treating shallow flats as unrestricted shortcuts simply because they appear passable.",
    ],
  },
] as const;

const planningPaths = [
  { to: "/explore/lakes-rivers", label: "Lakes & rivers", description: "Put official paddling trails inside the broader Texas waterway and access picture." },
  { to: "/explore/outdoors", label: "Outdoors & wildlife", description: "Connect paddling to weather, habitat, public-land access and seasonal conditions." },
  { to: "/explore/state-parks", label: "Texas state parks", description: "Find managed public-water access, camping and park-specific paddling opportunities." },
  { to: "/fishing", label: "Texas fishing", description: "Pair paddling destinations with current fishing regulations and waterbody guidance." },
  { to: "/explore/beaches-coast", label: "Beaches & Gulf Coast", description: "Plan coastal paddles around bays, barrier islands, wind and marine conditions." },
  { to: "/explore/trip-planner", label: "Texas Trip Planner", description: "Sequence launches, takeouts, shuttles, lodging and nearby stops around realistic drive times." },
] as const;

export const Route = createLazyFileRoute("/texas-paddling-guide")({ component: TexasPaddlingGuidePage });

function TexasPaddlingGuidePage() {
  return (
    <main className="pb-20">
      <Container className="pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Front page</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/explore" className="hover:text-foreground">Explore Texas</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/explore/lakes-rivers" className="hover:text-foreground">Lakes &amp; Rivers</Link>
        </nav>
      </Container>

      <Container className="pt-10">
        <article className="mx-auto max-w-5xl">
          <header className="border-b border-border pb-10">
            <p className="eyebrow text-primary">Official trails · access points · current conditions</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas Paddling Guide</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A visitor-first guide to five official paddling trails, with the launch, takeout, water-level, wind, private-property and current-condition questions to resolve before getting on the water.</p>
          </header>

          <section className="border-b border-border py-9" aria-labelledby="quick-answer">
            <p className="eyebrow text-primary">Quick answer</p>
            <h2 id="quick-answer" className="mt-2 font-display text-3xl">Choose the waterbody first, then verify today's conditions</h2>
            <p className="mt-4 max-w-4xl text-base leading-8">Texas Parks &amp; Wildlife maintains more than 100 certified paddling trails across rivers, lakes, bayous and bays. The map gives you the route; current wind, flow, water level, weather, launch access and land-manager notices decide whether that route makes sense today.</p>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="safety-boundary">
            <p className="eyebrow text-primary">Safety boundary</p>
            <h2 id="safety-boundary" className="mt-2 font-display text-3xl">This is trip planning, not paddling instruction</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Paddling can result in drowning, cold-water exposure, heat illness or other serious injury. This guide does not teach strokes, bracing, rescues, surf launches, rapid running, capsize recovery, navigation in fog, open-water crossing technique or how to judge a boat's seaworthiness.</p>
              <p>Use an appropriate personal flotation device and follow current legal and land-manager requirements. Postpone or change a trip when wind, thunderstorms, flood flows, tides, water quality, heat, visibility or access conditions no longer fit the paddler, craft or route.</p>
            </div>
          </section>

          <div>
            {trails.map((trail, index) => (
              <section key={trail.name} className="grid gap-6 border-b border-border py-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
                <div>
                  <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")} · {trail.region}</p>
                  <h2 className="mt-2 font-display text-3xl leading-tight">{trail.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{trail.summary}</p>
                </div>
                <div className="max-w-3xl space-y-5">
                  {trail.details.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-muted-foreground">{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>

          <section className="border-b border-border py-10" aria-labelledby="planning">
            <p className="eyebrow text-primary">Keep planning</p>
            <h2 id="planning" className="mt-2 font-display text-3xl">Build the paddle into the wider Texas trip</h2>
            <nav aria-label="Texas paddling related guides" className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {planningPaths.map((item) => (
                <Link key={item.to} to={item.to} className="group bg-background p-5">
                  <strong className="font-display text-xl group-hover:text-primary">{item.label}</strong>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span>
                </Link>
              ))}
            </nav>
          </section>

          <section className="py-10" aria-labelledby="sources">
            <p className="eyebrow text-primary">Official sources</p>
            <h2 id="sources" className="mt-2 font-display text-3xl">Verify access and conditions with TPWD</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Access points, route conditions, water levels, private-property boundaries and operating guidance can change. These first-party sources support this guide and should control current trip decisions. Source review: August 30, 2026.</p>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {officialSources.map((source) => (
                <li key={source.href} className="py-4">
                  <a href={source.href} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{source.note}</p>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </Container>
    </main>
  );
}
