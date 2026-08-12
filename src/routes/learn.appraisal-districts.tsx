import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { PropertyTaxGuidePage } from '@/components/guides/PropertyTaxGuidePage';
import { Container } from '@/components/layout/Container';
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
          name: 'Texas county appraisal-district research directory',
          numberOfItems: TEXAS_COUNTIES.length,
          itemListElement: TEXAS_COUNTIES.map((county, index) => ({
            '@type': 'ListItem', position: index + 1, name: `${county.name} appraisal district research`, url: `${siteUrl}/property-tax/county/${county.slug}`,
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
      <section aria-labelledby="appraisal-county-directory" className="border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">All 254 counties</p>
        <h2 id="appraisal-county-directory" className="mt-2 font-display text-4xl">County appraisal-district research directory</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Choose a county to open its property-tax reference. When a local appraisal-district source has been verified, the county page links directly to it; otherwise use the Texas Comptroller directory linked below rather than guessing an office URL.</p>
        <ul className="mt-6 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEXAS_COUNTIES.map((county) => <li key={county.slug} className="border-b border-border py-3"><Link to="/property-tax/county/$county" params={{ county: county.slug }} className="font-semibold hover:text-primary">{county.name} →</Link></li>)}
        </ul>
      </section>
      <CitationTrustPanel
        className="mt-10"
        sources={[{ name: 'Texas Comptroller county appraisal-district directory', url: officialDirectoryUrl }]}
        methodology="Texas Defined uses the Comptroller’s statewide directory as the authoritative starting point. County pages expose a direct local appraisal-district link only after that local source has been verified; missing local links are left pending rather than generated from a naming pattern."
        lastVerified="August 3, 2026"
        title="Appraisal-district directory sources and methodology"
      />
    </Container>
  </>;
}
