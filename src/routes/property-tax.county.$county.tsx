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
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${county.name} Property Tax Guide`,
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            '@id': `${pageUrl}#article`,
            headline: `${county.name} Property Tax Guide`,
            description,
            url: pageUrl,
            dateModified: '2026-08-06',
            isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
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

function CountyPropertyTaxPage() {
  const { county } = Route.useLoaderData();
  return (
    <Container className="py-16 sm:py-24">
      <p className="eyebrow text-primary">County property-tax guide</p>
      <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight sm:text-6xl">{county.name} property taxes</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
        Start with the property account, then verify exemptions, appraisal deadlines, every taxing unit and the office collecting the bill. Rates and procedures can change, so use this page as a checklist and confirm account-specific details with the official local offices.
      </p>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        <article className="rounded-md border border-border p-6">
          <h2 className="font-display text-2xl">1. Find the appraisal record</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Check ownership, mailing address, property characteristics, market value, appraised value, taxable values, exemptions and every taxing unit attached to the account.</p>
          <Link to="/learn/appraisal-districts" className="mt-4 inline-block font-medium text-primary underline">How appraisal districts work</Link>
        </article>
        <article className="rounded-md border border-border p-6">
          <h2 className="font-display text-2xl">2. Verify exemptions</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Confirm residence homestead, age-65, disability, disabled-veteran or special-appraisal treatment where applicable. Local optional exemptions can differ by taxing unit.</p>
          <Link to="/do/homestead-exemption" className="mt-4 inline-block font-medium text-primary underline">Review homestead eligibility</Link>
        </article>
        <article className="rounded-md border border-border p-6">
          <h2 className="font-display text-2xl">3. Review the appraisal notice</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Compare the proposed value with sales, condition, repairs and similar properties. Use the deadline printed on the notice rather than waiting for the fall tax bill.</p>
          <Link to="/do/property-tax-protest" className="mt-4 inline-block font-medium text-primary underline">Prepare a property-tax protest</Link>
        </article>
        <article className="rounded-md border border-border p-6">
          <h2 className="font-display text-2xl">4. Calculate the likely bill</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Add the rates for the county, school district, city and all special districts serving the exact parcel. County averages are not a substitute for account-level jurisdictions.</p>
          <Link to="/decide/property-taxes" className="mt-4 inline-block font-medium text-primary underline">Estimate property taxes</Link>
        </article>
      </section>

      <section className="mt-10 rounded-md border border-border p-6">
        <p className="eyebrow text-primary">Official local starting point</p>
        <h2 className="mt-2 font-display text-2xl">Open the official county directory</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">Use the Texas county directory to reach the county website, then locate the appraisal district and tax assessor-collector serving the property.</p>
        <a href={county.officialDirectoryUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block font-medium text-primary underline">Open official Texas county websites</a>
      </section>

      <section className="mt-10 rounded-md bg-muted p-6">
        <h2 className="font-display text-2xl">County checklist</h2>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted-foreground">
          <li>Save the current appraisal record and value history.</li>
          <li>List every taxing unit shown on the account.</li>
          <li>Confirm exemptions separately for each taxing unit.</li>
          <li>Review the appraisal notice immediately after delivery.</li>
          <li>Verify the collecting office and payment deadline on the actual bill.</li>
          <li>Keep proof of filings, protests, payments and correspondence.</li>
        </ul>
      </section>
    </Container>
  );
}
