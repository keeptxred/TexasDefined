import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { PropertyTaxGuidePage } from '@/components/guides/PropertyTaxGuidePage';
import { Container } from '@/components/layout/Container';
import { isCountyPropertyIndexReady } from '@/data/property/county-property-schema';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description =
  'Find the appraisal-district starting point for any of Texas’s 254 counties, check the property record, understand notices and act quickly when something does not look right.';
const canonicalPath = '/learn/appraisal-districts';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const officialDirectoryUrl = 'https://comptroller.texas.gov/taxes/property-tax/county-directory/';
const steps = [
  'Open your county appraisal district’s official website.',
  'Find the property account and check every detail.',
  'Save the latest appraisal notice and value history.',
  'Contact the district promptly if something is wrong.',
];
const priorityCountySlugs = ['leon', 'terrell', 'lubbock', 'hidalgo', 'sabine'];
const migrationPriorityCountySlugs = ['polk', 'mason'];

export const Route = createFileRoute('/learn/appraisal-districts')({
  loader: async () => {
    const [{ COUNTY_PROPERTY_RECORDS }, { TEXAS_COUNTIES }] = await Promise.all([
      import('@/data/property/county-property-data'),
      import('@/data/texas-places'),
    ]);
    const verifiedPropertyCounties = COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady);
    const verifiedPropertySlugs = new Set(verifiedPropertyCounties.map((county) => county.slug));
    const priorityCounties = priorityCountySlugs
      .map((slug) => TEXAS_COUNTIES.find((county) => county.slug === slug))
      .filter((county) => county !== undefined && verifiedPropertySlugs.has(county.slug));
    const migrationPriorityCounties = migrationPriorityCountySlugs
      .map((slug) => TEXAS_COUNTIES.find((county) => county.slug === slug))
      .filter((county) => county !== undefined && verifiedPropertySlugs.has(county.slug));

    return { verifiedPropertyCounties, verifiedPropertySlugList: [...verifiedPropertySlugs], priorityCounties, migrationPriorityCounties, TEXAS_COUNTIES };
  },
  head: ({ loaderData }) => {
    const { verifiedPropertyCounties } = loaderData;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Appraisal District Directory & Property Record Guide', description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'HowTo',
            '@id': `${pageUrl}#howto`,
            url: pageUrl,
            name: 'How to check a Texas appraisal district property record',
            description,
            isPartOf: { '@id': `${siteUrl}/#website` },
            step: steps.map((text, index) => ({
              '@type': 'HowToStep', position: index + 1, name: text, text, url: `${pageUrl}#appraisal-step-${index + 1}`,
            })),
          },
          {
            '@type': 'ItemList',
            '@id': `${pageUrl}#county-directory`,
            name: 'Verified Texas county appraisal-district guides',
            numberOfItems: verifiedPropertyCounties.length,
            itemListElement: verifiedPropertyCounties.map((county, index) => ({
              '@type': 'ListItem', position: index + 1, name: `${county.name} appraisal district guide`, url: `${siteUrl}/property-tax/county/${county.slug}`,
            })),
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumbs`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Property Taxes', item: `${siteUrl}/decide/property-taxes` },
              { '@type': 'ListItem', position: 3, name: 'Appraisal District Directory', item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: AppraisalDistrictPage,
});

function AppraisalDistrictPage() {
  const { verifiedPropertySlugList, priorityCounties, migrationPriorityCounties, TEXAS_COUNTIES } = Route.useLoaderData();
  const verifiedPropertySlugs = new Set(verifiedPropertySlugList);

  return <>
    <PropertyTaxGuidePage
      eyebrow="Know your local office"
      title="Find your appraisal district"
      intro={description}
      officialUrl={officialDirectoryUrl}
      officialLabel="Texas Comptroller county appraisal-district directory"
      canonicalPath={canonicalPath}
      stepPrefix="appraisal-step-"
      sections={[
        { title: 'What this office actually does', paragraphs: ['Your county appraisal district identifies taxable property, keeps ownership and property details, sets appraised values, handles exemptions and supports the protest process. It does not set local tax rates or collect every tax bill.'] },
        { title: 'Give the property account a careful look', paragraphs: ['Check the owner name, mailing address, legal description, property details, exemptions, taxing units and value history. Even a small factual error can affect the value or the notices you receive.'], steps },
        { title: 'Do not set the notice aside', paragraphs: ["Read an appraisal notice as soon as it arrives. Protest deadlines are tied to the notice and Texas law, and waiting for the tax bill is usually too late to challenge that year's appraisal."] },
        { title: 'What to gather when the value looks wrong', paragraphs: ['Useful records can include comparable sales, photographs, repair estimates, surveys, income and expense information, closing documents and examples of similar properties valued differently.'] },
      ]}
    />
    <Container className="pb-16 sm:pb-24">
      {migrationPriorityCounties.length ? <section aria-labelledby="appraisal-migration-guides" className="border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">Current county guides</p>
        <h2 id="appraisal-migration-guides" className="mt-2 font-display text-4xl">Use the current county property-tax pages</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These verified county guides replace older appraisal-district URLs that now redirect here. Use the current county page for appraisal records, exemptions, protests, tax-office resources and official local links.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {migrationPriorityCounties.map((county) => <Link key={county.slug} to="/property-tax/county/$county" params={{ county: county.slug }} className="group border-t border-border pt-4"><span className="eyebrow text-primary">Current county guide</span><strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{county.name} appraisal & property tax</strong><span className="mt-3 block text-sm font-semibold">Open county guide →</span></Link>)}
        </div>
      </section> : null}

      {priorityCounties.length ? <section aria-labelledby="appraisal-priority-guides" className="mt-12 border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">Local appraisal guides</p>
        <h2 id="appraisal-priority-guides" className="mt-2 font-display text-4xl">Direct appraisal-district starting points</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These county guides link to checked appraisal-district and tax-office resources. They appear here directly so you can reach the current local offices without going through retired appraisal-district URLs.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {priorityCounties.map((county) => <Link key={county.slug} to="/property-tax/county/$county" params={{ county: county.slug }} className="group border-t border-border pt-4"><span className="eyebrow text-primary">County property-tax guide</span><strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{county.name}</strong><span className="mt-3 block text-sm font-semibold">Appraisal & property tax →</span></Link>)}
        </div>
      </section> : null}

      <section aria-labelledby="appraisal-county-directory" className="mt-12 border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">All 254 counties</p>
        <h2 id="appraisal-county-directory" className="mt-2 font-display text-4xl">Find your county appraisal district</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Choose a county to start with the right local office. Counties with complete property-tax research link directly to the local appraisal and tax guide; the remaining counties link to the main county reference while their local tax resources are still being completed.</p>
        <ul className="mt-6 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEXAS_COUNTIES.map((county) => <li key={county.slug} className="border-b border-border py-3">{verifiedPropertySlugs.has(county.slug) ? <Link to="/property-tax/county/$county" params={{ county: county.slug }} className="font-semibold hover:text-primary"><span className="text-primary">{county.name}</span> <span className="text-xs font-normal text-muted-foreground">appraisal & tax guide</span> →</Link> : <Link to="/county/$slug" params={{ slug: county.slug }} className="font-semibold hover:text-primary">{county.name} <span className="text-xs font-normal text-muted-foreground">county reference</span> →</Link>}</li>)}
        </ul>
      </section>
      <CitationTrustPanel
        className="mt-10"
        sources={[{ name: 'Texas Comptroller county appraisal-district directory', url: officialDirectoryUrl }]}
        methodology="Texas Defined uses the Comptroller’s statewide directory as the authoritative starting point. Counties link directly to a local property-tax guide once the appraisal-district and tax-office sources are checked; otherwise this directory links to the main county reference until that local research is complete."
        lastVerified="August 3, 2026"
        title="Sources for this appraisal-district directory"
      />
    </Container>
  </>;
}
