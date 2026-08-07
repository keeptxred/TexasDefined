import { createFileRoute, Link, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { TEXAS_COUNTIES } from '@/data/texas-places';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export const Route = createFileRoute('/property-tax/county/$county')({
  loader: ({ params }) => {
    const county = TEXAS_COUNTIES.find((item) => item.slug === params.county);
    if (!county) throw notFound();
    return { county };
  },
  head: ({ loaderData }) => {
    const county = loaderData?.county;
    if (!county) return {};
    const canonicalPath = `/property-tax/county/${county.slug}`;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const description = `${county.name} property-tax guide covering appraisal records, exemptions, protests, tax offices, deadlines and official county resources.`;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: `${county.name} Property Tax Guide`, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'Article', '@id': `${pageUrl}#article`, headline: `${county.name} Property Tax Guide`, description, url: pageUrl, dateModified: '2026-08-06', isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` } },
          {
            '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Texas counties', item: absoluteUrl(texasDefinedBrand, '/browse/counties') },
              { '@type': 'ListItem', position: 3, name: county.name, item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: CountyPropertyTaxPage,
});

const steps = [
  {
    title: 'Find the appraisal record',
    copy: 'Check ownership, mailing address, property characteristics, market value, appraised value, taxable values, exemptions and every taxing unit attached to the account.',
    to: '/learn/appraisal-districts',
    label: 'How appraisal districts work',
  },
  {
    title: 'Verify exemptions',
    copy: 'Confirm residence homestead, age-65, disability, disabled-veteran or special-appraisal treatment where applicable. Local optional exemptions can differ by taxing unit.',
    to: '/do/homestead-exemption',
    label: 'Review homestead eligibility',
  },
  {
    title: 'Review the appraisal notice',
    copy: 'Compare the proposed value with sales, condition, repairs and similar properties. Use the deadline printed on the notice rather than waiting for the fall tax bill.',
    to: '/do/property-tax-protest',
    label: 'Prepare a property-tax protest',
  },
  {
    title: 'Calculate the likely bill',
    copy: 'Add the rates for the county, school district, city and all special districts serving the exact parcel. County averages are not a substitute for account-level jurisdictions.',
    to: '/decide/property-taxes',
    label: 'Estimate property taxes',
  },
] as const;

function CountyPropertyTaxPage() {
  const { county } = Route.useLoaderData();
  return (
    <main>
      <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
        <article className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/browse/counties">County directory</Link><span aria-hidden="true" className="mx-2">/</span><span className="text-foreground">{county.name}</span>
          </nav>

          <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div>
              <p className="eyebrow text-primary">County property-tax guide</p>
              <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{county.name} property taxes</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">Start with the property account, then verify exemptions, appraisal deadlines, every taxing unit and the office collecting the bill.</p>
            </div>
            <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">Rates and procedures can change. Use this as a working checklist and confirm account-specific details with the official local offices.</p>
          </header>

          <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">The county checklist</p><h2 className="mt-2 font-display text-3xl">Four places to start</h2></div>
            <ol className="divide-y divide-border border-y border-border">
              {steps.map((step, index) => (
                <li key={step.title} className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr_auto] sm:items-start">
                  <span className="font-display text-3xl text-primary">{String(index + 1).padStart(2, '0')}</span>
                  <div><h3 className="font-display text-2xl">{step.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{step.copy}</p></div>
                  <Link to={step.to} className="text-sm font-semibold underline decoration-primary/50 underline-offset-4">{step.label} →</Link>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">Official local starting point</p><h2 className="mt-2 font-display text-3xl">Open the county directory</h2></div>
            <div><p className="max-w-3xl text-sm leading-6 text-muted-foreground">Use the Texas county directory to reach the county website, then locate the appraisal district and tax assessor-collector serving the property.</p><a href={county.officialDirectoryUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold underline decoration-primary/50 underline-offset-4">Open official Texas county websites ↗</a></div>
          </section>

          <section className="grid gap-8 py-10 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">Keep on file</p><h2 className="mt-2 font-display text-3xl">What to save each year</h2></div>
            <ul className="grid sm:grid-cols-2">
              {[
                'Save the current appraisal record and value history.',
                'List every taxing unit shown on the account.',
                'Confirm exemptions separately for each taxing unit.',
                'Review the appraisal notice immediately after delivery.',
                'Verify the collecting office and payment deadline on the actual bill.',
                'Keep proof of filings, protests, payments and correspondence.',
              ].map((item) => <li key={item} className="border-t border-border py-4 text-sm leading-6 text-muted-foreground sm:px-5">{item}</li>)}
            </ul>
          </section>
        </article>
      </Container>
    </main>
  );
}
