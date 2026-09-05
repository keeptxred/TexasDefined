import { createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/texas-food-trucks")({
  component: TexasFoodTrucksPage,
});

function TexasFoodTrucksPage() {
  const pageData = Route.useLoaderData();

  return <main>
    <section className="border-b border-border bg-muted/30 py-14 md:py-20">
      <Container>
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.13em] text-muted-foreground">
          <a href="/">Front page</a><span className="mx-2">/</span><a href="/texas-food-history">Texas food</a><span className="mx-2">/</span><span aria-current="page">Food trucks</span>
        </nav>
        <p className="eyebrow mt-8 text-primary">Mobile kitchens worth tracking down</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-none md:text-7xl">Texas Food Trucks Worth Finding</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{pageData.description}</p>
        <dl className="mt-9 grid max-w-4xl gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          <Stat label="Launch collection" value={String(pageData.total)} />
          <Stat label="Texas markets" value={String(pageData.markets.length)} />
          <Stat label="Source review" value={formatDate(pageData.sourceCheckedAt)} />
        </dl>
      </Container>
    </section>

    <section className="py-12 md:py-16">
      <Container>
        <div className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">How we built it</p>
            <h2 className="mt-2 font-display text-3xl">Curated discovery, not a scraped directory</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Guardrail title="Start broad, then edit">Current city food-truck category lists were used as a discovery baseline. Obvious food halls, truck parks, fixed restaurants and unrelated businesses were removed before publication.</Guardrail>
            <Guardrail title="Add editorial signals">Three launch selections were added from current independent editorial coverage so the collection is not simply the first 300 directory rows.</Guardrail>
            <Guardrail title="Do not fake freshness">A listing here does not mean a truck is open now or parked at a fixed address. Confirm the current schedule directly with the operator before traveling.</Guardrail>
          </div>
        </div>

        <section className="py-12" aria-labelledby="market-heading">
          <p className="eyebrow text-primary">Browse by market</p>
          <h2 id="market-heading" className="mt-2 max-w-4xl font-display text-4xl sm:text-5xl">Ten Texas food-truck scenes, one statewide starting point</h2>
          <div className="mt-9 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {pageData.markets.map((market) => <a key={market.slug} href={market.path} className="group bg-background p-7 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="eyebrow text-primary">{market.region}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{market.count} picks</span>
              </div>
              <h3 className="mt-3 font-display text-3xl leading-tight group-hover:text-primary">{market.city}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{market.description}</p>
              <p className="mt-5 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Sample:</strong> {formatList(market.sampleNames)}</p>
              <span className="mt-6 block text-sm font-semibold text-primary">Browse {market.city} food trucks →</span>
            </a>)}
          </div>
        </section>
      </Container>
    </section>

    <section className="border-y border-border bg-muted/30 py-12 md:py-16">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="eyebrow text-primary">Editorial guardrails</p>
          <h2 className="mt-2 font-display text-4xl">Useful now without creating 300 thin pages</h2>
          <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">The statewide guide and market collections carry the launch inventory. Individual food-truck pages are intentionally withheld until a truck has enough current, sourceable detail—such as an official website, stable operating pattern, signature dishes, history or independent recognition—to justify a page that helps readers beyond repeating a name and city.</p>
          <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">That keeps this category aligned with TexasDefined’s broader crawl-quality strategy: fewer stronger pages, clear source dates and no promises about live hours that the site cannot reliably maintain.</p>
        </div>
        <aside className="border border-border bg-background p-6">
          <p className="eyebrow text-primary">Keep exploring the Texas table</p>
          <div className="mt-4 grid gap-4 text-sm font-semibold">
            <a href="/texas-food-history">Texas Food History →</a>
            <a href="/texas-food-trail">The Texas Food Trail →</a>
            <a href="/things-unique-to-texas/food-drink">Iconic Texas Foods & Drinks →</a>
            <a href="/events/food-festivals">Texas Food Festivals & Drink Events →</a>
          </div>
        </aside>
      </Container>
    </section>

    <section className="py-12 md:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Quick answers</p><h2 className="mt-2 font-display text-3xl">What to know before you chase a truck</h2></div>
          <div className="grid gap-x-8 md:grid-cols-2">
            {pageData.quickAnswers.map((item) => <article key={item.question} className="border-t border-border py-5">
              <h3 className="font-display text-2xl leading-tight">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p>
            </article>)}
          </div>
        </div>
      </Container>
    </section>
  </main>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="bg-background p-5"><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</dt><dd className="mt-2 font-display text-3xl">{value}</dd></div>;
}

function Guardrail({ title, children }: { title: string; children: string }) {
  return <article className="border-t border-border pt-4"><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{children}</p></article>;
}

function formatList(items: string[]) {
  if (!items.length) return "the current collection";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

function formatDate(value: string) {
  return new Date(`${value}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}
