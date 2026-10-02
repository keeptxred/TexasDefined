import { Container } from "@/components/layout/Container";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";

const attractions = [
  {
    title: "Aquarium Pyramid",
    eyebrow: "Best first stop",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/The%20Aquarium%20at%20Moody%20Gardens.jpg?width=1400",
    alt: "Aquarium Pyramid at Moody Gardens in Galveston",
    credit: "Wikimedia Commons",
    body: "The 1.5-million-gallon Aquarium Pyramid is the strongest single reason to visit. It moves through ocean habitats with penguins, seals, stingrays, sharks, jellyfish and reef exhibits, making it the best choice when you only have time for one major attraction.",
  },
  {
    title: "Rainforest Pyramid",
    eyebrow: "Pair with the aquarium",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Rainforest%20Pyramid%20Moody%20Gardens.jpg?width=1400",
    alt: "Rainforest Pyramid at Moody Gardens",
    credit: "Supportstorm · Wikimedia Commons · public domain",
    body: "The Rainforest Pyramid is a warm, humid, multi-level habitat with tropical plants and free-moving wildlife from rainforest regions. It gives a Moody Gardens visit a completely different second half and is the most natural pairing with the Aquarium Pyramid.",
  },
  {
    title: "Discovery Pyramid & theaters",
    eyebrow: "Check current status",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Discovery%20Pyramid%20Moody%20Gardens.jpg?width=1400",
    alt: "Discovery Pyramid at Moody Gardens",
    credit: "Supportstorm · Wikimedia Commons · public domain",
    body: "The upstairs Discovery Museum gallery is closed until November 2026 while the new Galveston Children's Museum is prepared. The Audience Recognition Theater downstairs remains open with 20,000 Leagues Under the Sea, and Moody Gardens also operates separate 3D and 4D theater experiences.",
  },
] as const;

const plans = [
  {
    title: "About 3 hours",
    body: "Start with the Aquarium Pyramid, then choose the Rainforest Pyramid if your group wants a second major attraction. Skip add-ons unless a theater time lines up naturally.",
  },
  {
    title: "Half a day",
    body: "Do the Aquarium Pyramid first, break for lunch, then tour the Rainforest Pyramid. Add one theater experience if the posted showtime fits without rushing either pyramid.",
  },
  {
    title: "Full day",
    body: "Use the Aquarium and Rainforest Pyramids as the anchors, then layer in a 3D/4D or Audience Recognition Theater show. Seasonal attractions such as Palm Beach or Holiday in the Gardens can materially change the best order, so check the day-of-visit schedule first.",
  },
] as const;

export function MoodyGardensAuthority() {
  return <>
    <Section tone="surface" className="py-10 sm:py-12 lg:py-16">
      <Container>
        <SectionHeader
          eyebrow="Plan your visit"
          title="What to know before you go to Moody Gardens"
          description="Moody Gardens is a campus of separately scheduled attractions, not one museum. Build the day around the Aquarium and Rainforest Pyramids, then add theaters or seasonal experiences only after checking the current operating schedule."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-t-2 border-foreground pt-4"><p className="eyebrow text-primary">Today</p><p className="mt-2 text-sm leading-6">Aquarium and Rainforest Pyramids: 10 AM–4 PM on October 2, 2026.</p></div>
          <div className="border-t-2 border-foreground pt-4"><p className="eyebrow text-primary">Discovery</p><p className="mt-2 text-sm leading-6">Upstairs gallery closed until November; 20,000 Leagues remains open downstairs.</p></div>
          <div className="border-t-2 border-foreground pt-4"><p className="eyebrow text-primary">Parking</p><p className="mt-2 text-sm leading-6">Standard self-parking is free. Premium and valet options cost extra.</p></div>
          <div className="border-t-2 border-foreground pt-4"><p className="eyebrow text-primary">Tickets</p><p className="mt-2 text-sm leading-6">Choose individual admission or a multi-attraction pass based on how many major experiences you can realistically fit.</p></div>
        </div>
        <div className="mt-7 flex flex-wrap gap-5 text-sm font-semibold">
          <a href="https://www.moodygardens.com/visitor-info/hours" target="_blank" rel="noreferrer noopener" className="border-b border-primary text-primary">Current hours & attraction status</a>
          <a href="https://tickets.moodygardens.com/webstore/shop/viewitems.aspx?c=admission&cg=ti" target="_blank" rel="noreferrer noopener" className="border-b border-primary text-primary">Official tickets</a>
          <a href="https://www.moodygardens.com/visitor-info/faq" target="_blank" rel="noreferrer noopener" className="border-b border-primary text-primary">Visitor FAQ</a>
        </div>
      </Container>
    </Section>

    <Section className="py-10 sm:py-12 lg:py-16">
      <Container>
        <SectionHeader
          eyebrow="Inside Moody Gardens"
          title="The attractions worth planning around"
          description="The pyramids should carry the page because they carry the visit. These are the three experiences most travelers need to understand before choosing a ticket."
        />
        <div className="mt-9 grid gap-8 lg:grid-cols-3">
          {attractions.map((item) => <article key={item.title} className="overflow-hidden border border-border bg-background">
            <div className="aspect-[4/3] overflow-hidden bg-muted"><img src={item.image} alt={item.alt} loading="lazy" decoding="async" className="size-full object-cover" /></div>
            <div className="p-5 sm:p-6">
              <p className="eyebrow text-primary">{item.eyebrow}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.body}</p>
              <p className="mt-4 text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground">Photo: {item.credit}</p>
            </div>
          </article>)}
        </div>
      </Container>
    </Section>

    <Section tone="surface" className="py-10 sm:py-12 lg:py-16">
      <Container>
        <SectionHeader eyebrow="Use the time you have" title="A better Moody Gardens itinerary" description="Choose the visit length first, then buy the ticket that matches it. Trying to use every included attraction can make a short visit worse, not better." />
        <div className="mt-8 grid gap-7 md:grid-cols-3">
          {plans.map((plan) => <article key={plan.title} className="border-t-2 border-foreground pt-5"><h3 className="font-display text-2xl">{plan.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{plan.body}</p></article>)}
        </div>
        <div className="mt-10 grid gap-8 border-y border-border py-7 lg:grid-cols-2">
          <div><p className="eyebrow text-primary">Families</p><h3 className="mt-2 font-display text-2xl">What works best with kids</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Younger children usually get more value from doing fewer attractions at a comfortable pace. The aquarium gives the clearest payoff; the rainforest adds movement and variety. Strollers are available to rent, and wheelchairs are available first-come, first-served through guest services.</p></div>
          <div><p className="eyebrow text-primary">Practical details</p><h3 className="mt-2 font-display text-2xl">Small things that change the day</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Moody Gardens is cashless. Outside food and drinks are not allowed inside major attractions, although guests may use outdoor benches and tables. Showtimes, seasonal attractions and adventure-course availability change, so check the official schedule before arrival rather than relying on a static itinerary.</p></div>
        </div>
      </Container>
    </Section>
  </>;
}

export default MoodyGardensAuthority;
