import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyTaxGuidePage } from '@/components/guides/PropertyTaxGuidePage';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description =
  'How to protest a Texas property appraisal, meet the deadline, build a useful evidence packet and prepare for the hearing.';
const canonicalPath = '/do/property-tax-protest';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const steps = [
  "Review the appraisal district's evidence and property record.",
  'Choose comparable sales or properties and explain the important differences.',
  'Document condition, damage, access, location or factual errors.',
  'Write a brief explanation of the value you believe is fair.',
  'Keep a copy of everything you submit.',
];

export const Route = createFileRoute('/do/property-tax-protest')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'How to Protest Your Property Appraisal', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo',
          '@id': `${pageUrl}#howto`,
          url: pageUrl,
          name: 'How to prepare a Texas property appraisal protest',
          description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          step: steps.map((text, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: text,
            text,
            url: `${pageUrl}#protest-step-${index + 1}`,
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Property Taxes', item: `${siteUrl}/decide/property-taxes` },
            { '@type': 'ListItem', position: 3, name: 'Protest Your Appraisal', item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: () => (
    <PropertyTaxGuidePage
      eyebrow="Know your options"
      title="How to protest your property appraisal"
      intro={description}
      officialUrl="https://comptroller.texas.gov/taxes/property-tax/protests/"
      officialLabel="Check the latest protest guidance"
      canonicalPath={canonicalPath}
      stepPrefix="protest-step-"
      sections={[
        {
          title: 'Start with the deadline',
          paragraphs: [
            'Your appraisal notice and Texas law determine the protest deadline. File on time even if you are still gathering evidence; waiting too long can cost you the ordinary right to challenge the value.',
          ],
        },
        {
          title: 'Choose the reason that fits',
          paragraphs: [
            'Common reasons include an excessive value, unequal appraisal, an incorrect property description, a denied exemption or an ownership error. Select every reason that honestly applies to your property.',
          ],
        },
        {
          title: 'Build a clear evidence packet',
          paragraphs: [
            'A short, organized case is usually easier to follow than a large pile of unrelated documents.',
          ],
          steps,
        },
        {
          title: 'At the informal meeting and hearing',
          paragraphs: [
            'An informal review may settle the issue before a formal hearing. If it does not, present your strongest evidence clearly, answer questions directly and keep the written order for any next step.',
          ],
        },
        {
          title: 'Read the decision carefully',
          paragraphs: [
            'Note the deadlines for arbitration, court, SOAH review when available or another appeal. You may still need to pay taxes on time while the challenge continues.',
          ],
        },
      ]}
    />
  ),
});
