import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/texas-sacred-places")({ component: TexasSacredPlacesPage });

const distinctions = [
  ["Living houses of worship", "A historic church or mission can still be an active religious community. Worship, funerals, weddings and parish life take priority over sightseeing; visitor access may change around services."],
  ["Historic and museum sites", "Some religious sites are interpreted primarily as historic places. Their visitor rules, preservation needs and managing authorities may differ from those of an active congregation."],
  ["Cemeteries and memorial landscapes", "National cemeteries and burial grounds are places of remembrance, not conventional attractions. Quiet conduct matters, and active funerals always take priority."],
  ["Archaeological and culturally sensitive places", "Sacred landscapes can carry Indigenous, community or burial significance that is not appropriate for casual access. Texas Defined does not treat sensitivity or restricted access as a tourism obstacle to work around."],
] as const;

function TexasSacredPlacesPage() {
  return <>
    <section className="border-b border-border bg-surface">
      <Container className="py-14 sm:py-20 lg:py-24">
        <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"><Link to="/">Home</Link> <span aria-hidden> / </span><Link to="/explore">Explore</Link> <span aria-hidden> / </span><span aria-current="page">Sacred Places</span></nav>
        <p className="eyebrow mt-10 text-primary">Faith · heritage · remembrance</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Visit sacred Texas with history and respect intact</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Texas religious heritage includes active parishes, Spanish mission landscapes, immigrant churches, painted interiors, cemeteries and memorial places. This guide connects the strongest source-backed Texas Defined collections while keeping worship, burial, cultural sensitivity and visitor access distinct.</p>
      </Container>
    </section>

    <section className="border-b border-border bg-background">
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">Know what kind of place you are entering</p><h2 className="mt-3 max-w-4xl font-display text-4xl">“Historic” does not mean “finished” or “public in the same way”</h2>
        <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">{distinctions.map(([title, body]) => <article key={title} className="bg-background p-6 sm:p-7"><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></article>)}</div>
      </Container>
    </section>

    <section className="border-b border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14"><div><p className="eyebrow text-primary">Painted Churches</p><h2 className="mt-3 font-display text-4xl">The strongest sacred-heritage collection on Texas Defined</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">The Painted Churches project already separates visitor planning from cultural heritage, decorative techniques, preservation, artists, archival material and individual church records. Use the statewide collection instead of treating the churches as interchangeable photo stops.</p></div><div className="grid gap-3"><Link to="/explore/painted-churches" className="border-t border-border py-4 font-semibold text-primary">Painted Churches collection →</Link><Link to="/explore/painted-churches/heritage" className="border-t border-border py-4 font-semibold text-primary">Cultural heritage & communities →</Link><Link to="/explore/painted-churches/routes" className="border-t border-border py-4 font-semibold text-primary">Researched visitor routes →</Link><Link to="/explore/painted-churches/preservation" className="border-t border-border py-4 font-semibold text-primary">Preservation records →</Link></div></div>
      </Container>
    </section>

    <section className="border-b border-border bg-background">
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">Missions & borderlands</p><h2 className="mt-3 max-w-4xl font-display text-4xl">Read mission landscapes as communities, churches and colonial institutions</h2><p className="mt-5 max-w-4xl text-base leading-8 text-muted-foreground">The National Park Service describes the San Antonio missions as communities that included church, work, learning and sacred burial spaces; the four mission churches within San Antonio Missions National Historical Park remain active Catholic parishes. Mission history also includes Spanish colonial conversion and acculturation, Indigenous communities and changing political borders. That fuller context matters more than a picturesque façade.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3"><Link to="/article/texas-borderlands-historic-sites-guide" className="border-t-2 border-foreground pt-5"><h3 className="font-display text-2xl">Texas borderlands historic sites</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Connect Pueblo, Spanish, Mexican, Tejano and Indigenous histories across the borderlands.</p></Link><Link to="/destination/old-socorro-mission" className="border-t-2 border-foreground pt-5"><h3 className="font-display text-2xl">Old Socorro Mission</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Move into an individual mission record with location and visitor context.</p></Link><Link to="/destination/mission-dolores" className="border-t-2 border-foreground pt-5"><h3 className="font-display text-2xl">Mission Dolores</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Explore another mission landscape through the historic-site destination layer.</p></Link></div>
      </Container>
    </section>

    <section className="border-b border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-2"><section><p className="eyebrow text-primary">Immigrant religious communities</p><h2 className="mt-3 font-display text-3xl">Faith, language, architecture and settlement</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">German, Czech, Wendish, Polish and other communities built religious institutions into the social geography of Texas towns. The best visitor context connects churches with settlement history, architecture, food, music and community continuity rather than isolating a sanctuary from the town around it.</p><Link to="/german-czech-texas-towns" className="mt-5 inline-block text-sm font-semibold text-primary">German & Czech Texas towns →</Link></section><section><p className="eyebrow text-primary">Cemeteries & remembrance</p><h2 className="mt-3 font-display text-3xl">Memorial landscapes require a different visitor posture</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Texas Defined's national-cemetery guide connects Fort Sam Houston, Houston and Dallas–Fort Worth National Cemeteries to military history while emphasizing that they remain active burial grounds. Use grave locators and official visitor information, keep voices low and give services and grieving families space.</p><Link to="/article/texas-national-cemeteries-guide" className="mt-5 inline-block text-sm font-semibold text-primary">Texas national cemeteries guide →</Link></section></div>
      </Container>
    </section>

    <section className="border-b border-border bg-background">
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">Plan by region</p><h2 className="mt-3 font-display text-4xl">Build the trip around context, not a checklist</h2>
        <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2"><article className="bg-background p-6"><h3 className="font-display text-2xl">Central Texas & the Hill Country</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Start with Painted Churches routes and German/Czech heritage, then use town and history pages to understand the communities around the buildings.</p></article><article className="bg-background p-6"><h3 className="font-display text-2xl">San Antonio & South Texas</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Connect mission history, active parish life, borderlands history and military-memory landscapes. Confirm worship and visitor schedules before arriving.</p></article><article className="bg-background p-6"><h3 className="font-display text-2xl">El Paso borderlands</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Use Old Socorro Mission and the borderlands guide to place sacred architecture inside a much older Indigenous, Spanish, Mexican and American landscape.</p></article><article className="bg-background p-6"><h3 className="font-display text-2xl">Metro memorial landscapes</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">National cemeteries near San Antonio, Houston and Dallas–Fort Worth can anchor respectful military-memory research rather than conventional sightseeing.</p></article></div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to="/explore/trip-planner" className="text-primary">Texas Trip Planner →</Link><Link to="/texas-history" className="text-primary">Texas History →</Link><Link to="/explore/historic-sites" className="text-primary">Historic sites & museums →</Link></div>
      </Container>
    </section>

    <section className="bg-surface">
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">Current scope & official sources</p><h2 className="mt-3 max-w-4xl font-display text-3xl">Coverage grows only when visitor access and source depth justify it</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Texas Defined's current source-backed visitor authority is strongest for Painted Churches, Spanish mission and borderlands heritage, selected immigrant religious communities and national-cemetery memorial landscapes. We will not create thin pages for synagogues, temples, monasteries, shrines or culturally sensitive sacred sites merely to fill a taxonomy; those areas should become indexable only when access, history and authoritative sourcing are strong enough to serve visitors responsibly.</p>
        <ul className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3"><li><a href="https://www.nps.gov/saan/index.htm" target="_blank" rel="noreferrer" className="text-primary">NPS San Antonio Missions ↗</a></li><li><a href="https://thc.texas.gov/historic-sites" target="_blank" rel="noreferrer" className="text-primary">Texas Historical Commission historic sites ↗</a></li><li><a href="https://www.cem.va.gov/find-cemetery/state.asp?STATE=TX" target="_blank" rel="noreferrer" className="text-primary">VA National Cemeteries in Texas ↗</a></li></ul>
      </Container>
    </section>
  </>;
}
