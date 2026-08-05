import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyTaxGuidePage } from '@/components/guides/PropertyTaxGuidePage';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description =
  'How to find your Texas appraisal district, check the property record, understand notices and know what to do when something looks wrong.';
const canonicalPath = '/learn/appraisal-districts';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const steps = [
  'Open the official appraisal district website.',
  'Find the property account and review the details.',
  'Download the current appraisal notice and value history.',
  'Contact the district quickly when something is wrong.',
];

export const Route = createFileRoute('/learn/appraisal-districts')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Appraisal Districts', description }),
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
            { '@type': 'ListItem', position: 3, name: 'Appraisal districts', item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: () => (
    <PropertyTaxGuidePage
      eyebrow="Local appraisal"
      title="Texas Appraisal Districts"
      intro={description}
      officialUrl="https://comptroller.texas.gov/taxes/property-tax/county-directory/"
      officialLabel="Find your official appraisal district"
      canonicalPath={canonicalPath}
      stepPrefix="appraisal-step-"
      sections={[
        {
          title: 'What the appraisal district handles',
          paragraphs: [
            'Each county appraisal district identifies taxable property, keeps ownership and property details, sets appraised values, administers exemptions and supports the protest process. It does not set local tax rates or collect every tax bill.',
          ],
        },
        {
          title: 'What to check on your property account',
          paragraphs: [
            'Confirm the owner name, mailing address, legal description, property details, exemptions, taxing units and value history. Small factual errors can affect both the value and the notices you receive.',
          ],
          steps,
        },
        {
          title: 'Pay attention to every notice',
          paragraphs: [
            "Read appraisal notices as soon as they arrive. Protest deadlines are tied to the notice and Texas law, and waiting for the tax bill is usually too late to challenge that year's appraisal.",
          ],
        },
        {
          title: 'Evidence worth gathering',
          paragraphs: [
            'Helpful records may include comparable sales, photographs, repair estimates, surveys, income and expense information, closing documents and examples of unequal appraisal.',
          ],
        },
      ]}
    />
  ),
});
