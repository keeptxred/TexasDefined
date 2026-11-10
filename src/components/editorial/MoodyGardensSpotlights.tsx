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
    eyebrow: "Best for younger kids",
    title: "Discovery Pyramid & Children\'s Museum",
    description: "The Galveston Children\'s Museum is now open upstairs with hands-on STEM, maker and imaginative-play activities. The interactive Audience Recognition Theater is downstairs.",
    detail: "Operator-confirmed on Nov. 9, 2026 · Check the day\'s hours and ticket terms",
    href: "https://www.moodygardens.com/attractions/discovery-pyramid",
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
  { label: "Discovery Pyramid", value: "Galveston Children\'s Museum open during attraction hours; check daily schedule." },
  { label: "Parking", value: "Standard self-parking is free; upgraded parking options cost extra." },
  { label: "Holiday season", value: "Holiday in the Gardens runs Nov. 21, 2026 through Jan. 2, 2027." },
  { label: "Before you buy", value: "Check the official daily schedule and price by age; Palm Beach is seasonal." },
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
    copy: "Add a theater, the Discovery Pyramid, a meal or an in-season attraction after your priority pyramids. Check the Value Pass inclusions against the activities actually open that day.",
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
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.detail}</p>
                <p className="mt-5 text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">Photo: {card.credit}</p>
                <span className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Official details</span>
              </div>
            </a>
          </article>)}
        </div>
      </Container>
    </Section>

    <Section className="py-10 sm:py-12 lg:py-14">
      <Container>
        <div className="grid gap-7 sm:grid-cols-2">
          <div>
            <p className="eyebrow text-primary">Ticket decision</p>
            <h2 className="mt-3 font-display text-2xl leading-tight">Single attraction or combination pass?</h2>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Buy for the itinerary you can actually complete. Moody Gardens offers individual-attraction admission, a combined Aquarium + Rainforest ticket and a broader Value Pass. Compare the eligible attractions and date-specific checkout totals before you pay: a Value Pass is not automatically the best deal for a shorter stop.
            </p>
            <div className="mt-5 border-t-2 border-primary py-5">
              <strong className="font-display text-2xl">Best first-time default</strong>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Plan the Aquarium and Rainforest first for a wildlife-focused visit. Families with younger kids may prefer the Galveston Children\'s Museum in the Discovery Pyramid instead of a second wildlife stop.</p>
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <h3 className="font-display text-xl">What a family of four should compare</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                For two adults and two children ages 4–12, price the exact attractions you will visit:
                two adult tickets and two child tickets for each separate attraction, or
                the four-person Aquarium + Rainforest combination when those are your two
                stops, versus two adult Value Passes plus two child Value Passes.
                Select the lower total that actually covers your itinerary. Children 3 and under are admitted
                free with a regularly priced ticket, and senior (65+) and other discounts
                may change the comparison. Taxes, promotions and pass inclusions can change;
                use the official checkout for the actual amounts.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                <a href="https://tickets.moodygardens.com/webstore/shop/viewitems.aspx?c=admission&cg=ti" target="_blank" rel="noreferrer noopener" className="text-sm font-semibold text-primary underline underline-offset-4">Compare official ticket prices and Value Pass</a>
                <a href="https://www.moodygardens.com/visitor-info/faq" target="_blank" rel="noreferrer noopener" className="text-sm font-semibold text-primary underline underline-offset-4">Review age categories and ticket terms</a>
              </div>
            </div>
            <a href="https://www.moodygardens.com/visitor-info/hours" target="_blank" rel="noreferrer noopener" className="eyebrow mt-7 inline-block border-b border-primary pb-1 text-primary">
              Check today’s official operating hours
            </a>
          </div>

          <div>
            <p className="eyebrow text-primary">Choose by time</p>
            <div className="mt-5 grid gap-4">
              {itineraries.map((item) => <article key={item.time} className="border border-border p-5">
                <p className="eyebrow text-primary">{item.time}</p>
                <div className="mt-2">
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
          eyebrow="Practical visitor details"
          title="Parking, food and accessibility"
          description="A few operator policies can save money and prevent surprises on arrival."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="border border-border bg-background p-5">
            <h3 className="font-display text-xl">Parking & payment</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Standard self-parking is free. Premium covered, temporary day and valet parking are optional paid upgrades. Moody Gardens reports cashless credit-card transactions, so check accepted payment methods before departure.</p>
            <a href="https://www.moodygardens.com/visitor-info/map-directions" target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Official parking and directions</a>
          </div>
          <div className="border border-border bg-background p-5">
            <h3 className="font-display text-xl">Food & breaks</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Outside food is not allowed inside paid attractions. You can bring your own meal for outdoor picnic tables and benches, or use on-site dining. Build a meal break into a four-hour or longer visit.</p>
            <a href="https://www.moodygardens.com/visitor-info/faq" target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Official visitor policies</a>
          </div>
          <div className="border border-border bg-background p-5">
            <h3 className="font-display text-xl">Access & accommodations</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Free wheelchairs are available first-come at the Visitor Center and Aquarium Pyramid with a driver's-license deposit. Theaters offer wheelchair seating and captioning devices on request. Service animals cannot enter the Rainforest Pyramid.</p>
            <a href="https://www.moodygardens.com/visitor-info/accessibility" target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Official accessibility details</a>
          </div>
        </div>
        <p className="mt-5 text-xs leading-5 text-muted-foreground">TexasDefined Editorial Desk independently checked these operator-published visitor facts on November 9, 2026. Attraction hours, ticket prices and seasonal availability are controlled by Moody Gardens and may change after review.</p>
      </Container>
    </Section>

    <Section className="py-10 sm:py-12 lg:py-14" tone="surface">
      <Container>
        <SectionHeader
          eyebrow="Build the Galveston day"
          title="What to pair with Moody Gardens"
          description="Keep the pairings intentional: beach and amusement activity to the east, nature farther west, or historic Galveston on a second half-day."
        />
        <div className="mt-7 grid gap-7 md:grid-cols-3">
          <Link to="/destination/$slug" params={{ slug: "galveston-island-historic-pleasure-pier" }} className="group border border-border p-5">
            <p className="eyebrow text-primary">Gulf-front energy</p>
            <h3 className="mt-2 font-display text-2xl group-hover:text-primary">Pleasure Pier</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Pair indoor pyramids with rides, games and the Seawall when you want a very different second stop.</p>
          </Link>
          <Link to="/destination/$slug" params={{ slug: "galveston-island-state-park" }} className="group border border-border p-5">
            <p className="eyebrow text-primary">Quieter coast</p>
            <h3 className="mt-2 font-display text-2xl group-hover:text-primary">Galveston Island State Park</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Best add-on when you want beach, bay, paddling or nature instead of another built attraction.</p>
          </Link>
          <Link to="/destination/$slug" params={{ slug: "strand-historic-district" }} className="group border border-border p-5">
            <p className="eyebrow text-primary">Historic Galveston</p>
            <h3 className="mt-2 font-display text-2xl group-hover:text-primary">The Strand and downtown</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Use a separate half-day for architecture, museums, shops and the historic core instead of cramming it into a rushed Moody Gardens visit.</p>
          </Link>
        </div>
      </Container>
    </Section>
  </>;
}
