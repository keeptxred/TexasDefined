import { Link, createLazyFileRoute } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import { TEXAS_ESSENTIAL_FACT_CATEGORIES } from '@/data/texas-essential-facts';

export const Route = createLazyFileRoute('/texas-facts')({ component: TexasFactsPage });

function TexasFactsPage() {
  const { facts: provenancedFacts } = Route.useLoaderData();

  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-16 sm:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><span className="text-foreground">Texas Facts</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Texas facts & figures</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">100 Essential Facts About Texas</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A practical reference to the history, geography, culture, industry and civic structure that explain why Texas feels different. Every fact links to the authoritative or institutional source used to support it; current-law and current-ranking claims remain subject to the controlling official source.</p>
          <div className="mt-10 flex flex-wrap gap-3 text-sm font-semibold">
            {TEXAS_ESSENTIAL_FACT_CATEGORIES.map((category) => <a key={category.slug} href={`#${category.slug}`} className="border border-border bg-background px-4 py-2 hover:border-primary/50 hover:text-primary">{category.label}</a>)}
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-12 sm:py-16" aria-labelledby="texas-facts-comparison">
        <Container>
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Compare the evidence</p>
            <h2 id="texas-facts-comparison" className="mt-3 font-display text-4xl sm:text-5xl">What the numbers and dates mean</h2>
            <p className="mt-4 leading-8 text-muted-foreground">Texas facts are easy to repeat and surprisingly easy to misstate. Land area is not total area, a legislative designation is not a timeless cultural tradition, and a historical founding date tells a different story from a company's modern ownership. The comparisons below use clearly named sources and measurement definitions.</p>
          </div>
          <div className="mt-8 overflow-x-auto border border-border">
            <table className="min-w-[40rem] w-full text-left text-sm">
              <caption className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Selected Texas comparisons, source definitions and review dates</caption>
              <thead className="border-b border-border bg-muted/40"><tr><th scope="col" className="px-4 py-3">Question</th><th scope="col" className="px-4 py-3">Evidence and interpretation</th><th scope="col" className="px-4 py-3">Check the source</th></tr></thead>
              <tbody className="divide-y divide-border">
                <tr><th scope="row" className="px-4 py-4 font-semibold">Is Texas the largest U.S. state?</th><td className="px-4 py-4 leading-7 text-muted-foreground">No. The 2020 Census land-area comparison reports approximately 261,268 square miles for Texas and 571,022 for Alaska. Texas ranks first among the contiguous 48 states. These are land areas, not total land and water.</td><td className="px-4 py-4"><a href="https://www2.census.gov/programs-surveys/sis/activities/math/mm-10_student.pdf" target="_blank" rel="noopener noreferrer" className="text-primary underline">U.S. Census Bureau</a></td></tr>
                <tr><th scope="row" className="px-4 py-4 font-semibold">When did Texas become independent and then a state?</th><td className="px-4 py-4 leading-7 text-muted-foreground">The Texas declaration of independence was adopted March 2, 1836. Texas joined the United States on December 29, 1845. The nearly ten-year Republic period is the crucial interval, not an implication of uninterrupted independence since Spanish rule.</td><td className="px-4 py-4"><a href="https://www.tshaonline.org/handbook/entries/texas-declaration-of-independence" target="_blank" rel="noopener noreferrer" className="text-primary underline">Handbook of Texas</a></td></tr>
                <tr><th scope="row" className="px-4 py-4 font-semibold">Are Texas's local 'capitals' state symbols?</th><td className="px-4 py-4 leading-7 text-muted-foreground">No. The State Library separately compiles symbols and local place designations. Modern place titles ordinarily expire after ten years, but resolutions approved before September 1, 2001 are excepted.</td><td className="px-4 py-4"><Link to="/texas-capital-designations" className="text-primary underline">Compare official capital titles</Link></td></tr>
                <tr><th scope="row" className="px-4 py-4 font-semibold">Was every well-known Texas product invented here?</th><td className="px-4 py-4 leading-7 text-muted-foreground">No. Dr Pepper has documented Waco origins; Topo Chico comes from Monterrey, Mexico, despite its longstanding popularity in Texas. Birthplace, manufacturing location and regional adoption are distinct facts.</td><td className="px-4 py-4"><Link to="/things-unique-to-texas/food-drink" className="text-primary underline">Texas food and drink histories</Link></td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground">Figures can change when agencies revise datasets, particularly population, business, agriculture and economic measures. The table labels the Census vintage for land measurements; source links following each of the 100 individual facts take precedence for more current figures. This is an editorial selection and not a replacement for the responsible agency's current records.</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to="/everything-bigger-in-texas" className="text-primary underline">See the detailed Texas superlatives fact-check →</Link><Link to="/texas-symbols" className="text-primary underline">Official state symbols →</Link></div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-4xl">
            {TEXAS_ESSENTIAL_FACT_CATEGORIES.map((category) => {
              const facts = provenancedFacts.filter((item) => item.category === category.slug);
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
            <Related href="/things-unique-to-texas" title="Things That Define Texas" text="Move from reference facts into food, places, traditions, oddities and culture." />
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
