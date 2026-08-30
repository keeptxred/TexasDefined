import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/texas-unique-lodging")({ component: TexasUniqueLodgingPage });

const stays = [
  {
    name: "Indian Lodge · Davis Mountains",
    eyebrow: "Historic full-service lodge",
    body: "Indian Lodge is a 39-room hotel inside Davis Mountains State Park, with white adobe walls and direct access to the mountain landscape. It works differently from a cabin rental: the lodge itself can be the destination, while trails, Fort Davis, McDonald Observatory and the wider Davis Mountains become the surrounding itinerary.",
    source: "https://tpwd.texas.gov/state-parks/indian-lodge",
  },
  {
    name: "San Solomon Motor Courts · Balmorhea",
    eyebrow: "CCC-era motor courts",
    body: "Balmorhea State Park's San Solomon Motor Courts turn a spring-fed swimming trip into an overnight historic stay. Texas Parks and Wildlife identifies the lodging as Civilian Conservation Corps-built motor-court rooms, so the appeal is not a generic motel room: it is sleeping inside the same historic park landscape built around San Solomon Springs.",
    source: "https://tpwd.texas.gov/state-parks/balmorhea/fees-facilities/motel-rooms",
  },
  {
    name: "Bastrop State Park cabins · Lost Pines",
    eyebrow: "1930s CCC cabins",
    body: "Bastrop's cabins were built in the 1930s by the Civilian Conservation Corps and are intentionally preserved with much of their period character. This is a useful choice for travelers who want architecture and state-park history to be part of the overnight experience rather than merely a place to sleep near the Lost Pines.",
    source: "https://tpwd.texas.gov/state-parks/bastrop/fees-facilities/cabins",
  },
  {
    name: "Caddo Lake State Park cabins · Piney Woods",
    eyebrow: "Historic cabins in cypress country",
    body: "Caddo Lake pairs historic cabins with one of the most visually distinctive landscapes in Texas: bald cypress, bayous and paddling water. The cabin inventory varies in capacity and amenities, making the official lodging page essential before booking, but the larger planning idea is simple—stay where the lake, forest and CCC-era park architecture are part of the same trip.",
    source: "https://tpwd.texas.gov/state-parks/caddo-lake/fees-facilities/caddo-lodging",
  },
  {
    name: "Palo Duro Canyon cabins and glamping · Panhandle",
    eyebrow: "Canyon-rim cabins and luxury camping",
    body: "Palo Duro offers several genuinely different overnight experiences, including CCC-built rim cabins, simpler Cow Camp cabins and a privately operated glamping option listed by the park. The rim cabins make the canyon view part of the lodging itself, while Cow Camp and glamping serve different comfort levels. Confirm the exact facility rules and reservation channel before planning around any one option.",
    source: "https://tpwd.texas.gov/state-parks/palo-duro-canyon/fees-facilities/cabins",
  },
] as const;

function TexasUniqueLodgingPage() {
  return <>
    <section className="border-b border-border bg-surface"><Container className="py-14 sm:py-20 lg:py-24">
      <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"><Link to="/">Home</Link> <span aria-hidden> / </span><Link to="/explore">Explore</Link> <span aria-hidden> / </span><span aria-current="page">Unique Lodging</span></nav>
      <p className="eyebrow mt-10 text-primary">Historic stays · park lodges · cabins</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Stay somewhere that is part of the Texas destination</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Texas has thousands of hotels, rentals and resorts. This is deliberately not a statewide hotel ranking. It is a visitor guide to distinctive lodging where the building, park or landscape materially changes the trip: a historic adobe lodge in the Davis Mountains, CCC motor courts beside a desert spring, 1930s cabins in the Lost Pines, cabins in Caddo Lake's cypress country and lodging on the rim of Palo Duro Canyon.</p>
    </Container></section>

    <section className="border-b border-border bg-background"><Container className="py-12 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14"><div><p className="eyebrow text-primary">What qualifies</p><h2 className="mt-3 font-display text-4xl">The stay has to add something to the place</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">A lodging property belongs here when its history, architecture, public-land setting or unusual location is part of the travel experience. That keeps the guide useful and prevents it from becoming an unstable directory of every hotel with a clever marketing description.</p><p className="mt-3 text-sm leading-7 text-muted-foreground">Availability, room configurations, prices, reservation rules and temporary closures change. Texas Defined does not freeze those details into evergreen copy. Use the operator's current page as the final authority before booking.</p></div>
      <div className="grid gap-px border border-border bg-border md:grid-cols-2">{stays.map((stay) => <article key={stay.name} className="bg-background p-6"><p className="eyebrow text-primary">{stay.eyebrow}</p><h3 className="mt-2 font-display text-2xl">{stay.name}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{stay.body}</p><a href={stay.source} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary">Official lodging information ↗</a></article>)}</div></div>
    </Container></section>

    <section className="border-b border-border bg-surface"><Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Choose by experience</p><h2 className="mt-3 max-w-4xl font-display text-4xl">Five stays, five different reasons to book them</h2>
      <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        <article className="bg-background p-6"><h3 className="font-display text-2xl">For a lodge-centered trip</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Indian Lodge is the clearest fit. The historic hotel, mountain setting, pool and nearby Davis Mountains activities make the lodging itself a major piece of the itinerary.</p></article>
        <article className="bg-background p-6"><h3 className="font-display text-2xl">For water plus history</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Balmorhea combines CCC-era motor courts with San Solomon Springs, making the overnight stay part of a spring-fed West Texas trip rather than a separate lodging stop.</p></article>
        <article className="bg-background p-6"><h3 className="font-display text-2xl">For CCC architecture</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Bastrop's preserved 1930s cabins put New Deal-era park craftsmanship at the center of a Lost Pines weekend.</p></article>
        <article className="bg-background p-6"><h3 className="font-display text-2xl">For swamp and forest atmosphere</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Caddo Lake's historic cabins work because the overnight stay remains inside the lake-and-cypress environment that brings visitors there in the first place.</p></article>
        <article className="bg-background p-6"><h3 className="font-display text-2xl">For a dramatic view</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Palo Duro's rim cabins place guests directly on one of Texas's signature landscapes; its Cow Camp and glamping options broaden the comfort and experience range.</p></article>
        <article className="bg-background p-6"><h3 className="font-display text-2xl">For a road-trip pair</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Indian Lodge and Balmorhea are especially useful as complementary West Texas stays: mountains and adobe at one stop, spring-fed desert history at the other.</p></article>
      </div>
    </Container></section>

    <section className="border-b border-border bg-background"><Container className="py-12 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-2"><article><p className="eyebrow text-primary">Before booking</p><h2 className="mt-3 font-display text-3xl">Read the facility page, not just the destination page</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Historic cabins can have unusual check-in procedures, linen policies, cooking restrictions, accessibility differences, minimum stays or arrival-day limits. A park can be open while a particular lodging building is unavailable. Confirm the exact facility page and reservation system close to travel.</p><p className="mt-3 text-sm leading-7 text-muted-foreground">Also separate park admission from lodging. State-park entrance requirements and facility charges can be distinct, and policies may change.</p></article>
      <article><p className="eyebrow text-primary">Build around the stay</p><h2 className="mt-3 font-display text-3xl">Do not spend the whole trip driving away from what you booked</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Distinctive lodging earns its value when the surrounding day matches it. Pair Indian Lodge with Fort Davis and mountain country, Balmorhea with springs and West Texas driving, Bastrop with Lost Pines and Central Texas, Caddo Lake with paddling and Piney Woods, and Palo Duro with canyon trails and Panhandle travel.</p></article></div>
    </Container></section>

    <section className="border-b border-border bg-surface"><Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Keep planning</p><h2 className="mt-3 font-display text-3xl">Connect the overnight to the rest of Texas</h2>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to="/explore/state-parks" className="text-primary">Texas state parks →</Link><Link to="/texas-history" className="text-primary">Texas history →</Link><Link to="/texas-old-west" className="text-primary">Old West & ranch country →</Link><Link to="/explore/road-trips" className="text-primary">Road trips →</Link><Link to="/browse/cities" className="text-primary">Cities & towns →</Link><Link to="/explore/trip-planner" className="text-primary">Texas Trip Planner →</Link></div>
    </Container></section>

    <section className="bg-background"><Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">First-party lodging sources</p><h2 className="mt-3 font-display text-3xl">Check current availability with Texas Parks & Wildlife</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Each stay above is documented by Texas Parks and Wildlife. These pages are the source of truth for current room or cabin types, reservations, restrictions, alerts and operating changes. Source review: August 30, 2026.</p>
      <ul className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-2">{stays.map((stay) => <li key={stay.source}><a href={stay.source} target="_blank" rel="noreferrer" className="text-primary">{stay.name} — official lodging page ↗</a></li>)}</ul>
    </Container></section>
  </>;
}
