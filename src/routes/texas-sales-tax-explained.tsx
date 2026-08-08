import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description = 'A plain-English guide to Texas sales tax, local rates, exemptions, online purchases, permits and the questions to ask before a transaction.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const canonicalPath = '/texas-sales-tax-explained';
const pageUrl = `${siteUrl}${canonicalPath}`;
const checklist = [
  'Identify the exact product or service.',
  'Check whether Texas treats it as taxable.',
  'Confirm any exemption and the certificate it requires.',
  'Determine the correct transaction location.',
  'Use the official rate lookup and current guidance.',
  'Keep the invoice and supporting records.',
] as const;
const checklistNames = [
  'Name what is being sold',
  'Check whether it is taxable',
  'Confirm any exemption',
  'Identify the transaction location',
  'Look up the current rate',
  'Keep the supporting records',
] as const;

export const Route = createFileRoute('/texas-sales-tax-explained')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'How Texas Sales Tax Works', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo', '@id': `${pageUrl}#howto`, url: pageUrl,
          name: 'How to check Texas sales tax for a transaction', description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          step: checklist.map((text, index) => ({ '@type': 'HowToStep', position: index + 1, name: checklistNames[index], text, url: `${pageUrl}#sales-tax-step-${index + 1}` })),
        },
        {
          '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Texas Life', item: `${siteUrl}/texas-living` },
            { '@type': 'ListItem', position: 3, name: 'How Texas Sales Tax Works', item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: Page,
});

function Page() {
  return (
    <main>
      <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
        <article className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/texas-living">Texas Life</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">Sales tax</span>
          </nav>

          <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div><p className="eyebrow text-primary">Good to know</p><h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">How Texas sales tax works</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p></div>
            <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">The statewide rate is only part of the picture. City, county, transit and special-district taxes can change the final amount.</p>
          </header>

          <div className="divide-y divide-border">
            <Section eyebrow="Local rates" title="Why the rate changes from place to place">A purchase can include the statewide rate plus city, county, transit or special-district taxes. The final number depends on what you bought, where the sale happened, where it was delivered and how Texas sourcing rules apply.</Section>
            <Section eyebrow="Taxability" title="What is usually taxed — and what may not be">Most sales of physical goods are taxable unless an exemption applies. Some services are taxed, while many basic groceries and certain medical, agricultural, manufacturing, resale or nonprofit purchases may be treated differently. The paperwork has to match the exemption.</Section>
            <Section eyebrow="Online purchases" title="Orders can still create a Texas tax obligation">Marketplace providers and remote sellers may collect Texas tax at checkout. When they do not, a taxable purchase may still create a Texas use-tax obligation.</Section>
            <Section eyebrow="For sellers" title="Permits, collection and records matter">Anyone selling taxable goods or services should check whether a Texas sales-tax permit, collection, filing and recordkeeping are required. Resale certificates are for qualifying purchases that will be resold — not ordinary business expenses.</Section>
          </div>

          <section className="grid gap-8 border-y border-border py-10 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">Before you rely on a rate</p><h2 className="mt-2 font-display text-3xl">Six checks worth making</h2></div>
            <ol className="divide-y divide-border border-y border-border">{checklist.map((item, index) => <li id={`sales-tax-step-${index + 1}`} key={item} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]"><span className="font-display text-3xl text-primary">{String(index + 1).padStart(2, '0')}</span><div><h3 className="font-display text-xl">{checklistNames[index]}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{item}</p></div></li>)}</ol>
          </section>

          <section className="grid gap-8 border-b border-border py-8 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">Official source</p><h2 className="mt-2 font-display text-3xl">Check the current rule</h2></div>
            <div><a className="font-semibold underline decoration-primary/50 underline-offset-4" href="https://comptroller.texas.gov/taxes/sales/" target="_blank" rel="noreferrer noopener">Texas Comptroller sales-tax guidance ↗</a><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Tax rules and agency guidance can change. Confirm a specific filing, rate or exemption with the Texas Comptroller or a qualified tax professional.</p></div>
          </section>
        </article>
      </Container>
    </main>
  );
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: string }) {
  return <section className="grid gap-8 py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">{eyebrow}</p><h2 className="mt-2 font-display text-3xl leading-tight">{title}</h2></div><p className="max-w-3xl text-base leading-7 text-muted-foreground">{children}</p></section>;
}
