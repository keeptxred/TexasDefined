import { createLazyFileRoute } from "@tanstack/react-router";

import { DepartmentHero } from "@/components/editorial/DepartmentHero";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { CityPassCallout } from "@/components/monetization/CityPassCallout";
import { CityPassStructuredData } from "@/components/monetization/CityPassStructuredData";
import { CITYPASS_GUIDE_DESCRIPTION, CITYPASS_GUIDE_REVIEWED_AT } from "./guides.citypass-texas";

type Attraction = {
  name: string;
  href: string;
  admission: string;
  reservation?: "Required" | "Recommended";
};

const DALLAS_ATTRACTIONS: readonly Attraction[] = [
  { name: "Perot Museum of Nature and Science", href: "/destination/perot-museum-of-nature-and-science", admission: "General admission plus one film in the Hoglund Foundation Theater.", reservation: "Required" },
  { name: "Reunion Tower GeO-Deck", href: "/destination/reunion-tower-dallas", admission: "Indoor and outdoor observation decks, telescopes and a souvenir digital photo.", reservation: "Required" },
  { name: "Dallas Zoo", href: "/destination/dallas-zoo", admission: "General admission to animal exhibits and daily keeper chats." },
  { name: "George W. Bush Presidential Museum", href: "/destination/george-w-bush-presidential-museum-dallas", admission: "General admission to permanent and special exhibits plus the mobile audio tour." },
  { name: "Dallas Holocaust and Human Rights Museum", href: "/destination/dallas-holocaust-human-rights-museum", admission: "General admission to permanent exhibitions, testimony experiences and the current special exhibition." },
  { name: "AT&T Stadium Tours", href: "/sports-venue/att-stadium", admission: "VIP Guided Tour; CityPASS also lists the Guided Tour of The Star as an alternative, subject to availability.", reservation: "Recommended" },
] as const;

const HOUSTON_ATTRACTIONS: readonly Attraction[] = [
  { name: "Space Center Houston", href: "/destination/space-center-houston", admission: "General admission, exhibits and shows plus the listed tram tours, subject to tour availability." },
  { name: "Houston Zoo", href: "/destination/houston-zoo", admission: "General admission to animal exhibits and Meet the Keeper chats." },
  { name: "Downtown Aquarium Houston", href: "/destination/downtown-aquarium-houston", admission: "Aquarium Adventure Exhibit admission." },
  { name: "Houston Museum of Natural Science", href: "/destination/houston-museum-of-natural-science", admission: "General admission to the permanent exhibit halls.", reservation: "Recommended" },
  { name: "Kemah Boardwalk", href: "/destination/kemah-boardwalk", admission: "All-Day Ride Pass; selected premium experiences are excluded." },
  { name: "Children's Museum Houston", href: "/destination/childrens-museum-houston", admission: "General admission to exhibits, workshops and science demonstrations; groups must include a child." },
  { name: "Museum of Fine Arts, Houston", href: "/destination/museum-of-fine-arts-houston", admission: "All-access ticket for collection galleries and most special exhibitions." },
] as const;

const SAN_ANTONIO_ATTRACTIONS: readonly Attraction[] = [
  { name: "GO RIO San Antonio River Cruises", href: "/destination/go-rio-san-antonio-river-cruises", admission: "Narrated 35-minute River Walk cruise." },
  { name: "San Antonio Zoo", href: "/destination/san-antonio-zoo", admission: "General admission to animal habitats and exhibits." },
  { name: "Tower of the Americas", href: "/destination/tower-of-the-americas", admission: "General admission with unlimited same-day observation-deck access and the 4D Theater." },
  { name: "The Alamo Exhibit and Church", href: "/destination/the-alamo", admission: "The Alamo Exhibit, augmented experience and Alamo Church.", reservation: "Required" },
  { name: "San Antonio Botanical Garden", href: "/destination/san-antonio-botanical-garden", admission: "General admission to the garden grounds, Family Adventure Garden and conservatory." },
  { name: "Witte Museum", href: "/destination/witte-museum", admission: "General admission to the museum grounds, permanent galleries and select special exhibitions." },
  { name: "The DoSeum", href: "/destination/the-doseum", admission: "General admission to galleries and temporary exhibits." },
  { name: "San Antonio Museum of Art", href: "/destination/san-antonio-museum-of-art", admission: "General admission to permanent collections and special exhibitions." },
] as const;

const MARKET_SUMMARIES = [
  {
    market: "Dallas",
    adult: "$64",
    child: "$46",
    childAges: "ages 3–12",
    selection: "4 of 6",
    maxSavings: "up to 56%",
    maxValue: "$144.46",
    maxDollarSavings: "$80.46",
    example: "AT&T Stadium Tours + Perot Museum + Dallas Zoo + Reunion Tower",
    reservation: "Perot Museum and Reunion Tower require reservations; AT&T Stadium Tours recommends one.",
    officialUrl: "https://www.citypass.com/dallas",
  },
  {
    market: "Houston",
    adult: "$82",
    child: "$72",
    childAges: "ages 3–11",
    selection: "5 of 7",
    maxSavings: "up to 52%",
    maxValue: "$169.12",
    maxDollarSavings: "$87.12",
    example: "Space Center Houston + Houston Zoo + Kemah Boardwalk + Houston Museum of Natural Science + Museum of Fine Arts, Houston",
    reservation: "Houston Museum of Natural Science currently recommends a reservation.",
    officialUrl: "https://www.citypass.com/houston",
  },
  {
    market: "San Antonio",
    adult: "$63",
    child: "$53",
    childAges: "ages 3–11",
    selection: "4 of 8",
    maxSavings: "up to 41%",
    maxValue: "$107.10",
    maxDollarSavings: "$44.10",
    example: "San Antonio Zoo + San Antonio Museum of Art + San Antonio Botanical Garden + Tower of the Americas",
    reservation: "The Alamo Exhibit and Church currently requires a reservation.",
    officialUrl: "https://www.citypass.com/san-antonio",
  },
] as const;

export const Route = createLazyFileRoute("/guides/citypass-texas")({ component: CityPassTexasGuide });

function CityPassTexasGuide() {
  return <>
    <CityPassStructuredData description={CITYPASS_GUIDE_DESCRIPTION} reviewedAt={CITYPASS_GUIDE_REVIEWED_AT} />
    <DepartmentHero
      current="Guides"
      eyebrow="2026 Texas trip planning"
      title="Is CityPASS® worth it in Texas? Dallas, Houston & San Antonio compared"
      description={CITYPASS_GUIDE_DESCRIPTION}
    />

    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-primary">The answer first</p>
            <h2 className="mt-3 font-display text-4xl leading-tight">It can save real money — if you already want enough of the included attractions.</h2>
          </div>
          <div className="max-w-2xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>Texas has three separate CityPASS® products: Dallas, Houston and San Antonio. They are not one statewide pass. Dallas currently covers four of six choices, Houston five of seven, and San Antonio four of eight. Each product is valid for nine consecutive days beginning with the first attraction visit or earliest reservation.</p>
            <p>The useful test is simple: add up the admissions you would genuinely buy without CityPASS®. If that real total is higher than the pass price — after resident, military, student, membership or promotional discounts — the pass can save money. Do not count an attraction you would only visit to make the bundle feel worthwhile.</p>
            <p>Prices and program details below were checked against CityPASS® on <strong className="text-foreground">{formatReviewedDate(CITYPASS_GUIDE_REVIEWED_AT)}</strong>. CityPASS says its 2026–27 program information is valid through February 28, 2027, but attraction pricing and reservation rules can change.</p>
          </div>
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="At a glance" title="Dallas vs. Houston vs. San Antonio CityPASS®" description="Current published CityPASS pricing and maximum savings. The maximum savings figures use CityPASS's own regular-price comparison, so your actual savings can be lower." />
        <div className="mt-8 overflow-x-auto border border-border bg-background">
          <table className="w-full min-w-full border-collapse text-left text-sm">
            <thead className="bg-surface">
              <tr>
                <th scope="col" className="px-5 py-4 font-semibold text-foreground">City</th>
                <th scope="col" className="px-5 py-4 font-semibold text-foreground">Adult</th>
                <th scope="col" className="px-5 py-4 font-semibold text-foreground">Child</th>
                <th scope="col" className="px-5 py-4 font-semibold text-foreground">Visits</th>
                <th scope="col" className="px-5 py-4 font-semibold text-foreground">Advertised max savings</th>
                <th scope="col" className="px-5 py-4 font-semibold text-foreground">9-day validity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MARKET_SUMMARIES.map((item) => <tr key={item.market}>
                <th scope="row" className="px-5 py-4 font-semibold text-foreground"><a href={`#${item.market.toLowerCase().replace(" ", "-")}`} className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{item.market}</a></th>
                <td className="px-5 py-4 text-muted-foreground">{item.adult}</td>
                <td className="px-5 py-4 text-muted-foreground">{item.child} <span className="block text-xs">{item.childAges}</span></td>
                <td className="px-5 py-4 text-muted-foreground">{item.selection}</td>
                <td className="px-5 py-4 text-muted-foreground">{item.maxSavings}</td>
                <td className="px-5 py-4 text-muted-foreground">Yes</td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">There are 21 listed attraction choices across the three separate city products (6 Dallas + 7 Houston + 8 San Antonio). That is a count of program listings, not 21 attractions available on a single pass.</p>
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <a href="#dallas" className="border-b border-primary pb-1 text-primary">Dallas details ↓</a>
          <a href="#houston" className="border-b border-primary pb-1 text-primary">Houston details ↓</a>
          <a href="#san-antonio" className="border-b border-primary pb-1 text-primary">San Antonio details ↓</a>
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeader eyebrow="Do the math" title="What the maximum savings examples actually look like" description="These examples use the current adult box-office prices CityPASS publishes for its own savings comparison. Variable-date ticket prices and discounts can change what you would really pay." />
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {MARKET_SUMMARIES.map((item) => <article key={item.market} className="border-t border-border pt-5">
            <p className="eyebrow text-primary">{item.market}</p>
            <h3 className="mt-3 font-display text-3xl">{item.adult} pass</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">CityPASS currently compares that with as much as <strong className="text-foreground">{item.maxValue}</strong> in regular adult admission, or <strong className="text-foreground">{item.maxDollarSavings}</strong> maximum dollar savings.</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">High-value example:</strong> {item.example}.</p>
          </article>)}
        </div>
        <div className="mt-10 border-y border-border py-7">
          <h3 className="font-display text-2xl">The break-even rule</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">For Dallas and San Antonio, total the four admissions you would actually buy. For Houston, total the five you would actually buy. If that real-world total is above the pass price, the difference is your likely ticket savings. If it is below the pass price, buy individually. If it is close, let flexibility and reservation requirements decide — not the advertised maximum percentage.</p>
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Before you buy" title="What CityPASS® includes — and what it does not" />
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Fact title="Nine-day use window" body="The current Texas products are valid for nine consecutive days starting with your first attraction visit or earliest reservation." />
          <Fact title="One-time admission" body="The pass covers one visit to each selected attraction unless CityPASS specifically says otherwise. Repeat visits require another ticket." />
          <Fact title="Mobile trip management" body="The My CityPASS® app provides tickets, reservation instructions, attraction details, maps and current entry information." />
          <Fact title="Parking is separate" body="Transportation and parking are not included. You are responsible for getting to each attraction and paying any parking charges." />
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <div id="dallas" className="scroll-mt-24 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <SectionHeader eyebrow="Dallas CityPASS® — $64 adult / $46 child" title="Choose 4 of 6 Dallas attractions" description="Dallas currently advertises savings up to 56%. Perot Museum and Reunion Tower require reservations; AT&T Stadium Tours recommends a reservation." />
            <AttractionList items={DALLAS_ATTRACTIONS} />
            <CityMath sentence="A particularly high-value adult combination is AT&T Stadium Tours, Perot Museum, Dallas Zoo and Reunion Tower. Using CityPASS's current comparison prices, those four total $144.46 versus the $64 pass." />
            <SourceLinks cityPath="/city/dallas" officialUrl="https://www.citypass.com/dallas" market="Dallas" />
          </div>
          <CityPassCallout market="Dallas" placement="rail" showGuideLink={false} />
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <div id="houston" className="scroll-mt-24 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <SectionHeader eyebrow="Houston CityPASS® — $82 adult / $72 child" title="Choose 5 of 7 Houston attractions" description="Houston currently advertises savings up to 52%. Houston Museum of Natural Science currently recommends a reservation." />
            <AttractionList items={HOUSTON_ATTRACTIONS} />
            <CityMath sentence="The current maximum-value adult comparison uses Space Center Houston, Houston Zoo, Kemah Boardwalk, Houston Museum of Natural Science and the Museum of Fine Arts, Houston: $169.12 in CityPASS's published regular-price comparison versus the $82 pass." />
            <SourceLinks cityPath="/city/houston" officialUrl="https://www.citypass.com/houston" market="Houston" />
          </div>
          <CityPassCallout market="Houston" placement="rail" showGuideLink={false} />
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <div id="san-antonio" className="scroll-mt-24 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <SectionHeader eyebrow="San Antonio CityPASS® — $63 adult / $53 child" title="Choose 4 of 8 San Antonio attractions" description="San Antonio currently advertises savings up to 41%. The Alamo Exhibit and Church currently requires a reservation." />
            <AttractionList items={SAN_ANTONIO_ATTRACTIONS} />
            <CityMath sentence="The current maximum-value adult comparison uses San Antonio Zoo, San Antonio Museum of Art, San Antonio Botanical Garden and Tower of the Americas: $107.10 in CityPASS's published regular-price comparison versus the $63 pass." />
            <SourceLinks cityPath="/city/san-antonio" officialUrl="https://www.citypass.com/san-antonio" market="San Antonio" />
          </div>
          <CityPassCallout market="San Antonio" placement="rail" showGuideLink={false} />
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="When not to buy" title="Individual tickets can still be the smarter choice" />
        <div className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2">
          <Check title="You only want one or two stops" body="A bundle is not a discount if it causes you to buy attractions you did not actually want. Start with the itinerary, not the pass." />
          <Check title="You qualify for better rates" body="Resident offers, memberships, military or student pricing, employer benefits, free-child policies and promotions can materially reduce the individual-ticket total." />
          <Check title="Your group wants different things" body="Child age bands and attraction pricing vary. Compare the actual mix of adult and child tickets for your party rather than multiplying one headline savings percentage." />
          <Check title="Timed reservations do not fit" body="Dallas has two required reservations, San Antonio currently requires one for the Alamo, and some other stops recommend reservations. Availability can be more important than theoretical savings on a tight itinerary." />
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeader eyebrow="CityPASS® FAQ" title="The details that matter before checkout" />
        <div className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-2">
          <Faq question="How long is a Texas CityPASS valid?" answer="Dallas, Houston and San Antonio CityPASS tickets are currently valid for nine consecutive days, starting with and including the first attraction visit or earliest reservation. CityPASS also says you have one year from purchase to start using these non-theme-park products." />
          <Faq question="Do I choose my attractions before buying?" answer="No. CityPASS says you can decide which attractions to visit after purchase. Make required or recommended reservations as soon as practical once you have your tickets." />
          <Faq question="Can I get a refund?" answer="CityPASS's current general policy offers a full refund for entirely unused eligible products within 365 days of purchase. Partially used products are not refundable, and existing reservations must be canceled or will be canceled as part of the refund process. Check the current policy before purchase." />
          <Faq question="Does CityPASS include parking or transportation?" answer="No. CityPASS covers the specified attraction admission; transportation and parking are separate." />
          <Faq question="Can I visit the same attraction twice?" answer="Generally no. CityPASS says its tickets include one-time admission to each included attraction unless otherwise noted." />
          <Faq question="Does CityPASS let me skip every line?" answer="No. Having tickets in advance may let you bypass a box-office purchase line at some attractions, but CityPASS does not provide blanket skip-the-line access for admission, security or elevator lines." />
          <Faq question="Which Texas CityPASS advertises the largest maximum percentage savings?" answer="At this review, Dallas advertises up to 56%, Houston up to 52% and San Antonio up to 41%. Those are maximum comparisons, not guaranteed savings for every itinerary." />
          <Faq question="Is CityPASS worth it for kids?" answer="It depends on the exact attractions and the child's age. CityPASS child age bands do not always match each attraction's own child pricing, and some attractions admit younger children free. Compare the real tickets your family would otherwise buy." />
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Affiliate and sourcing policy</p>
          <h2 className="mt-3 font-display text-3xl">We do the comparison before asking you to buy.</h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground">Texas Defined participates in the CityPASS® affiliate program. If you buy through one of our CityPASS® links, we may earn a commission at no additional cost to you. The prices, attraction lineups, admission details, reservation rules and savings examples on this page were checked against CityPASS's current Dallas, Houston and San Antonio product pages and help-center policies. Because those details can change, verify the current product page before checkout.</p>
        </div>
      </Container>
    </Section>
  </>;
}

function AttractionList({ items }: { items: readonly Attraction[] }) {
  return <ul className="mt-8 divide-y divide-border border-y border-border">{items.map((item) => <li key={item.name} className="grid gap-2 py-5 md:grid-cols-2 md:gap-8">
    <div>
      <a href={item.href} className="font-semibold text-foreground underline decoration-primary/40 underline-offset-4 hover:text-primary">{item.name}</a>
      {item.reservation ? <span className="ml-2 inline-block border border-border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary">Reservation {item.reservation.toLowerCase()}</span> : null}
    </div>
    <p className="text-sm leading-6 text-muted-foreground">{item.admission}</p>
  </li>)}</ul>;
}

function CityMath({ sentence }: { sentence: string }) {
  return <div className="mt-8 border-l-2 border-primary pl-5"><p className="eyebrow text-primary">Savings example</p><p className="mt-2 text-sm leading-7 text-muted-foreground">{sentence}</p></div>;
}

function SourceLinks({ cityPath, officialUrl, market }: { cityPath: string; officialUrl: string; market: string }) {
  return <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
    <a href={cityPath} className="border-b border-primary pb-1 text-primary">Plan more of {market} →</a>
    <a href={officialUrl} target="_blank" rel="noopener noreferrer" className="border-b border-primary pb-1 text-primary">Verify current {market} CityPASS details ↗</a>
  </div>;
}

function Fact({ title, body }: { title: string; body: string }) {
  return <article className="border-t border-border pt-5"><h3 className="font-display text-2xl leading-tight">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></article>;
}

function Check({ title, body }: { title: string; body: string }) {
  return <article className="border-t border-border pt-5"><h3 className="font-display text-2xl leading-tight">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></article>;
}

function Faq({ question, answer }: { question: string; answer: string }) {
  return <article className="border-t border-border pt-5"><h3 className="font-display text-2xl leading-tight">{question}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{answer}</p></article>;
}

function formatReviewedDate(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}