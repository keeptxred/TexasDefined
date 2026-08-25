import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { PropertyTaxGuidePage } from '@/components/guides/PropertyTaxGuidePage';
import { Container } from '@/components/layout/Container';
import { COUNTY_PROPERTY_RECORDS } from '@/data/property/county-property-data';
import { isCountyPropertyIndexReady } from '@/data/property/county-property-schema';
import { TEXAS_COUNTIES } from '@/data/texas-places';
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
const verifiedPropertyCounties = COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady);
const verifiedPropertySlugs = new Set(verifiedPropertyCounties.map((county) => county.slug));
const priorityCountySlugs = ['leon', 'terrell', 'lubbock', 'hidalgo', 'sabine'];
const priorityCounties = priorityCountySlugs
  .map((slug) => TEXAS_COUNTIES.find((county) => county.slug === slug))
  .filter((county): county is (typeof TEXAS_COUNTIES)[number] => Boolean(county && verifiedPropertySlugs.has(county.slug)));

export const Route = createFileRoute('/learn/appraisal-districts')({
  head: () => ({
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
  }),
  component: AppraisalDistrictPage,
});

function AppraisalDistrictPage() {
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
      {priorityCounties.length ? <section aria-labelledby="appraisal-priority-guides" className="border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">Verified local guides</p>
        <h2 id="appraisal-priority-guides" className="mt-2 font-display text-4xl">Direct appraisal-district starting points</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These county guides have passed TexasDefined’s local-source readiness gate and link to verified appraisal-district and tax-office resources. They are surfaced here directly instead of sending readers through retired appraisal-district URLs.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {priorityCounties.map((county) => <Link key={county.slug} to="/property-tax/county/$county" params={{ county: county.slug }} className="group border-t border-border pt-4"><span className="eyebrow text-primary">Verified county guide</span><strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{county.name}</strong><span className="mt-3 block text-sm font-semibold">Appraisal & property tax →</span></Link>)}
        </div>
      </section> : null}

      <section aria-labelledby="appraisal-county-directory" className="mt-12 border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">All 254 counties</p>
        <h2 id="appraisal-county-directory" className="mt-2 font-display text-4xl">County appraisal-district research directory</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Choose a county. Verified local property-tax guides link directly to the county’s appraisal workflow. Counties whose local property-tax sources have not yet passed the publication gate link to the substantive county reference instead of a noindex tax page.</p>
        <ul className="mt-6 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEXAS_COUNTIES.map((county) => <li key={county.slug} className="border-b border-border py-3">{verifiedPropertySlugs.has(county.slug) ? <Link to="/property-tax/county/$county" params={{ county: county.slug }} className="font-semibold hover:text-primary"><span className="text-primary">{county.name}</span> <span className="text-xs font-normal text-muted-foreground">verified appraisal guide</span> →</Link> : <Link to="/county/$slug" params={{ slug: county.slug }} className="font-semibold hover:text-primary">{county.name} <span className="text-xs font-normal text-muted-foreground">county reference</span> →</Link>}</li>)}
        </ul>
      </section>
      <CitationTrustPanel
        className="mt-10"
        sources={[{ name: 'Texas Comptroller county appraisal-district directory', url: officialDirectoryUrl }]}
        methodology="Texas Defined uses the Comptroller’s statewide directory as the authoritative starting point. County property-tax pages receive direct internal discovery only after the local-source readiness gate is satisfied; until then, this directory points to the substantive county reference rather than a noindex county-tax page."
        lastVerified="August 3, 2026"
        title="Appraisal-district directory sources and methodology"
      />
    </Container>
  </>;
}
