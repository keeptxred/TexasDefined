import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/texas-college-towns")({ component: TexasCollegeTownsPage });

const towns = [
  ["Austin · UT", "A campus visit can connect the Forty Acres, museums, live music, college sports and central Austin. On major event days, campus parking and pedestrian traffic should shape the itinerary.", "/sports-venues/austin-central-texas", "Austin & Central Texas sports"],
  ["College Station · Texas A&M", "Aggieland is one of Texas’s clearest campus-centered destinations: traditions, Kyle Field, museums and Bryan–College Station all work as one visitor weekend.", "/sports-venues/college-station", "College Station sports"],
  ["Waco · Baylor", "Baylor’s Brazos River campus sits inside a broader Waco trip that can combine college sports, museums, downtown and family attractions without long cross-city drives.", "/sports-venues/waco", "Waco sports"],
  ["Lubbock · Texas Tech", "Texas Tech anchors a West Texas city where game weekends, campus art and architecture, music heritage and regional museums can support a full weekend rather than a single event.", "/sports-venues/lubbock", "Lubbock sports"],
  ["Fort Worth · TCU", "TCU provides a campus-scale counterpoint to Fort Worth’s larger Stockyards, museum district and downtown visitor zones. Treat campus parking and event access separately from the rest of the city.", "/sports-venues/dallas-fort-worth", "DFW sports"],
  ["El Paso · UTEP", "UTEP’s Bhutanese-inspired architecture, Franklin Mountain setting and campus events make the university a distinct El Paso visitor stop, especially when paired with downtown and borderland history.", "/sports-venues/el-paso", "El Paso sports"],
] as const;

const officialSources = [
  ["UT Austin campus visits", "https://admissions.utexas.edu/explore/visit-campus/"],
  ["Texas A&M Appelt Aggieland Visitor Center", "https://www.tamu.edu/visit/visitor-center.html"],
  ["Texas Tech campus visits", "https://www.depts.ttu.edu/admissions/visit-events/index-1.php"],
  ["UTEP campus visits", "https://www.utep.edu/visit/"],
  ["TCU campus visitor programs", "https://admissions.tcu.edu/visit/programs-events.php"],
] as const;

function TexasCollegeTownsPage() {
  return <>
    <section className="border-b border-border bg-surface"><Container className="py-14 sm:py-20 lg:py-24">
      <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"><Link to="/">Home</Link> <span aria-hidden> / </span><Link to="/explore">Explore</Link> <span aria-hidden> / </span><span aria-current="page">College Towns</span></nav>
      <p className="eyebrow mt-10 text-primary">College towns · campuses · traditions</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Visit the campus—and the Texas town around it</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A Texas college-town trip can be a campus tour, game weekend, museum day, family visit or road-trip stop. The useful plan connects the university to the surrounding city while keeping official campus access, parking and event rules separate from ordinary tourism advice.</p>
    </Container></section>

    <section className="border-b border-border bg-background"><Container className="py-12 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:gap-14"><div><p className="eyebrow text-primary">Six campus-city pairings</p><h2 className="mt-3 font-display text-4xl">Start with the town, not a ranking</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">This is not a “best colleges” list. It is a visitor-planning guide to places where the campus meaningfully shapes the travel experience. Use the linked sports collections for venue-specific game-day detail, then layer in city attractions and events.</p></div>
      <div className="grid gap-px border border-border bg-border md:grid-cols-2">{towns.map(([title, body, href, label]) => <article key={title} className="bg-background p-6"><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p><Link to={href} className="mt-4 inline-block text-sm font-semibold text-primary">{label} →</Link></article>)}</div></div>
    </Container></section>

    <section className="border-b border-border bg-surface"><Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Build the weekend</p><h2 className="mt-3 max-w-4xl font-display text-4xl">Four layers make a campus trip work</h2>
      <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
        <article className="bg-background p-6"><h3 className="font-display text-2xl">Campus visit</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Use the university’s official visitor page for tour registration, check-in, parking and building-access expectations. Admissions tours and ordinary tourist access are not always the same thing.</p></article>
        <article className="bg-background p-6"><h3 className="font-display text-2xl">Game day</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Football Saturdays and major rivalry dates can change parking, roads, lodging demand and pedestrian flow across an entire campus district.</p><Link to="/sports-venues/college-sports" className="mt-4 inline-block text-sm font-semibold text-primary">College sports venues →</Link></article>
        <article className="bg-background p-6"><h3 className="font-display text-2xl">City layer</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Add museums, music, food, downtown districts or outdoor stops that belong to the city rather than forcing the whole weekend to stay inside campus boundaries.</p><Link to="/browse/cities" className="mt-4 inline-block text-sm font-semibold text-primary">Browse Texas cities →</Link></article>
        <article className="bg-background p-6"><h3 className="font-display text-2xl">Calendar</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Concerts, commencements, festivals and tournaments can matter as much as athletics. Check the date before choosing lodging or assuming a normal weekend traffic pattern.</p><Link to="/events" className="mt-4 inline-block text-sm font-semibold text-primary">Texas events →</Link></article>
      </div>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to="/explore/trip-planner" className="text-primary">Texas Trip Planner →</Link><Link to="/sports" className="text-primary">Texas sports →</Link><Link to="/explore/top-attractions" className="text-primary">Top attractions →</Link><Link to="/texas-history" className="text-primary">Texas history →</Link></div>
    </Container></section>

    <section className="bg-background"><Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Official campus sources</p><h2 className="mt-3 font-display text-3xl">Check campus rules before the visit</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Tours, visitor parking, event access and campus schedules change. These first-party university pages are the final authority for current campus-visit details. Source review: August 30, 2026.</p>
      <ul className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-2 lg:grid-cols-3">{officialSources.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noreferrer" className="text-primary">{label} ↗</a></li>)}</ul>
    </Container></section>
  </>;
}
