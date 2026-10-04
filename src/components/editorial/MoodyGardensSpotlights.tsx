import { Container } from "@/components/layout/Container";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { recoverOrHideImage } from "@/lib/image-fallback";

const cards = [
  {
    eyebrow: "Best first stop",
    title: "Aquarium Pyramid",
    description: "Start here for the broadest animal-focused experience, with large marine habitats, penguins, seals, sharks and ocean-region exhibits that work well in any weather.",
    href: "https://www.moodygardens.com/attractions/aquarium-pyramid",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Moody_Gardens_Aquarium_Pyramid_HDR_Galveston_(6971130700).jpg?width=1200",
    alt: "The blue Aquarium Pyramid at Moody Gardens in Galveston",
    credit: "Katie Haugland Bowen · CC BY 2.0 · Wikimedia Commons",
  },
  {
    eyebrow: "Tropical indoor stop",
    title: "Rainforest Pyramid",
    description: "A climate-controlled rainforest environment with tropical plants, birds and other wildlife. It is the strongest contrast to the Aquarium Pyramid on a two-pyramid visit.",
    href: "https://www.moodygardens.com/attractions/rainforest-pyramid",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Moody_Gardens_Rainforest_Pyramid_(14248736931).jpg?width=1200",
    alt: "The glass Rainforest Pyramid at Moody Gardens in Galveston",
    credit: "Lydia Liu · CC BY 2.0 · Wikimedia Commons",
  },
  {
    eyebrow: "Current status",
    title: "Discovery Museum",
    description: "Temporarily closed in early October 2026 and scheduled to reopen in November. The Audience Recognition Theater remains open with regular showtimes.",
    href: "https://www.moodygardens.com/visitor-info/hours",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Discovery_Pyramid_Moody_Gardens.jpg?width=1200",
    alt: "The Discovery Pyramid at Moody Gardens in Galveston",
    credit: "Supportstorm · public domain · Wikimedia Commons",
  },
  {
    eyebrow: "Stay on site",
    title: "Moody Gardens Hotel",
    description: "The on-site hotel is the simplest base for a full-day or holiday visit, with the pyramids, dining and seasonal programming all within the same campus.",
    href: "https://www.moodygardens.com/stay",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Moody_Gardens_Hotel_pool_at_night_6-10.jpg?width=1200",
    alt: "The Moody Gardens Hotel pool area at night",
    credit: "Supportstorm · CC BY 3.0 · Wikimedia Commons",
  },
] as const;

const currentNotes = [
  {
    label: "Discovery Museum",
    value: "Closed now; scheduled to reopen in November 2026.",
  },
  {
    label: "Parking",
    value: "Standard self-parking is free; upgraded parking options cost extra.",
  },
  {
    label: "Holiday in the Gardens",
    value: "Runs Nov. 21, 2026 through Jan. 2, 2027, with ICE LAND, holiday lights and evening attractions.",
  },
] as const;

export function MoodyGardensSpotlights() {
  return <Section className="py-10 sm:py-12 lg:py-14" tone="surface">
    <Container>
      <SectionHeader
        eyebrow="Plan the day"
        title="Choose your Moody Gardens experience"
        description="Use the pyramids as the core of the visit, then add seasonal attractions or an overnight stay only if the schedule actually has room for them."
      />

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {currentNotes.map((note) => <div key={note.label} className="border-t-2 border-primary bg-background px-5 py-5 shadow-sm">
          <p className="eyebrow text-primary">{note.label}</p>
          <p className="mt-3 text-sm leading-6 text-foreground/85">{note.value}</p>
        </div>)}
      </div>

      <div className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => <article key={card.title} className="overflow-hidden border border-border bg-background shadow-sm">
          <a href={card.href} target="_blank" rel="noreferrer noopener" className="group block">
            <figure data-image-frame className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={card.image}
                alt={card.alt}
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.025]"
                onError={(event) => recoverOrHideImage(event.currentTarget)}
              />
            </figure>
            <div className="p-5">
              <p className="eyebrow text-primary">{card.eyebrow}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.description}</p>
              <p className="mt-5 text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">Photo: {card.credit}</p>
              <span className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Official details</span>
            </div>
          </a>
        </article>)}
      </div>
    </Container>
  </Section>;
}
