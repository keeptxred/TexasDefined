import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/texas-science-technology-industry")({ component: TexasScienceTechnologyIndustryPage });

const layers = [
  ["Spaceflight", "Houston is the obvious anchor, but the visitor story is bigger than a single attraction: human spaceflight, mission operations, spacecraft hardware and STEM interpretation all connect here.", "/explore/top-attractions", "Start with Space Center Houston"],
  ["Astronomy", "West Texas turns research infrastructure into a destination. McDonald Observatory and the dark-sky landscape connect professional astronomy, public programs and night-sky travel.", "/texas-stargazing-guide", "Plan an astronomy trip"],
  ["Aviation", "Texas aviation history spans military training, aircraft development, flight museums and the infrastructure that helped make the state a center of aerospace work.", "/article/san-antonio-military-aviation-history", "Follow San Antonio aviation history"],
  ["Railroads", "Railroad museums and preserved depots explain how passengers, freight, ports and inland cities became linked into statewide and national systems.", "/explore/historic-sites", "Browse historic sites & museums"],
  ["Maritime & ports", "The Gulf Coast tells an industrial story through shipbuilding, navigation, fishing, ports and maritime museums. These are working systems as well as heritage attractions.", "/explore/beaches-coast", "Explore the Texas coast"],
  ["Energy & engineering", "Oil, gas and the Permian Basin shaped cities, migration, engineering and the built landscape. Visitor museums can explain that history without turning an industry story into an advertisement.", "/browse/cities", "Browse Texas cities"],
] as const;

const officialSources = [
  ["Space Center Houston", "https://spacecenter.org/visitor-information"],
  ["McDonald Observatory", "https://mcdonaldobservatory.org/visit/"],
  ["Lone Star Flight Museum", "https://lonestarflight.org/"],
  ["Galveston Railroad Museum", "https://galvestonrrmuseum.org/about-us/"],
  ["Texas Maritime Museum", "https://texasmaritimemuseum.org/"],
  ["Permian Basin Petroleum Museum", "https://petroleummuseum.org/"],
] as const;

function TexasScienceTechnologyIndustryPage() {
  return <>
    <section className="border-b border-border bg-surface">
      <Container className="py-14 sm:py-20 lg:py-24">
        <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"><Link to="/">Home</Link> <span aria-hidden> / </span><Link to="/explore">Explore</Link> <span aria-hidden> / </span><span aria-current="page">Science, Space & Industry</span></nav>
        <p className="eyebrow mt-10 text-primary">Science · space · technology · industry</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">See the systems Texas built—and the science behind them</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Use space centers, observatories, flight museums, rail collections, maritime museums and energy exhibits to connect Texas innovation with the cities, landscapes and industries that made it possible. This guide is a visitor pathway over existing canonical destinations and guides, not a duplicate museum directory.</p>
      </Container>
    </section>

    <section className="border-b border-border bg-background">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <div><p className="eyebrow text-primary">Six visitor lenses</p><h2 className="mt-3 font-display text-4xl">Move from invention to place</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Science and industry are easiest to understand when the machinery, research and infrastructure stay connected to geography. Pick a lens, then use the linked statewide guides to build the rest of the trip.</p></div>
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {layers.map(([title, body, href, label]) => <article key={title} className="bg-background p-6"><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p><Link to={href} className="mt-4 inline-block text-sm font-semibold text-primary">{label} →</Link></article>)}
          </div>
        </div>
      </Container>
    </section>

    <section className="border-b border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">Build a science-and-industry itinerary</p><h2 className="mt-3 max-w-4xl font-display text-4xl">Three strong ways to combine the collection</h2>
        <div className="mt-8 grid gap-px border border-border bg-border lg:grid-cols-3">
          <article className="bg-background p-6 sm:p-7"><h3 className="font-display text-2xl">Houston: space + flight + science</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Pair Space Center Houston with a major science museum or Lone Star Flight Museum, then use the city guide to add neighborhoods, food and another family attraction instead of treating each museum as an isolated stop.</p><Link to="/explore/top-attractions" className="mt-5 inline-block text-sm font-semibold text-primary">Compare major attractions →</Link></article>
          <article className="bg-background p-6 sm:p-7"><h3 className="font-display text-2xl">West Texas: astronomy + energy</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Use McDonald Observatory for the research-and-night-sky side of West Texas, then connect Midland and the Permian Basin for the engineering and petroleum story. Distances are substantial, so route planning matters.</p><Link to="/texas-stargazing-guide" className="mt-5 inline-block text-sm font-semibold text-primary">Start with the stargazing guide →</Link></article>
          <article className="bg-background p-6 sm:p-7"><h3 className="font-display text-2xl">Gulf Coast: rail + maritime systems</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Galveston and the coast make transportation systems visible: rail terminals, shipping, navigation, ports, maritime collections and the communities built around them.</p><Link to="/explore/beaches-coast" className="mt-5 inline-block text-sm font-semibold text-primary">Continue to beaches & coast →</Link></article>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to="/explore/trip-planner" className="text-primary">Texas Trip Planner →</Link><Link to="/browse/cities" className="text-primary">Browse cities →</Link><Link to="/explore/historic-sites" className="text-primary">Historic sites & museums →</Link><Link to="/texas-history" className="text-primary">Texas History →</Link></div>
      </Container>
    </section>

    <section className="border-b border-border bg-background">
      <Container className="py-12 sm:py-16">
        <div className="max-w-4xl"><p className="eyebrow text-primary">Visitor context matters</p><h2 className="mt-3 font-display text-4xl">A working system is not the same thing as a museum exhibit</h2><p className="mt-5 text-base leading-8 text-muted-foreground">Ports, observatories, airports, energy infrastructure and research facilities can have controlled access, security rules, timed programs or areas that are never open to the public. Texas Defined separates public visitor experiences from the larger working system around them. Use museums and official visitor programs for interpretation, and never assume industrial or research property is open simply because it is visible from a public road.</p><p className="mt-4 text-base leading-8 text-muted-foreground">For energy and industrial history, the useful question is not whether an industry was simply “good” or “bad.” Look at engineering, labor, migration, environmental effects, economic change and the communities that grew around the work. The same principle applies to aviation, rail and maritime history: technology makes more sense when people and place stay in the story.</p></div>
      </Container>
    </section>

    <section className="bg-surface">
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">Official visitor sources</p><h2 className="mt-3 font-display text-3xl">Verify access, programs and tickets before you drive</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Science facilities and museums frequently use timed programs, special tours or changing exhibit schedules. These first-party sources are the final authority for current visitor details. Source review: August 30, 2026.</p>
        <ul className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-2 lg:grid-cols-3">{officialSources.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noreferrer" className="text-primary">{label} ↗</a></li>)}</ul>
      </Container>
    </section>
  </>;
}
