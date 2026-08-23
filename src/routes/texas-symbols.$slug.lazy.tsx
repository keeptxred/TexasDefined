import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/texas-symbols/$slug")({
  component: TexasSymbolProfile,
});

const symbolContext: Record<string, { eyebrow: string; heading: string; paragraphs: string[]; facts: Array<[string, string]> }> = {
  bird: {
    eyebrow: "A Texas soundscape icon",
    heading: "Why the mockingbird fits Texas",
    paragraphs: [
      "Northern mockingbirds are familiar across Texas because they thrive in neighborhoods, parks, ranch country and other open habitats with scattered trees and shrubs. Their long, varied songs are built from repeated phrases, and individual birds can imitate sounds made by other birds.",
      "The symbol is more than a legislative label: Texans can encounter the bird without traveling to a preserve or special habitat. That everyday visibility helps explain why the mockingbird has remained one of the state's most recognizable wildlife emblems since 1927.",
    ],
    facts: [["Official since", "1927"], ["Where Texans encounter it", "Cities, suburbs, parks, farms and open woodland edges"], ["Known for", "Complex songs and vocal mimicry"]],
  },
  reptile: {
    eyebrow: "A native Texas survivor",
    heading: "The horned lizard behind the state-reptile designation",
    paragraphs: [
      "The Texas horned lizard is one of the state's most distinctive native reptiles, recognized by its flattened body, crown of horns and camouflage adapted to open, dry ground. It is strongly associated with the plains, grasslands and scrub landscapes that cover much of Texas.",
      "Its cultural familiarity also carries a conservation lesson. Habitat change, invasive ants and other pressures have reduced horned-lizard populations in parts of their historic range. The state-symbol page therefore connects a familiar Texas icon with the health of native habitat rather than treating the designation as trivia alone.",
    ],
    facts: [["Common Texas name", "Horned frog or horny toad"], ["Actually a", "Lizard, not a frog or toad"], ["Habitat theme", "Open native grassland, prairie and scrub"]],
  },
  dinosaur: {
    eyebrow: "Deep Texas history",
    heading: "Why a dinosaur belongs on the Texas symbol list",
    paragraphs: [
      "Texas has an unusually visible fossil record, including dinosaur trackways and Cretaceous rocks exposed across parts of the state. The dinosaur designation points to a Texas story measured in millions of years rather than decades or centuries.",
      "The name attached to the official designation has also been part of an evolving scientific discussion as paleontologists compare fossils and revise classifications. That makes the legislative record important: TexasDefined reports what the state officially designated while distinguishing that legal designation from later scientific interpretation.",
    ],
    facts: [["Designation year", "2009"], ["Texas connection", "Fossil discoveries and Cretaceous geology"], ["Important distinction", "Official designation and scientific classification are not the same thing"]],
  },
  "flying-mammal": {
    eyebrow: "Texas after dark",
    heading: "Why the Mexican free-tailed bat is unmistakably Texan",
    paragraphs: [
      "Mexican free-tailed bats form some of the most spectacular wildlife concentrations in Texas, using caves, bridges and other roosts before emerging at dusk to feed on insects. Central and South Texas are especially well known for large colonies that can turn an ordinary evening into a major wildlife-viewing event.",
      "The designation also highlights how wildlife and infrastructure can overlap. Famous bridge colonies show that a species can become part of urban Texas identity as well as natural-history tourism, while cave colonies connect the bat to the state's limestone landscapes.",
    ],
    facts: [["Official role", "State flying mammal"], ["Best-known behavior", "Large dusk emergences from communal roosts"], ["Texas habitats", "Caves, bridges and other warm roost sites"]],
  },
  shell: {
    eyebrow: "A Gulf Coast symbol",
    heading: "The shell that connects the symbol list to the Texas coast",
    paragraphs: [
      "Texas state symbols are not limited to inland landscapes. The official shell represents the Gulf Coast and the marine ecosystems that distinguish coastal Texas from the plains, forests, deserts and Hill Country farther inland.",
      "For visitors, shells are also a reminder that beaches are living systems rather than souvenir bins. Rules and conservation practices can vary by location, and occupied shells or protected resources should be left where they are. The official designation is best understood as part of the state's coastal natural history.",
    ],
    facts: [["Texas connection", "Gulf Coast natural history"], ["Landscape represented", "Beaches, bays and marine habitat"], ["Visitor principle", "Observe local collection and wildlife rules"]],
  },
  nickname: {
    eyebrow: "The identity behind the phrase",
    heading: "How “The Lone Star State” became shorthand for Texas",
    paragraphs: [
      "The lone star predates the 2015 resolution that formally recognized the nickname. It appears on the Texas flag and state seal and became a compact symbol of the republic-era independence story that still shapes the way Texas presents itself.",
      "That distinction between long-standing use and formal designation matters. Texans had called Texas the Lone Star State for generations before the Legislature made the nickname official. The 2015 action did not invent the phrase; it placed an established identity marker into the state's formal symbol record.",
    ],
    facts: [["Formal designation", "2015"], ["Earlier use", "Generations before formal recognition"], ["Closely connected symbol", "The single star on the Texas flag and seal"]],
  },
};

function TexasSymbolProfile() {
  const { symbol, relatedSymbols, sourceName, sourceUrl } = Route.useLoaderData();
  const context = symbolContext[symbol.slug] ?? {
    eyebrow: "Why this symbol matters",
    heading: `What ${symbol.symbol} adds to the Texas symbol story`,
    paragraphs: [
      `${symbol.symbol} represents one specific piece of Texas identity within a much larger official collection. The state symbol list spans wildlife, plants, food, music, working traditions, historic objects and cultural institutions, so each designation is most useful when read in that broader context.`,
      `The designation year and legislative citation provide the legal record. The cultural meaning can be older and broader than the resolution itself, which is why TexasDefined keeps the official action separate from the larger story Texans associate with the symbol.`,
    ],
    facts: [["Official category", `State ${symbol.category}`], ["Designation year", String(symbol.year)], ["Source of record", sourceName]],
  };

  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-14 sm:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground"><Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><Link to="/texas-symbols" className="hover:text-foreground">Official Texas Symbols</Link><span className="mx-2">/</span><span className="text-foreground">{symbol.symbol}</span></nav>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Official Texas State {symbol.category}</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">{symbol.symbol}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{symbol.summary}</p>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
            <article className="max-w-3xl">
              <section>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">The official designation</p>
                <h2 className="mt-3 font-display text-4xl">Why {symbol.symbol} is an official Texas symbol</h2>
                <p className="mt-5 text-lg leading-8 text-foreground">The Texas Legislature designated <strong>{symbol.symbol}</strong> as the state's official {symbol.category.toLowerCase()} in {symbol.year}. The designation is recorded by the Texas State Library and Archives Commission, the state agency charged with maintaining the public list of Texas state symbols and place designations.</p>
                <p className="mt-5 leading-7 text-muted-foreground">Unlike an informal nickname or a popular cultural association, this entry has a specific legislative trail. That distinction matters on TexasDefined: we label something an official state symbol only when the designation appears in the state's authoritative symbol record.</p>
              </section>

              <section className="mt-12 border-y border-border py-10">
                <h2 className="font-display text-3xl">Designation at a glance</h2>
                <dl className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
                  <Fact term="Category" value={`State ${symbol.category}`} />
                  <Fact term="Official symbol" value={symbol.symbol} />
                  <Fact term="Designation year" value={String(symbol.year)} />
                  <Fact term="Legislative citation" value={symbol.resolution} />
                </dl>
              </section>

              <section className="mt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{context.eyebrow}</p>
                <h2 className="mt-3 font-display text-4xl">{context.heading}</h2>
                {context.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 leading-7 text-muted-foreground">{paragraph}</p>)}
                <dl className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
                  {context.facts.map(([term, value]) => <Fact key={term} term={term} value={value} />)}
                </dl>
              </section>

              <section className="mt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Texas context</p>
                <h2 className="mt-3 font-display text-4xl">How it fits into the Texas story</h2>
                <p className="mt-5 leading-7 text-muted-foreground">Texas's symbol list is unusually broad. It includes native wildlife and plants, foods, music, ranching traditions, minerals, historic vessels, cultural objects and even modern designations. Looking at {symbol.symbol} alongside the rest of the list is useful because the collection shows how Texans have chosen to represent the state's natural landscape and cultural history over more than a century.</p>
                <p className="mt-5 leading-7 text-muted-foreground">The first state-symbol era began in 1901 with the bluebonnet. Since then, later Legislatures have continued adding designations. The result is less a single set of emblems than a growing record of what different generations considered distinctly Texan.</p>
              </section>

              <section className="mt-12 rounded-sm border border-border bg-muted/30 p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Primary source</p>
                <h2 className="mt-3 font-display text-3xl">Verify the designation</h2>
                <p className="mt-4 leading-7 text-muted-foreground">TexasDefined uses the Texas State Library and Archives Commission's official state-symbol directory as the source of record for the designation, year and legislative citation on this page.</p>
                <a href={sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-block font-semibold text-primary underline-offset-4 hover:underline">Open {sourceName} ↗</a>
              </section>
            </article>

            <aside>
              <div className="sticky top-24 border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Official record</p>
                <p className="mt-3 font-display text-2xl">State {symbol.category}</p>
                <p className="mt-2 text-sm text-muted-foreground">Designated {symbol.year}</p>
                <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">{symbol.resolution}</p>
                <Link to="/texas-symbols" className="mt-6 inline-block font-semibold text-primary">View all Texas symbols →</Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-muted/25 py-14 sm:py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Related symbols</p>
          <h2 className="mt-3 font-display text-4xl">Keep exploring what Texas made official</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedSymbols.map((item) => <Link key={item.slug} to="/texas-symbols/$slug" params={{ slug: item.slug }} className="group border border-border bg-background p-5"><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">State {item.category}</p><p className="mt-2 font-display text-xl group-hover:text-primary">{item.symbol}</p><p className="mt-3 text-sm text-muted-foreground">Designated {item.year}</p></Link>)}
          </div>
        </Container>
      </section>
    </main>
  );
}

function Fact({ term, value }: { term: string; value: string }) {
  return <div className="bg-background p-5"><dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{term}</dt><dd className="mt-2 leading-6">{value}</dd></div>;
}