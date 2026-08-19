import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/things-unique-to-texas")({
  component: ThingsUniqueToTexasPage,
});

function ThingsUniqueToTexasPage() {
  const { categories, itemCount } = Route.useLoaderData();

  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-16 sm:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><span className="text-foreground">Things That Define Texas</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Texas, in 250 details</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">Things That Define Texas</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Texas is too big to explain with a flag, a brisket and a cowboy boot. This guide connects the foods, landscapes, brands, buildings, roadside oddities, music, wildlife, sayings and rituals that make different parts of the state feel unmistakably Texan.</p>
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
            <Stat value={String(itemCount)} label="Texas icons" />
            <Stat value={String(categories.length)} label="Magazine chapters" />
            <Stat value="1" label="Very big state" />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Choose a chapter</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Eight ways to understand Texas</h2>
            <p className="mt-5 leading-7 text-muted-foreground">Each chapter works as its own evergreen magazine guide, with direct paths into TexasDefined's deeper articles, destination guides and planning tools.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {categories.map((category) => (
              <Link key={category.slug} to="/things-unique-to-texas/$category" params={{ category: category.slug }} className="group border border-border bg-card p-7 transition-colors hover:border-primary/50 hover:bg-muted/30">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{category.eyebrow}</p>
                <div className="mt-3 flex items-start justify-between gap-6">
                  <h3 className="font-display text-3xl leading-tight group-hover:text-primary">{category.title}</h3>
                  <span className="shrink-0 text-sm tabular-nums text-muted-foreground">{category.items.length}</span>
                </div>
                <p className="mt-4 leading-7 text-muted-foreground">{category.description}</p>
                <p className="mt-6 text-sm font-semibold">Read the chapter <span aria-hidden="true">→</span></p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted/25 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Not a trivia dump</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">The list is a doorway into the rest of TexasDefined</h2>
              <p className="mt-5 leading-7 text-muted-foreground">Where TexasDefined already has a strong guide—barbecue styles, state symbols, wildlife, wildflowers, cultural regions, courthouse squares, Painted Churches or farm-to-market roads—we point readers there instead of creating duplicate thin pages. Places worth visiting connect into Explore Texas so the list can become a trip, not just a scroll.</p>
              <p className="mt-4 leading-7 text-muted-foreground">We also separate Texas origins from Texas adoption. Topo Chico, for example, is Mexican, but it has a real place in Texas drink culture. The Lone Star flag is deeply Texan, but it does not get a special exemption from U.S. flag protocol. That distinction is part of making this collection useful rather than repeating internet folklore.</p>
            </div>
            <aside className="border border-border bg-background p-7">
              <h2 className="font-display text-3xl">Go deeper</h2>
              <div className="mt-6 divide-y divide-border border-y border-border">
                <RelatedLink to="/texas-symbols" title="Official Texas Symbols" text="See which icons are actually designated by the state." />
                <RelatedLink to="/texas-explained" title="Texas Explained" text="Understand the geography, roads, towns, homes and systems behind the culture." />
                <RelatedLink to="/explore" title="Explore Texas" text="Turn natural wonders, landmarks and small-town stops into a trip." />
                <RelatedLink to="/events" title="Texas Events" text="Find rodeos, festivals and traditions you can experience in person." />
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="bg-background p-5"><p className="font-display text-3xl">{value}</p><p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</p></div>;
}

function RelatedLink({ to, title, text }: { to: string; title: string; text: string }) {
  return <Link to={to} className="group block py-5"><span className="font-semibold group-hover:text-primary">{title} →</span><span className="mt-1 block text-sm leading-6 text-muted-foreground">{text}</span></Link>;
}
