import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyTaxGuidePage } from '@/components/guides/PropertyTaxGuidePage';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description =
  'How to find your appraisal district, check the property record, understand the notices and act quickly when something does not look right.';
const canonicalPath = '/learn/appraisal-districts';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const steps = [
  'Open your county appraisal district’s official website.',
  'Find the property account and check every detail.',
  'Save the latest appraisal notice and value history.',
  'Contact the district promptly if something is wrong.',
];

export const Route = createFileRoute('/learn/appraisal-districts')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Find Your Appraisal District', description }),
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
            '@type': 'HowToStep',
            position: index + 1,
            name: text,
            text,
            url: `${pageUrl}#appraisal-step-${index + 1}`,
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Property taxes', item: `${siteUrl}/decide/property-taxes` },
            { '@type': 'ListItem', position: 3, name: 'Find your appraisal district', item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: () => (
    <PropertyTaxGuidePage
      eyebrow="Know your local office"
      title="Find your appraisal district"
      intro={description}
      officialUrl="https://comptroller.texas.gov/taxes/property-tax/county-directory/"
      officialLabel="Find the appraisal district for your county"
      canonicalPath={canonicalPath}
      stepPrefix="appraisal-step-"
      sections={[
        {
          title: 'What this office actually does',
          paragraphs: [
            'Your county appraisal district identifies taxable property, keeps ownership and property details, sets appraised values, handles exemptions and supports the protest process. It does not set local tax rates or collect every tax bill.',
          ],
        },
        {
          title: 'Give the property account a careful look',
          paragraphs: [
            'Check the owner name, mailing address, legal description, property details, exemptions, taxing units and value history. Even a small factual error can affect the value or the notices you receive.',
          ],
          steps,
        },
        {
          title: 'Do not set the notice aside',
          paragraphs: [
            "Read an appraisal notice as soon as it arrives. Protest deadlines are tied to the notice and Texas law, and waiting for the tax bill is usually too late to challenge that year's appraisal.",
          ],
        },
        {
          title: 'What to gather when the value looks wrong',
          paragraphs: [
            'Useful records can include comparable sales, photographs, repair estimates, surveys, income and expense information, closing documents and examples of similar properties valued differently.',
          ],
        },
      ]}
    />
  ),
});
