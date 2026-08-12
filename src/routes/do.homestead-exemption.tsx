import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { PropertyTaxGuidePage } from '@/components/guides/PropertyTaxGuidePage';
import { Container } from '@/components/layout/Container';
import { formatDatasetValue, getTexasDataset } from '@/data/texas-data-center';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description = 'Who may qualify for a Texas homestead exemption, how to apply, what paperwork to gather, and how the statewide school-district residence-homestead exemption has changed over time.';
const canonicalPath = '/do/homestead-exemption';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const officialUrl = 'https://comptroller.texas.gov/taxes/property-tax/exemptions/';
const historyDataset = getTexasDataset('homestead-exemption-history');
const steps = [
  'Go to the official county appraisal district website.',
  'Open the residence homestead application.',
  'Gather the identification and ownership documents the district requests.',
  'Submit the application and save the confirmation.',
  'Check the property account to make sure the exemption was approved for the correct year.',
];

export const Route = createFileRoute('/do/homestead-exemption')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Homestead Exemption Guide & History', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo', '@id': `${pageUrl}#howto`, url: pageUrl, name: 'How to apply for a Texas homestead exemption', description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          step: steps.map((text, index) => ({ '@type': 'HowToStep', position: index + 1, name: text, text, url: `${pageUrl}#homestead-step-${index + 1}` })),
        },
        ...(historyDataset ? [{
          '@type': 'Dataset', '@id': `${pageUrl}#history`, name: historyDataset.title, description: historyDataset.description,
          dateModified: historyDataset.updated, temporalCoverage: String(historyDataset.year), isBasedOn: historyDataset.sourceUrl,
          measurementTechnique: historyDataset.methodology,
          variableMeasured: historyDataset.rows.map((row) => ({ '@type': 'PropertyValue', name: row.label, value: row.value, unitText: 'USD' })),
        }] : []),
        {
          '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumbs`, itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Property Taxes', item: `${siteUrl}/decide/property-taxes` },
            { '@type': 'ListItem', position: 3, name: 'File Your Homestead Exemption', item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: HomesteadExemptionPage,
});

function HomesteadExemptionPage() {
  return <>
    <PropertyTaxGuidePage
      eyebrow="Homeowner basics"
      title="How to file your homestead exemption"
      intro={description}
      officialUrl={officialUrl}
      officialLabel="Texas Comptroller exemption guidance"
      canonicalPath={canonicalPath}
      stepPrefix="homestead-step-"
      sections={[
        { title: 'What it can do for your tax bill', paragraphs: ['A residence homestead exemption lowers the taxable value used by qualifying taxing units. Extra benefits may be available for homeowners age 65 or older, people with disabilities, disabled veterans and certain surviving spouses.'] },
        { title: 'Who may qualify', paragraphs: ['The home generally must be your principal residence, and you must meet the ownership and occupancy rules. Inherited homes, trusts, manufactured homes and other ownership arrangements can require additional paperwork.'] },
        { title: 'How to file', paragraphs: ['Apply through the appraisal district in the county where the home is located. Filing is generally free, so be cautious of companies charging for a form you can submit yourself.'], steps },
        { title: 'Check it after filing', paragraphs: ['Review the property account each year to make sure the exemption is still there. Tell the appraisal district when ownership, occupancy or eligibility changes.'] },
      ]}
    />
    {historyDataset ? <Container className="pb-16 sm:pb-24">
      <section aria-labelledby="homestead-history" className="border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">Statewide comparison</p>
        <h2 id="homestead-history" className="mt-2 font-display text-4xl">School homestead exemption history</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These values show major statewide mandatory school-district residence-homestead exemption levels in the source dataset. Local optional exemptions and special exemptions are separate and must be checked with the appraisal district and taxing unit.</p>
        <div className="mt-6 overflow-x-auto border-y border-border"><table className="w-full min-w-[460px] text-left text-sm"><thead><tr className="border-b border-border bg-surface text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground"><th className="px-4 py-3">Year</th><th className="px-4 py-3">Statewide school exemption</th><th className="px-4 py-3">Scope</th></tr></thead><tbody className="divide-y divide-border">{historyDataset.rows.map((row) => <tr key={row.label}><td className="px-4 py-4 font-semibold">{row.label}</td><td className="px-4 py-4 tabular-nums">{formatDatasetValue(row.value, historyDataset.unit)}</td><td className="px-4 py-4 text-muted-foreground">Mandatory school-district residence-homestead level in the cited statewide history</td></tr>)}</tbody></table></div>
        <p className="mt-4 text-sm font-semibold"><Link to="/texas-data/$datasetSlug" params={{ datasetSlug: historyDataset.slug }} className="text-primary underline underline-offset-4">Open the source-backed data brief →</Link></p>
      </section>
      <CitationTrustPanel className="mt-10" sources={[{ name: historyDataset.sourceName, url: historyDataset.sourceUrl }, { name: 'Texas Comptroller exemption guidance', url: officialUrl }]} methodology={historyDataset.methodology} lastVerified={historyDataset.updated} title="Homestead comparison sources and methodology" />
    </Container> : null}
  </>;
}
