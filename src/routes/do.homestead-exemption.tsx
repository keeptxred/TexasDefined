import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyTaxGuidePage } from '@/components/guides/PropertyTaxGuidePage';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description = 'Who may qualify for a Texas homestead exemption, how to apply, what paperwork to gather and what to check after filing.';
const canonicalPath = '/do/homestead-exemption';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const steps = [
  'Go to the official county appraisal district website.',
  'Open the residence homestead application.',
  'Gather the identification and ownership documents the district requests.',
  'Submit the application and save the confirmation.',
  'Check the property account to make sure the exemption was approved for the correct year.',
];

export const Route = createFileRoute('/do/homestead-exemption')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Homestead Exemption', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo',
          '@id': `${pageUrl}#howto`,
          url: pageUrl,
          name: 'How to apply for a Texas homestead exemption',
          description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          step: steps.map((text, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: text,
            text,
            url: `${pageUrl}#homestead-step-${index + 1}`,
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Property taxes', item: `${siteUrl}/decide/property-taxes` },
            { '@type': 'ListItem', position: 3, name: 'Homestead exemption', item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: () => <PropertyTaxGuidePage
    eyebrow="Homeowner basics"
    title="How to file your homestead exemption"
    intro={description}
    officialUrl="https://comptroller.texas.gov/taxes/property-tax/exemptions/"
    officialLabel="Check the latest exemption guidance"
    canonicalPath={canonicalPath}
    stepPrefix="homestead-step-"
    sections={[
      { title: 'What it can do for your tax bill', paragraphs: ['A residence homestead exemption lowers the taxable value used by qualifying taxing units. Extra benefits may be available for homeowners age 65 or older, people with disabilities, disabled veterans and certain surviving spouses.'] },
      { title: 'Who may qualify', paragraphs: ['The home generally must be your principal residence, and you must meet the ownership and occupancy rules. Inherited homes, trusts, manufactured homes and other ownership arrangements can require additional paperwork.'] },
      { title: 'How to file', paragraphs: ['Apply through the appraisal district in the county where the home is located. Filing is generally free, so be cautious of companies charging for a form you can submit yourself.'], steps },
      { title: 'Check it after filing', paragraphs: ['Review the property account each year to make sure the exemption is still there. Tell the appraisal district when ownership, occupancy or eligibility changes.'] },
    ]}
  />,
});
