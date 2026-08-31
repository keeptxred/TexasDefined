import { Link, createLazyFileRoute } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import { TEXAS_ESSENTIAL_FACT_CATEGORIES } from '@/data/texas-essential-facts';
import { PROVENANCED_TEXAS_ESSENTIAL_FACTS } from '@/data/texas-essential-facts-provenance';

import { description } from './texas-facts';

export const Route = createLazyFileRoute('/texas-facts')({ component: TexasFactsPage });

function TexasFactsPage() {
  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-16 sm:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><span className="text-foreground">Texas Facts</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Texas reference desk</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">100 Essential Facts About Texas</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A practical reference to the history, geography, culture, industry and civic structure that explain why Texas feels different. Every fact links to the authoritative or institutional source used to support it; current-law and current-ranking claims remain subject to the controlling official source.</p>
          <div className="mt-10 flex flex-wrap gap-3 text-sm font-semibold">
            {TEXAS_ESSENTIAL_FACT_CATEGORIES.map((category) => <a key={category.slug} href={`#${category.slug}`} className="border border-border bg-background px-4 py-2 hover:border-primary/50 hover:text-primary">{category.label}</a>)}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-4xl">
            {TEXAS_ESSENTIAL_FACT_CATEGORIES.map((category) => {
              const facts = PROVENANCED_TEXAS_ESSENTIAL_FACTS.filter((item) => item.category === category.slug);
              return <section key={category.slug} id={category.slug} className="scroll-mt-24 border-b border-border py-12 first:pt-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{facts.length} facts</p>
                <h2 className="mt-2 font-display text-4xl sm:text-5xl">{category.label}</h2>
                <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{category.description}</p>
                <ol className="mt-8 divide-y divide-border border-y border-border">
                  {facts.map((item) => <li key={item.id} className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr]">
                    <span className="font-display text-2xl text-muted-foreground">{String(item.id).padStart(3, '0')}</span>
                    <div>
                      <h3 className="font-display text-2xl">{item.title}</h3>
                      <p className="mt-2 leading-7 text-muted-foreground">{item.fact}</p>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                        {item.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">Source: {source.name} ↗</a>)}
                        {item.href ? <a href={item.href} className="font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">Read the Texas Defined guide →</a> : null}
                      </div>
                    </div>
                  </li>)}
                </ol>
              </section>;
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-muted/25 py-14">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <Related href="/things-unique-to-texas" title="250 Things That Define Texas" text="Move from reference facts into food, places, traditions, oddities and culture." />
            <Related href="/made-in-texas" title="Made, Built & Born in Texas" text="See Texas products and companies by city and county, with careful manufacturing labels." />
            <Related href="/texas-symbols" title="Official Texas Symbols" text="Separate official state designations from familiar but unofficial Texas icons." />
          </div>
        </Container>
      </section>
    </main>
  );
}

function Related({ href, title, text }: { href: string; title: string; text: string }) {
  return <a href={href} className="group border border-border bg-background p-6 hover:border-primary/50"><strong className="font-display text-2xl group-hover:text-primary">{title}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{text}</span><span className="mt-5 block text-sm font-semibold">Explore →</span></a>;
}
