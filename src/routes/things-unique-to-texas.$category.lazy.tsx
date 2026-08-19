import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { texasIconCanonicalHref } from "@/data/things-unique-to-texas-links";

export const Route = createLazyFileRoute("/things-unique-to-texas/$category")({
  component: TexasIconCategoryPage,
});

function TexasIconCategoryPage() {
  const category = Route.useLoaderData();
  const tripPlanningCategory = ["natural-wonders", "landmarks", "roadside-small-towns", "food-drink"].includes(category.slug);

  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-16 sm:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span>
            <Link to="/things-unique-to-texas" className="hover:text-foreground">Things That Define Texas</Link><span className="mx-2">/</span>
            <span className="text-foreground">{category.title}</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{category.eyebrow}</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">{category.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{category.description}</p>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">{category.items.length} entries in this chapter</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
            <div className="grid gap-4 sm:grid-cols-2">
              {category.items.map((entry) => {
                const href = texasIconCanonicalHref(entry);
                const content = (
                  <div className="flex items-start gap-4">
                    <span className="mt-1 min-w-9 text-sm font-semibold tabular-nums text-primary">{entry.id}</span>
                    <div>
                      <h2 className="font-display text-2xl leading-tight">{entry.name}</h2>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{entry.note}</p>
                      {href && <p className="mt-4 text-sm font-semibold text-primary">Explore the deeper TexasDefined guide →</p>}
                    </div>
                  </div>
                );
                return href ? (
                  <Link key={entry.id} to={href} className="group border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-muted/30">{content}</Link>
                ) : (
                  <article key={entry.id} className="border border-border bg-card p-6">{content}</article>
                );
              })}
            </div>

            <aside className="border border-border bg-muted/25 p-6 lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Related reading</p>
              <h2 className="mt-3 font-display text-3xl">Go beyond the list</h2>
              <div className="mt-6 divide-y divide-border border-y border-border">
                {category.deepDives.map((link) => (
                  <Link key={link.href} to={link.href} className="group block py-5">
                    <span className="font-semibold group-hover:text-primary">{link.label} →</span>
                    <span className="mt-1 block text-sm leading-6 text-muted-foreground">{link.description}</span>
                  </Link>
                ))}
                {tripPlanningCategory && (
                  <Link to="/explore/trip-planner" className="group block py-5">
                    <span className="font-semibold group-hover:text-primary">Build a trip from these Texas icons →</span>
                    <span className="mt-1 block text-sm leading-6 text-muted-foreground">Turn food stops, natural wonders, landmarks and small-town detours into a Texas itinerary.</span>
                  </Link>
                )}
              </div>
              <Link to="/things-unique-to-texas" className="mt-6 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline">Back to all 250 Texas icons</Link>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
