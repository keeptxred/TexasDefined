import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { recoverOrHideImage } from "@/lib/image-fallback";
import { isMoodyGardensNov16NoticeActive, moodyGardensNov16Notice } from "@/data/moody-gardens-visit-notice";
import { moodyGardensEditorialDates } from "@/data/destination-curation-moody-gardens";

const cards = [
  {
    eyebrow: "Best first stop",
    title: "Aquarium Pyramid",
    description: "Choose this for ocean-life galleries, penguins, seals, sharks and the Jellyfish Gallery. Its Coral Reef Lab also connects Gulf conservation with the Flower Garden Banks sanctuary.",
    detail: "Best for: marine-life watchers · penguins and reef science · rainy days",
    href: "https://www.moodygardens.com/attractions/aquarium-pyramid",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Moody_Gardens_Aquarium_Pyramid_HDR_Galveston_(6971130700).jpg?width=1200",
    alt: "The blue Aquarium Pyramid at Moody Gardens in Galveston",
    credit: "Katie Haugland Bowen · CC BY 2.0 · Wikimedia Commons",
  },
  {
    eyebrow: "Best second stop",
    title: "Rainforest Pyramid",
    description: "Choose this for a warmer, humid walk through canopy and forest-floor habitats, free-roaming birds, giant river otters and a dimly lit Nightfall exhibit.",
    detail: "Best for: tropical ecology · birdwatching · visitors comfortable with warm, humid spaces",
    href: "https://www.moodygardens.com/attractions/rainforest-pyramid",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Moody_Gardens_Rainforest_Pyramid_(14248736931).jpg?width=1200",
    alt: "The glass Rainforest Pyramid at Moody Gardens in Galveston",
    credit: "Lydia Liu · CC BY 2.0 · Wikimedia Commons",
  },
  {
    eyebrow: "Best for younger kids",
    title: "Discovery Pyramid & Children's Museum",
    description: "Upstairs, the children's museum has Our Town fishing-boat play and Room to Grow, a calmer area for ages 2–5. Downstairs, the 20,000 Leagues interactive theater adds a 3D/4D submarine adventure.",
    detail: "Museum ages 2+: covered membership, museum-inclusive ticket or separate admission · Check theater ticket and showtime separately",
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

const itineraries = [
  {
    time: "About 2 hours",
    title: "Pick one pyramid",
    copy: "Pick Aquarium for marine animals and coral-reef exhibits, or Rainforest for canopy birds and tropical habitats. For toddlers who prefer hands-on play, consider the museum instead; confirm the correct admission.",
  },
  {
    time: "About 4 hours",
    title: "Do the two pyramids",
    copy: "An Aquarium + Rainforest visit contrasts ocean habitats with a humid, planted ecosystem. Swap Rainforest for the children's museum if young kids would benefit more from building and pretend play; compare admissions first.",
  },
  {
    time: "About 6+ hours",
    title: "Build a full Moody Gardens day",
    copy: "Add 20,000 Leagues Under the Sea if its participatory 3D/4D theater suits your group, then allow time for food or the children's museum. Confirm separate ticket eligibility, showtimes and Value Pass inclusions.",
  },
] as const;

export function MoodyGardensSpotlights() {
  return <>
    <Section className="py-10 sm:py-12 lg:py-14" tone="surface">
      <Container>
        <SectionHeader
          eyebrow="Plan the day"
          title="How to visit Moody Gardens without wasting time or ticket money"
          description="Choose the Aquarium for sea life, Rainforest for tropical habitats, or Discovery for hands-on play and interactive theater. Check separate tickets before building the day."
        />

        {isMoodyGardensNov16NoticeActive() && (
          <aside aria-label="Temporary Moody Gardens operating-hours notice" className="mt-6 border border-primary bg-background p-5">
            <h3 className="font-display text-xl">{moodyGardensNov16Notice.heading}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{moodyGardensNov16Notice.explanation}</p>
            <a href={moodyGardensNov16Notice.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
              Verify the temporary hours with Moody Gardens
            </a>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Official operating notice reviewed {moodyGardensNov16Notice.sourceReviewed}. This date-specific notice expires automatically after November 16.
            </p>
          </aside>
        )}

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
            <div className="mt-6 border-t border-border pt-5">
              <h3 className="font-display text-xl">Holiday day-of attraction calendar</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Holiday in the Gardens operates November 21, 2026–January 2, 2027, but the entire campus does not share one schedule. The operator lists ICE LAND from noon to 10 p.m. and the Holiday Lights Trail from 5:30 to 10 p.m. on its daily calendar. The Holiday Evening Pass is valid only after 4 p.m.; ice skate rental is additional. Do not use the evening start time as the opening time for the Aquarium, Rainforest, films or the children's museum.
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Moody Gardens opens on Thanksgiving Day, Christmas Eve, Christmas Day, New Year's Eve and New Year's Day, with general attractions opening at noon on Christmas Day. The Galveston Children's Museum has separate holiday closures, including Thanksgiving, Christmas Eve, Christmas Day and New Year's Day; plan the museum visit on another day.
              </p>
              <a href="https://www.moodygardens.com/visitor-info/hours" target="_blank" rel="noreferrer noopener" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">Official day-by-day attraction and holiday hours</a>
              <a href="/event/moody-gardens-holiday-in-the-gardens" className="ml-4 mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">Compare the holiday attraction tickets and dates</a>
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <h3 className="font-display text-xl">Museum-only cost example</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                On November 14, 2026, the Galveston Children's Museum listed general admission at $15 per person age 2 and older; children under 2 are free. Normal public hours are 10 AM to 5 PM; 9 to 10 AM is reserved for museum members (specifically GCM members, not other Moody Gardens memberships). To enter, guests need a Moody Gardens membership, a ticket that includes Galveston Children's Museum admission, or separate museum admission.
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Two adults and two children ages 4–12 would pay $60 before discounts for the museum only, not the Aquarium, Rainforest or theater. Senior (65+) and active military admission is $12 per person. The Everybody Plays program offers $5 per person for up to five guests with SNAP or Medicaid benefits, using a benefits card and photo ID; special events are excluded.
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                The museum closes on Thanksgiving Day, Christmas Eve, Christmas Day, New Year's Day, Easter and the Sunday after the Momus Parade, even if other pyramids are open. Check its current hours and eligibility before buying.
              </p>
              <a href="https://www.galvestoncm.org/general-info-admission" target="_blank" rel="noreferrer noopener" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">Official museum admission and discounts</a>
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <h3 className="font-display text-xl">What a family of four should compare</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                For two adults and two children ages 4–12, price the exact attractions you will visit: individual Aquarium and Rainforest admission, the four-person combined Aquarium + Rainforest ticket, or two adult and two child Value Passes. Check whether each option includes the museum or theater, rather than adding their price or entry privileges by assumption. Compare the final checkout totals for your visit date, including applicable age discounts and promotions.
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
        <p className="mt-5 text-xs leading-5 text-muted-foreground">TexasDefined Editorial Desk reviewed the core Moody Gardens visitor policies on November 9, 2026, and checked the Galveston Children's Museum admission, member-hour, exhibits and holiday-closure details on November 14, 2026. Holiday attraction operating hours and Christmas/Thanksgiving exceptions were separately checked on November 24, 2026. This guide was substantively updated on <time dateTime={moodyGardensEditorialDates.lastSubstantiveEdit}>November 24, 2026</time> (separate from the original full-guide and museum reviews). Attraction hours, showtimes and ticket terms can change.</p>
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
          <Link to="/destination/$slug" params={{ slug: "galveston-bay" }} className="group border border-border p-5">
            <p className="eyebrow text-primary">Marine conservation context</p>
            <h3 className="mt-2 font-display text-2xl group-hover:text-primary">Galveston Bay ecosystems</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Read how the bay and its estuary habitats connect to the Gulf wildlife and reef-conservation topics you encounter inside the Aquarium Pyramid.</p>
          </Link>
        </div>
      </Container>
    </Section>
  </>;
}
