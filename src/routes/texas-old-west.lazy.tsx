import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/texas-old-west")({ component: TexasOldWestPage });

const storyLayers = [
  ["Frontier forts", "Army posts such as Fort Griffin, Fort McKavett and Fort Lancaster make military logistics, migration, conflict and the changing western frontier visible on the ground.", "/article/texas-frontier-forts-road-trip", "Follow the frontier-fort route"],
  ["Ranching & cattle", "Longhorns, trail drives and large ranches transformed Texas landscapes and economies. The story includes Mexican and Tejano ranching traditions, working families and the commercial systems behind the cowboy image.", "/destination/goodnight-ranch", "Visit the Goodnight Ranch guide"],
  ["Native homelands & conflict", "The western story cannot be separated from Comanche, Kiowa and other Native homelands, bison destruction, military campaigns and forced removal. The Red River War guide keeps those consequences inside the travel narrative.", "/article/texas-red-river-war-guide", "Read the Red River War guide"],
  ["Buffalo Soldiers", "Black Regular Army soldiers served at Texas frontier posts after the Civil War while facing discrimination within the nation they served. Their history belongs beside, not outside, the standard frontier story.", "/article/buffalo-soldiers-texas-frontier-guide", "Follow the Buffalo Soldiers guide"],
  ["Living western culture", "Rodeo arenas, dance halls, honky-tonks, the two-step and the Official State Longhorn Herd carry western identity into the present without pretending modern traditions are unchanged nineteenth-century artifacts.", "/sports-venues/rodeo-western", "Explore rodeo & western venues"],
] as const;

const routes = [
  ["Frontier forts & Hill Country", "Begin with the frontier-fort guide, then connect Fort Martin Scott or Fort McKavett with nearby towns, dance halls and the broader Hill Country road network.", "/article/texas-frontier-forts-road-trip"],
  ["Panhandle ranching & conflict", "Use Goodnight Ranch, Palo Duro Canyon and the Red River War guide together to understand ranch expansion, bison loss, Native removal and the ranching landscape that followed.", "/article/texas-red-river-war-guide"],
  ["Fort Worth living western culture", "Use the rodeo-and-western venue collection with Billy Bob's and the dance-hall guide for a modern visitor itinerary centered on performance, sport and western identity.", "/sports-venues/rodeo-western"],
] as const;

function TexasOldWestPage() {
  return <>
    <section className="border-b border-border bg-surface">
      <Container className="py-14 sm:py-20 lg:py-24">
        <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"><Link to="/">Home</Link> <span aria-hidden> / </span><Link to="/explore">Explore</Link> <span aria-hidden> / </span><span aria-current="page">Texas Old West</span></nav>
        <p className="eyebrow mt-10 text-primary">Old West · ranch · rodeo</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Texas Old West is bigger than the cowboy myth</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Use forts, ranches, longhorns, Native history, Buffalo Soldiers, rodeo grounds and dance halls to follow western Texas as a connected landscape. This guide organizes existing Texas Defined destination and history authority into trips you can actually plan.</p>
      </Container>
    </section>

    <section className="border-b border-border bg-background">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          <div><p className="eyebrow text-primary">Start here</p><h2 className="mt-3 font-display text-4xl">Five layers make the story useful</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Treating the Old West as one costume-drama era hides the people and systems that actually shaped Texas. These layers overlap geographically, so a good road trip should cross several of them.</p></div>
          <div className="grid gap-px border border-border bg-border">
            {storyLayers.map(([title, body, href, label]) => <article key={title} className="bg-background p-6"><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p><Link to={href} className="mt-4 inline-block text-sm font-semibold text-primary">{label} →</Link></article>)}
          </div>
        </div>
      </Container>
    </section>

    <section className="border-b border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">Places that make it concrete</p><h2 className="mt-3 max-w-4xl font-display text-4xl">Move from broad history into preserved places</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Official Texas Longhorn Herd", "/destination/official-texas-longhorn-herd", "See the state herd and connect longhorn conservation to ranching history."],
            ["Goodnight Ranch", "/destination/goodnight-ranch", "Use a preserved ranch landscape to understand Panhandle ranching and Charles and Mary Ann Goodnight."],
            ["Fort Griffin", "/destination/fort-griffin", "Connect a frontier Army post, the state longhorn herd and the cattle-trail era."],
            ["Texas dance halls", "/texas-dance-halls-honky-tonks", "Follow the social rooms where western swing, country music and community life became lived culture."],
            ["Texas two-step", "/texas-two-step", "Understand the dance tradition before building a dance-hall or honky-tonk night into the trip."],
            ["Historic sites & museums", "/explore/historic-sites", "Browse the larger preserved-site catalog for forts, battlefields, homes, missions and museums."],
          ].map(([title, href, body]) => <Link key={href} to={href} className="group border-t-2 border-foreground pt-5"><h3 className="font-display text-2xl group-hover:text-primary">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p><span className="mt-4 inline-block text-sm font-semibold text-primary">Open guide →</span></Link>)}
        </div>
      </Container>
    </section>

    <section className="border-b border-border bg-background">
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">Build a route</p><h2 className="mt-3 font-display text-4xl">Three ways to put western heritage on the road</h2>
        <div className="mt-8 grid gap-px border border-border bg-border lg:grid-cols-3">{routes.map(([title, body, href]) => <article key={title} className="bg-background p-6 sm:p-7"><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p><Link to={href} className="mt-5 inline-block text-sm font-semibold text-primary">Start this route →</Link></article>)}</div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to="/explore/trip-planner" className="text-primary">Texas Trip Planner →</Link><Link to="/explore/road-trips" className="text-primary">More Texas road trips →</Link><Link to="/events" className="text-primary">Rodeos, fairs & events →</Link></div>
      </Container>
    </section>

    <section className="border-b border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <div className="max-w-4xl"><p className="eyebrow text-primary">History before mythology</p><h2 className="mt-3 font-display text-4xl">Keep the contradictions in the same story</h2><p className="mt-5 text-base leading-8 text-muted-foreground">Texas western heritage includes celebrated ranching skill, horse culture, trail drives and rodeo traditions, but it also includes Native dispossession, the destruction of bison herds, military campaigns, racial exclusion and hard labor that popular western imagery often leaves out. Texas Defined links those histories together so a visitor can appreciate a fort, ranch or rodeo without turning a complicated past into scenery.</p></div>
      </Container>
    </section>

    <section className="bg-background">
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">Official sources & deeper context</p><h2 className="mt-3 font-display text-3xl">Check the managing authority before a special trip</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Hours, access, events and preservation work can change. Use the official site for current visitor details, especially at historic sites and active event venues.</p>
        <ul className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3"><li><a href="https://thc.texas.gov/historic-sites" target="_blank" rel="noreferrer" className="text-primary">Texas Historical Commission historic sites ↗</a></li><li><a href="https://tpwd.texas.gov/state-parks/park-information/wildlife/official-state-longhorn" target="_blank" rel="noreferrer" className="text-primary">TPWD Official State Longhorn Herd ↗</a></li><li><a href="https://www.nps.gov/subjects/buffalosoldiers/about.htm" target="_blank" rel="noreferrer" className="text-primary">National Park Service Buffalo Soldiers ↗</a></li></ul>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6 text-sm font-semibold"><Link to="/texas-history" className="text-primary">Continue into Texas History →</Link><Link to="/texas-sacred-places" className="text-primary">Sacred Places & religious heritage →</Link></div>
      </Container>
    </section>
  </>;
}
