import { Link, createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { evidenceForMadeInTexasEntry } from '@/data/made-in-texas-evidence';
import {
  MADE_IN_TEXAS_ENTRIES,
  MADE_IN_TEXAS_RELATIONSHIP_LABELS,
  type TexasBusinessCategory,
} from '@/data/made-in-texas';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'Explore Texas-made and Texas-processed products, homegrown brands, headquarters and major operations by category, city and county.';

const categoryOrder: Array<{ slug: TexasBusinessCategory; label: string; description: string }> = [
  { slug: 'food-drink', label: 'Food & drink', description: 'Ice cream, barbecue, sauces, spirits, beer, bakeries and Texas food brands.' },
  { slug: 'western-wear', label: 'Western wear', description: 'Boots, hats, leather goods and apparel tied to Texas craft traditions.' },
  { slug: 'home-outdoors', label: 'Home & outdoors', description: 'Coolers, smokers, hunting gear, fishing gear, candles and outdoor products.' },
  { slug: 'technology-manufacturing', label: 'Technology & manufacturing', description: 'Semiconductors, engineering, medical technology and industrial production.' },
  { slug: 'aerospace-transportation', label: 'Aerospace & transportation', description: 'Aircraft, rockets, trucks, vehicles, airlines and trailer manufacturing.' },
  { slug: 'energy-industrial', label: 'Energy & industrial', description: 'Oilfield equipment, pipelines, industrial technology and Texas energy companies.' },
  { slug: 'retail-lifestyle', label: 'Retail & lifestyle', description: 'Homegrown Texas retailers, jewelry brands, travel centers and service companies.' },
];

export const Route = createFileRoute('/made-in-texas')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      title: 'Made in Texas — Products, Brands & Companies by City and County',
      description,
      canonicalPath: '/made-in-texas',
    }),
    links: [canonicalLink(texasDefinedBrand, '/made-in-texas')],
  }),
  component: MadeInTexasPage,
});

function MadeInTexasPage() {
  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-16 sm:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><span className="text-foreground">Made in Texas</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Texas industry & homegrown brands</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">Made, Built & Born in Texas</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Texas products and companies are part of the story of their hometowns. This guide separates things actually made or processed in Texas from brands that were founded here, are headquartered here or maintain major Texas operations.</p>
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
            <Stat value={String(MADE_IN_TEXAS_ENTRIES.length)} label="Entries" />
            <Stat value={String(new Set(MADE_IN_TEXAS_ENTRIES.map((item) => item.countySlug)).size)} label="Counties represented" />
            <Stat value={String(categoryOrder.length)} label="Categories" />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div>
              {categoryOrder.map((category) => {
                const entries = MADE_IN_TEXAS_ENTRIES.filter((item) => item.category === category.slug);
                if (!entries.length) return null;
                return <section key={category.slug} id={category.slug} className="border-b border-border py-10 first:pt-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{category.label}</p>
                  <h2 className="mt-2 font-display text-4xl">{category.label}</h2>
                  <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{category.description}</p>
                  <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
                    {entries.map((entry) => {
                      const evidence = evidenceForMadeInTexasEntry(entry.name);
                      const relationshipLabel = entry.relationship === 'made-or-processed' && !evidence
                        ? 'Texas production claim · source review queued'
                        : MADE_IN_TEXAS_RELATIONSHIP_LABELS[entry.relationship];
                      return <article key={`${entry.name}-${entry.city}`} className="bg-background p-5">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary">{relationshipLabel}</p>
                        <h3 className="mt-2 font-display text-2xl leading-tight">{entry.name}</h3>
                        <p className="mt-1 text-sm font-semibold">{entry.city}</p>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">{entry.note}</p>
                        {evidence ? <div className="mt-4 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
                          <p>{evidence.claim}</p>
                          <a href={evidence.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block font-semibold text-foreground underline decoration-primary/40 underline-offset-4 hover:text-primary">Manufacturer source: {evidence.sourceLabel} ↗</a>
                        </div> : null}
                        <a href={`/county/${entry.countySlug}`} className="mt-4 inline-block text-sm font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">Explore the county →</a>
                      </article>;
                    })}
                  </div>
                </section>;
              })}
            </div>
            <aside>
              <div className="sticky top-24 border border-border bg-card p-6">
                <h2 className="font-display text-2xl">What the labels mean</h2>
                <dl className="mt-5 divide-y divide-border border-y border-border text-sm">
                  <Definition term="Made or processed here" text="The entry is tied to Texas production, assembly, brewing, distilling, food processing or another local making process." />
                  <Definition term="Founded here" text="The brand or company began in the named Texas community; that does not mean every present-day product is manufactured there." />
                  <Definition term="Headquartered here" text="The company has its headquarters in the community; headquarters are not treated as proof of product manufacturing." />
                  <Definition term="Major Texas operations" text="The company maintains a significant facility or operating presence in the community." />
                </dl>
                <p className="mt-5 text-xs leading-5 text-muted-foreground">Entries with a manufacturer citation have been checked against a first-party production source. The broader directory remains deliberately labeled by relationship so a Texas origin or headquarters is never presented as proof that every product is made here.</p>
                <div className="mt-6 space-y-3 text-sm font-semibold">
                  <a href="/texas-facts" className="block underline decoration-primary/40 underline-offset-4 hover:text-primary">100 essential Texas facts →</a>
                  <a href="/things-unique-to-texas" className="block underline decoration-primary/40 underline-offset-4 hover:text-primary">250 things that define Texas →</a>
                  <a href="/texas-history" className="block underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas history →</a>
                  <a href="/browse/counties" className="block underline decoration-primary/40 underline-offset-4 hover:text-primary">Browse all counties →</a>
                </div>
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

function Definition({ term, text }: { term: string; text: string }) {
  return <div className="py-4"><dt className="font-semibold">{term}</dt><dd className="mt-1 leading-6 text-muted-foreground">{text}</dd></div>;
}
