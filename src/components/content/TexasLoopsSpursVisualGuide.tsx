export function TexasLoopsSpursVisualGuide() {
  return (
    <section className="my-10 border-y border-border py-8" aria-labelledby="loops-spurs-visual-guide">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-primary">Read the sign</p>
          <h2 id="loops-spurs-visual-guide" className="mt-2 font-display text-3xl leading-tight sm:text-4xl">
            Loop and Spur describe the route's role, not its shape
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-muted-foreground">
          The drawings below are simplified network diagrams. Real Texas routes can be longer, partially rebuilt,
          renumbered or absorbed into larger urban systems.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="border border-border bg-surface p-6">
          <p className="eyebrow text-primary">State Highway Loop</p>
          <div className="mt-5 rounded-sm border border-border bg-background p-5" aria-label="Simplified loop-route diagram">
            <div className="relative h-40">
              <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-foreground/70" />
              <div className="absolute left-1/2 top-8 h-24 w-2/5 -translate-x-[calc(100%+1rem)] rounded-l-full border-y-4 border-l-4 border-primary" />
              <div className="absolute left-1/2 top-7 -translate-x-1/2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold">Main highway</div>
              <div className="absolute left-8 top-16 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Loop</div>
            </div>
          </div>
          <h3 className="mt-5 font-display text-2xl">Think bypass or reconnecting route</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            A Loop commonly leaves the main corridor, routes traffic around or through another alignment, and reconnects
            with the highway system. It does not have to make a full circle.
          </p>
        </article>

        <article className="border border-border bg-surface p-6">
          <p className="eyebrow text-primary">State Highway Spur</p>
          <div className="mt-5 rounded-sm border border-border bg-background p-5" aria-label="Simplified spur-route diagram">
            <div className="relative h-40">
              <div className="absolute left-1/3 top-0 h-full w-1 bg-foreground/70" />
              <div className="absolute left-1/3 top-20 h-1 w-1/2 bg-primary" />
              <div className="absolute left-[30%] top-7 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold">Main highway</div>
              <div className="absolute right-2 top-[4.2rem] rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Spur → destination</div>
            </div>
          </div>
          <h3 className="mt-5 font-display text-2xl">Think branch connection</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            A Spur usually branches from a state highway and ends at a local road, district or destination instead of
            continuing as a through route.
          </p>
        </article>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <article className="border-t-2 border-primary pt-4">
          <p className="eyebrow text-muted-foreground">Modern example</p>
          <h3 className="mt-2 font-display text-xl">Loop 1604</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            A major San Antonio metro corridor whose present-day scale is much larger than the simple idea of a small bypass.
          </p>
        </article>
        <article className="border-t-2 border-primary pt-4">
          <p className="eyebrow text-muted-foreground">Naming lesson</p>
          <h3 className="mt-2 font-display text-xl">I-410</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            San Antonians still say “410 loop,” but the official route is Interstate 410. Local language and current route identity can diverge.
          </p>
        </article>
        <article className="border-t-2 border-primary pt-4">
          <p className="eyebrow text-muted-foreground">Do not confuse</p>
          <h3 className="mt-2 font-display text-xl">Beltway 8</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            “Beltway” describes a ring-road idea; “Loop” is a Texas highway-system designation. Related concepts are not the same thing.
          </p>
        </article>
      </div>
    </section>
  );
}
