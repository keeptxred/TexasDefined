import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

const groupLabels = {
  "specific-churches": "Specific churches",
  "towns-locations": "Towns and locations",
  "tours-trip-planning": "Tours and trip planning",
  "history-architecture-culture": "History, architecture and culture",
} as const;

const groupOrder = ["specific-churches", "towns-locations", "tours-trip-planning", "history-architecture-culture"] as const;

export const Route = createLazyFileRoute("/explore/painted-churches/guides")({
  component: PaintedChurchSearchGuideHub,
});

function PaintedChurchSearchGuideHub() {
  const { coverage, guideCount } = Route.useLoaderData();
  const dedicated = coverage.filter((item) => item.coverage === "search-guide").length;
  const existing = coverage.length - dedicated;

  return <main>
    <section className="border-b border-border bg-ink text-ink-foreground">
      <Container className="py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-ink-foreground/60">
          <ol className="flex flex-wrap items-center gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page" className="text-white">Guide library</li></ol>
        </nav>
        <p className="eyebrow mt-10 text-ink-foreground/65">Painted Churches guide library</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Plan a visit, identify a church, or dig deeper into the Painted Churches.</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-ink-foreground/80">Use this library to move from practical trip questions to verified church profiles, maps, people, heritage, architecture and decorative-art research. {dedicated} focused guides cover questions that need more explanation, while the rest point directly to the strongest existing Texas Defined resource.</p>
      </Container>
    </section>

    <Container className="py-14 sm:py-18">
      <section className="grid gap-px border border-border bg-border sm:grid-cols-3">
        <div className="bg-background p-6"><p className="eyebrow text-muted-foreground">Topics covered</p><p className="mt-3 font-display text-5xl">{coverage.length}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Churches, places, trip planning and history.</p></div>
        <div className="bg-background p-6"><p className="eyebrow text-muted-foreground">Focused guides</p><p className="mt-3 font-display text-5xl">{dedicated}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Detailed answers for planning, identification and interpretation.</p></div>
        <div className="bg-background p-6"><p className="eyebrow text-muted-foreground">Connected resources</p><p className="mt-3 font-display text-5xl">{existing}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Church profiles, map, planner, people, heritage, techniques and timeline.</p></div>
      </section>

      {groupOrder.map((group) => {
        const items = coverage.filter((item) => item.group === group);
        return <section key={group} className="mt-16 border-t-2 border-foreground pt-8">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">Browse by topic</p><h2 className="mt-3 font-display text-4xl sm:text-5xl">{groupLabels[group]}</h2></div><p className="text-sm text-muted-foreground">{items.length} topics</p></div>
          <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
            {items.map((item) => <a key={item.query} href={item.canonicalPath} className="group bg-background p-6 hover:bg-surface">
              <p className="eyebrow text-muted-foreground">{item.coverage === "search-guide" ? "Dedicated guide" : item.coverage === "church-profile" ? "Church profile" : "Existing guide"}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{item.query}</h3>
              <p className="mt-4 text-sm font-medium text-primary">Open the answer →</p>
            </a>)}
          </div>
        </section>;
      })}

      <section className="mt-16 border-t border-border pt-8">
        <p className="eyebrow text-primary">Keep exploring</p>
        <h2 className="mt-3 font-display text-4xl">Explore the full Painted Churches collection</h2>
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link to="/explore/painted-churches" className="border-b border-primary text-primary">Main Painted Churches guide</Link>
          <Link to="/explore/painted-churches/map" className="border-b border-primary text-primary">Statewide map</Link>
          <Link to="/explore/painted-churches-plan" className="border-b border-primary text-primary">Self-guided planner</Link>
          <Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Research methodology</Link>
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">The coverage registry contains {guideCount} dedicated search guides. When a church name or location is ambiguous, the guide says so explicitly and directs readers to verified records rather than manufacturing certainty.</p>
      </section>
    </Container>
  </main>;
}
