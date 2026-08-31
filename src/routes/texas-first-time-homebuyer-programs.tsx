import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description = 'Find official Texas first-time homebuyer program sources, understand down-payment assistance structures, plan cash to close, compare lender estimates and keep eligibility verification separate from the budget.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const canonicalPath = '/texas-first-time-homebuyer-programs';
const pageUrl = `${siteUrl}${canonicalPath}`;
const checklist = [
  'Review your credit reports and settle on a monthly budget you can live with.',
  'Take an accepted homebuyer class early when the program requires or rewards it.',
  'Check the current income, purchase-price, property and location limits.',
  'Use an approved lender when a program requires one.',
  'Ask for side-by-side written estimates with and without assistance.',
  'Keep some cash in reserve after closing.',
] as const;
const checklistNames = [
  'Set a comfortable monthly budget',
  'Check education requirements',
  'Check the current program limits',
  'Find an approved lender',
  'Compare written loan estimates',
  'Keep cash in reserve',
] as const;

export const Route = createFileRoute('/texas-first-time-homebuyer-programs')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas First-Time Homebuyer Programs & Down-Payment Help', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo', '@id': `${pageUrl}#howto`, url: pageUrl,
          name: 'How to evaluate Texas first-time homebuyer programs', description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          step: checklist.map((text, index) => ({ '@type': 'HowToStep', position: index + 1, name: checklistNames[index], text, url: `${pageUrl}#homebuyer-step-${index + 1}` })),
        },
        {
          '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Buying a Home in Texas', item: `${siteUrl}/buying-a-home-in-texas` },
            { '@type': 'ListItem', position: 3, name: 'First-Time Homebuyer Programs', item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: Page,
});

function Page() {
  return (
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/buying-a-home-in-texas">Buying a home</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">First-time programs</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div><p className="eyebrow text-primary">Texas homebuyer programs</p><h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas first-time homebuyer programs & down-payment help</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p></div>
          <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">Program funding, limits, approved lenders and repayment terms can change. Treat the official program and lender documents as the source of truth.</p>
        </header>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Start with the whole purchase</p><h2 className="mt-2 font-display text-3xl">Assistance is one part of the homebuyer plan</h2></div>
          <div><p className="max-w-3xl text-base leading-7 text-muted-foreground">Before counting assistance, build the recurring housing budget and total cash-to-close plan. Then compare the purchase with and without assistance so you can see what the program changes—and what it does not.</p><Link to="/buying-a-home-in-texas" className="mt-5 inline-block font-semibold text-primary underline decoration-primary/40 underline-offset-4">Open the complete Texas homebuyer journey →</Link></div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Run the numbers</p><h2 className="mt-2 font-display text-3xl">Find your comfortable number</h2></div>
          <div className="grid sm:grid-cols-3">
            <Link className="group border-t border-border py-5 sm:px-5" to="/texas-home-affordability-calculator"><span className="font-display text-xl group-hover:text-primary">Home affordability</span><span className="mt-2 block text-sm text-muted-foreground">Estimate a price range that fits your household.</span></Link>
            <Link className="group border-t border-border py-5 sm:px-5" to="/texas-down-payment-assistance-calculator"><span className="font-display text-xl group-hover:text-primary">Down-payment assistance</span><span className="mt-2 block text-sm text-muted-foreground">Model possible help and the cash gap that remains.</span></Link>
            <Link className="group border-t border-border py-5 sm:px-5" to="/texas-closing-cost-calculator"><span className="font-display text-xl group-hover:text-primary">Closing costs</span><span className="mt-2 block text-sm text-muted-foreground">Plan for the transaction costs around closing day.</span></Link>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Assistance structures</p><h2 className="mt-2 font-display text-3xl">Help can take different forms</h2></div>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">Programs can use grants, forgivable or deferred loans, second-lien structures, mortgage-credit certificates or other forms of help. Compare the mortgage terms, repayment rules, cash needed at closing and what happens if you sell, refinance or stop occupying the home as required.</p>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Before you buy</p><h2 className="mt-2 font-display text-3xl">Six checks worth making</h2></div>
          <ol className="divide-y divide-border border-y border-border">{checklist.map((item, index) => <li id={`homebuyer-step-${index + 1}`} key={item} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]"><span className="font-display text-3xl text-primary">{String(index + 1).padStart(2, '0')}</span><div><h3 className="font-display text-xl">{checklistNames[index]}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{item}</p></div></li>)}</ol>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Official sources</p><h2 className="mt-2 font-display text-3xl">Where to verify current programs</h2></div>
          <div className="divide-y divide-border border-y border-border text-sm font-semibold">
            <a className="block py-4 underline decoration-primary/50 underline-offset-4" href="https://welcomehome.tdhca.texas.gov/" target="_blank" rel="noreferrer noopener">Texas Department of Housing and Community Affairs homebuyer programs ↗</a>
            <a className="block py-4 underline decoration-primary/50 underline-offset-4" href="https://www.tdhca.texas.gov/help-for-texans" target="_blank" rel="noreferrer noopener">TDHCA Help for Texans ↗</a>
            <a className="block py-4 underline decoration-primary/50 underline-offset-4" href="https://www.hud.gov/states/texas" target="_blank" rel="noreferrer noopener">HUD guidance for Texas buyers ↗</a>
            <a className="block py-4 underline decoration-primary/50 underline-offset-4" href="https://www.consumerfinance.gov/owning-a-home/" target="_blank" rel="noreferrer noopener">CFPB Owning a Home tools ↗</a>
          </div>
        </section>

        <aside className="py-6 text-sm leading-6 text-muted-foreground">This page organizes official starting points and planning tools. It does not determine program eligibility, promise funding, quote a mortgage or replace lender or agency documents.</aside>
      </article>
    </Container>
  );
}
