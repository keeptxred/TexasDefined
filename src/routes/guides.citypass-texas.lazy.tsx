import { createLazyFileRoute } from "@tanstack/react-router";

import { DepartmentHero } from "@/components/editorial/DepartmentHero";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { CityPassCallout } from "@/components/monetization/CityPassCallout";
import { CityPassStructuredData } from "@/components/monetization/CityPassStructuredData";
import { CITYPASS_GUIDE_DESCRIPTION, CITYPASS_GUIDE_REVIEWED_AT } from "./guides.citypass-texas";

const DALLAS_ATTRACTIONS = [
  { name: "Perot Museum of Nature and Science", href: "/destination/perot-museum-of-nature-and-science" },
  { name: "Reunion Tower GeO-Deck", href: "/destination/reunion-tower-dallas" },
  { name: "Dallas Zoo", href: "/destination/dallas-zoo" },
  { name: "George W. Bush Presidential Museum", href: "/destination/george-w-bush-presidential-museum-dallas" },
  { name: "Dallas Holocaust and Human Rights Museum", href: "/destination/dallas-holocaust-human-rights-museum" },
  { name: "AT&T Stadium Tours", href: "/sports-venue/att-stadium" },
] as const;

const HOUSTON_ATTRACTIONS = [
  { name: "Space Center Houston", href: "/destination/space-center-houston" },
  { name: "Houston Zoo", href: "/destination/houston-zoo" },
  { name: "Downtown Aquarium Houston", href: "/destination/downtown-aquarium-houston" },
  { name: "Houston Museum of Natural Science", href: "/destination/houston-museum-of-natural-science" },
  { name: "Kemah Boardwalk", href: "/destination/kemah-boardwalk" },
  { name: "Children's Museum Houston", href: "/destination/childrens-museum-houston" },
  { name: "Museum of Fine Arts, Houston", href: "/destination/museum-of-fine-arts-houston" },
] as const;

const SAN_ANTONIO_ATTRACTIONS = [
  { name: "GO RIO San Antonio River Cruises", href: "/destination/go-rio-san-antonio-river-cruises" },
  { name: "San Antonio Zoo", href: "/destination/san-antonio-zoo" },
  { name: "Tower of the Americas", href: "/destination/tower-of-the-americas" },
  { name: "The Alamo Exhibit and Church", href: "/destination/the-alamo" },
  { name: "San Antonio Botanical Garden", href: "/destination/san-antonio-botanical-garden" },
  { name: "Witte Museum", href: "/destination/witte-museum" },
  { name: "The DoSeum", href: "/destination/the-doseum" },
  { name: "San Antonio Museum of Art", href: "/destination/san-antonio-museum-of-art" },
] as const;

export const Route = createLazyFileRoute("/guides/citypass-texas")({ component: CityPassTexasGuide });

function CityPassTexasGuide() {
  return <>
    <CityPassStructuredData description={CITYPASS_GUIDE_DESCRIPTION} reviewedAt={CITYPASS_GUIDE_REVIEWED_AT} />
    <DepartmentHero
      current="Guides"
      eyebrow="Texas trip planning"
      title="When a CityPASS® makes sense in Texas — and when it doesn't"
      description={CITYPASS_GUIDE_DESCRIPTION}
    />

    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-primary">The short version</p>
            <h2 className="mt-3 font-display text-4xl leading-tight">CityPASS® is a bundle, not a magic discount.</h2>
          </div>
          <div className="max-w-2xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>CityPASS® sells multi-attraction tickets in selected cities. Instead of buying every admission separately, you buy one pass and choose from a defined group of participating attractions. In Texas, the current programs are Dallas CityPASS®, Houston CityPASS® and San Antonio CityPASS®.</p>
            <p>The value depends on the trip you were already going to take. A pass can make sense when several included attractions are genuinely on your itinerary. If you only want one or two stops, have access to strong local or membership discounts, or would be choosing attractions just to justify the pass, individual tickets may be the better buy.</p>
            <p>Current attraction lineups, prices, reservation requirements and advertised savings can change. Texas Defined last reviewed the program details on <strong className="text-foreground">{formatReviewedDate(CITYPASS_GUIDE_REVIEWED_AT)}</strong>.</p>
          </div>
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="How it works" title="The three questions to answer before buying" />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <Decision number="01" title="Which attractions would you buy anyway?" body="Write down your real itinerary first. Then compare that list with the current CityPASS® lineup rather than building the trip around the pass." />
          <Decision number="02" title="What would those admissions cost separately?" body="Compare the current pass price with the actual tickets you would otherwise buy, including age-based pricing and any discounts you already qualify for." />
          <Decision number="03" title="Can you use the pass comfortably?" body="The current Dallas, Houston and San Antonio programs use a nine-day validity window beginning with first use. Check each attraction's reservation rules and your travel dates before purchase." />
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <SectionHeader eyebrow="Dallas CityPASS®" title="A useful Dallas museum-and-landmark bundle" description="As reviewed September 2026, Dallas CityPASS® lets travelers choose four attractions from the current participating lineup and use the pass across a nine-day window. Some Dallas choices require reservations, so build the timed stops first." />
            <AttractionList items={DALLAS_ATTRACTIONS} />
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <a href="/city/dallas" className="border-b border-primary pb-1 text-primary">Plan more of Dallas →</a>
              <a href="https://www.citypass.com/dallas" target="_blank" rel="noopener noreferrer" className="border-b border-primary pb-1 text-primary">Verify Dallas program details ↗</a>
            </div>
          </div>
          <CityPassCallout market="Dallas" placement="rail" />
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <SectionHeader eyebrow="Houston CityPASS®" title="A strong fit for museum-and-family itineraries" description="As reviewed September 2026, Houston CityPASS® lets travelers choose five attractions from the current participating lineup and use the pass across a nine-day window." />
            <AttractionList items={HOUSTON_ATTRACTIONS} />
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <a href="/city/houston" className="border-b border-primary pb-1 text-primary">Plan more of Houston →</a>
              <a href="https://www.citypass.com/houston" target="_blank" rel="noopener noreferrer" className="border-b border-primary pb-1 text-primary">Verify Houston program details ↗</a>
            </div>
          </div>
          <CityPassCallout market="Houston" placement="rail" />
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <SectionHeader eyebrow="San Antonio CityPASS®" title="Useful when several city attractions are already the plan" description="As reviewed September 2026, San Antonio CityPASS® lets travelers choose four attractions from the current participating lineup and use the pass across a nine-day window." />
            <AttractionList items={SAN_ANTONIO_ATTRACTIONS} />
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <a href="/city/san-antonio" className="border-b border-primary pb-1 text-primary">Plan more of San Antonio →</a>
              <a href="https://www.citypass.com/san-antonio" target="_blank" rel="noopener noreferrer" className="border-b border-primary pb-1 text-primary">Verify San Antonio program details ↗</a>
            </div>
          </div>
          <CityPassCallout market="San Antonio" placement="rail" />
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Coverage check" title="Every current Texas CityPASS® attraction has a TexasDefined page" description="The current Texas roster is 21 attraction or tour choices across Dallas, Houston and San Antonio. Texas Defined uses the attraction's own destination guide when it is a visitor attraction, and the sports-venue guide for AT&T Stadium Tours." />
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeader eyebrow="Worth checking first" title="When buying individual tickets may be smarter" />
        <div className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2">
          <Check title="Your trip is intentionally light" body="If one marquee attraction and a lot of free time is the plan, a multi-attraction bundle can create pressure to add stops you did not actually want." />
          <Check title="You already have another discount" body="Memberships, resident offers, military or student pricing, employer benefits and special promotions can change the comparison. Use the price you would really pay, not only the standard gate price." />
          <Check title="Your group has different priorities" body="A family or group does not always want the same attractions. Compare the pass against the mix of tickets each traveler would actually use." />
          <Check title="Reservations constrain the itinerary" body="Some included attractions require advance reservations or timed entry. Check the current rules before assuming every stop can be visited whenever you arrive." />
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">How Texas Defined handles the link</p>
          <h2 className="mt-3 font-display text-3xl">The recommendation comes before the commission.</h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground">Texas Defined participates in the CityPASS® affiliate program. If you buy through our CityPASS® link, we may earn a commission at no additional cost to you. That does not make the pass the right choice for every trip, which is why this guide starts with the itinerary and the math. Program details are checked against CityPASS®'s current Dallas, Houston and San Antonio pages, and readers should verify time-sensitive terms before purchasing.</p>
        </div>
      </Container>
    </Section>
  </>;
}

function AttractionList({ items }: { items: readonly { name: string; href: string }[] }) {
  return <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">{items.map((item) => <li key={item.name} className="border-t border-border py-4 text-sm leading-6"><a href={item.href} className="font-semibold text-foreground underline decoration-primary/40 underline-offset-4 hover:text-primary">{item.name}</a></li>)}</ul>;
}

function Decision({ number, title, body }: { number: string; title: string; body: string }) {
  return <section className="border-t border-border pt-5"><p className="eyebrow text-muted-foreground">{number}</p><h2 className="mt-3 font-display text-2xl leading-tight">{title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></section>;
}

function Check({ title, body }: { title: string; body: string }) {
  return <section className="border-t border-border pt-5"><h2 className="font-display text-2xl leading-tight">{title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></section>;
}

function formatReviewedDate(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
