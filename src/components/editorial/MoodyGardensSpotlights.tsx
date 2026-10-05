import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { recoverOrHideImage } from "@/lib/image-fallback";

const cards = [
  {
    eyebrow: "Best first stop",
    title: "Aquarium Pyramid",
    description: "Make this the first priority for the broadest animal-focused experience: marine habitats, penguins, seals, sharks and regional ocean exhibits in a fully indoor setting.",
    detail: "Best for: first-time visitors · families · rainy or hot days",
    href: "https://www.moodygardens.com/attractions/aquarium-pyramid",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Moody_Gardens_Aquarium_Pyramid_HDR_Galveston_(6971130700).jpg?width=1200",
    alt: "The blue Aquarium Pyramid at Moody Gardens in Galveston",
    credit: "Katie Haugland Bowen · CC BY 2.0 · Wikimedia Commons",
  },
  {
    eyebrow: "Best second stop",
    title: "Rainforest Pyramid",
    description: "Pair it with the aquarium for the strongest two-attraction visit. The warm indoor rainforest has tropical plants, birds and other wildlife in a very different environment.",
    detail: "Best for: wildlife · photography · a two-pyramid day",
    href: "https://www.moodygardens.com/attractions/rainforest-pyramid",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Moody_Gardens_Rainforest_Pyramid_(14248736931).jpg?width=1200",
    alt: "The glass Rainforest Pyramid at Moody Gardens in Galveston",
    credit: "Lydia Liu · CC BY 2.0 · Wikimedia Commons",
  },
  {
    eyebrow: "Current status",
    title: "Discovery Museum",
    description: "Temporarily closed as of October 5, 2026 and scheduled to reopen in November. Do not build a package around it until Moody Gardens confirms the reopening.",
    detail: "Audience Recognition Theater remains open with regular showtimes.",
    href: "https://www.moodygardens.com/visitor-info/hours",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Discovery_Pyramid_Moody_Gardens.jpg?width=1200",
    alt: "The Discovery Pyramid at Moody Gardens in Galveston",
    credit: "Supportstorm · public domain · Wikimedia Commons",
  },
  {
    eyebrow: "Stay on site",
    title: "Moody Gardens Hotel",
    description: "Staying on the property makes the most sense for a full-day visit, holiday programming or families who want to minimize driving between the hotel and attractions.",
    detail: "Best for: Holiday in the Gardens · multi-day family trips",
    href: "https://www.moodygardens.com/stay",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Moody_Gardens_Hotel_pool_at_night_6-10.jpg?width=1200",
    alt: "The Moody Gardens Hotel pool area at night",
    credit: "Supportstorm · CC BY 3.0 · Wikimedia Commons",
  },
] as const;

const currentNotes = [
  { label: "Discovery Museum", value: "Closed now; scheduled to reopen in November 2026." },
  { label: "Parking", value: "Standard self-parking is free; upgraded parking options cost extra." },
  { label: "Holiday season", value: "Holiday in the Gardens runs Nov. 21, 2026 through Jan. 2, 2027." },
  { label: "Before you buy", value: "Check the official daily schedule because attraction and theater hours can differ." },
] as const;

const itineraries = [
  {
    time: "About 2 hours",
    title: "Pick one pyramid",
    copy: "Choose the Aquarium Pyramid for the strongest first visit, or the Rainforest Pyramid if tropical wildlife is the priority. Do not buy a broad package just to rush through it.",
  },
  {
    time: "About 4 hours",
    title: "Do the two pyramids",
    copy: "Aquarium + Rainforest is the best default plan for most first-time visitors. Add a theater only if the showtime fits naturally rather than forcing the schedule.",
  },
  {
    time: "About 6+ hours",
    title: "Build a full Moody Gardens day",
    copy: "Add a theater, seasonal attraction or meal after the two pyramids. This is the point where a combination pass can become more useful than separate admissions.",
  },
] as const;

export function MoodyGardensSpotlights() {
  return <>
    <Section className="py-10 sm:py-12 lg:py-14" tone="surface">
      <Container>
        <SectionHeader
          eyebrow="Plan the day"
          title="How to visit Moody Gardens without wasting time or ticket money"
          description="Start with the Aquarium and Rainforest Pyramids. Add theaters, seasonal attractions or a hotel stay only when the schedule has room."
        />

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {currentNotes.map((note) => <div key={note.label} className="border-t-2 border-primary bg-background px-5 py-5 shadow-sm">
            <p className="eyebrow text-primary">{note.label}</p>
            <p className="mt-3 text-sm leading-6 text-foreground/85">{note.value}</p>
          </div>)}
        </div>

        <div className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => <article key={card.title} className="overflow-hidden border border-border bg-background shadow-sm">
            <a href={card.href} target="_blank" rel="noreferrer noopener" className="group block">
              <figure data-image-frame className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img src={card.image} alt={card.alt} width={1200} height={900} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.025]" onError={(event) => recoverOrHideImage(event.currentTarget)} />
              </figure>
              <div className="p-5">
                <p className="eyebrow text-primary">{card.eyebrow}</p>
                <h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.description}</p>
                <p className="mt-4 border-t border-border pt-4 text-xs font-medium leading-5 text-foreground/80">{card.detail}</p>
                <p className="mt-4 text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">Photo: {card.credit}</p>
                <span className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Official details</span>
              </div>
            </a>
          </article>)}
        </div>
      </Container>
    </Section>

    <Section className="py-10 sm:py-12 lg:py-14">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-primary">Ticket decision</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Single attraction or combination pass?</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
              Buy for the itinerary you will actually complete. Choose a single-attraction ticket for a short stop; consider a combination package only when you have time for several operating attractions.
            </p>
            <div className="mt-6 border-l-2 border-primary pl-5">
              <strong className="font-display text-xl">Best first-time default</strong>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Plan Aquarium + Rainforest first, then compare package pricing only if you are adding a theater or seasonal attraction.</p>
            </div>
            <a href="https://www.moodygardens.com/visitor-info/hours" target="_blank" rel="noreferrer noopener" className="eyebrow mt-7 inline-block border-b border-primary pb-1 text-primary">
              Check today’s official hours and admission
            </a>
          </div>

          <div>
            <p className="eyebrow text-primary">Choose by time</p>
            <div className="mt-4 divide-y divide-border border-y border-border">
              {itineraries.map((item) => <article key={item.time} className="grid gap-3 py-5 sm:grid-cols-[9rem_1fr]">
                <p className="eyebrow text-primary">{item.time}</p>
                <div>
                  <h3 className="font-display text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.copy}</p>
                </div>
              </article>)}
            </div>
          </div>
        </div>
      </Container>
    </Section>

    <Section className="py-10 sm:py-12 lg:py-14" tone="surface">
      <Container>
        <SectionHeader
          eyebrow="Build the Galveston day"
          title="What to pair with Moody Gardens"
          description="Keep the pairings intentional: beach and amusement activity to the east, nature farther west, or historic Galveston on a second half-day."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Link to="/destination/$slug" params={{ slug: "pleasure-pier" }} className="group border-t border-border pt-5">
            <p className="eyebrow text-primary">Gulf-front energy</p>
            <h3 className="mt-2 font-display text-2xl group-hover:text-primary">Pleasure Pier</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Pair indoor pyramids with rides, games and the Seawall when you want a very different second stop.</p>
          </Link>
          <Link to="/destination/$slug" params={{ slug: "galveston-island-state-park" }} className="group border-t border-border pt-5">
            <p className="eyebrow text-primary">Quieter coast</p>
            <h3 className="mt-2 font-display text-2xl group-hover:text-primary">Galveston Island State Park</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Best add-on when you want beach, bay, paddling or nature instead of another built attraction.</p>
          </Link>
          <Link to="/search" search={{ q: "The Strand Galveston" }} className="group border-t border-border pt-5">
            <p className="eyebrow text-primary">Historic Galveston</p>
            <h3 className="mt-2 font-display text-2xl group-hover:text-primary">The Strand and downtown</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Use a separate half-day for architecture, museums, shops and the historic core instead of cramming it into a rushed Moody Gardens visit.</p>
          </Link>
        </div>
      </Container>
    </Section>
  </>;
}
