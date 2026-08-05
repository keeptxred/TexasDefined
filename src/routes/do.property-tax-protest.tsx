import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyTaxGuidePage } from '@/components/guides/PropertyTaxGuidePage';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description =
  'How to protest a Texas property appraisal, meet the deadline, build a useful evidence packet and prepare for the hearing.';

export const Route = createFileRoute('/do/property-tax-protest')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/do/property-tax-protest',
      title: 'Texas Property Tax Protest',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, '/do/property-tax-protest')],
  }),
  component: () => (
    <PropertyTaxGuidePage
      eyebrow="Challenge an appraisal"
      title="Texas Property Tax Protest Guide"
      intro={description}
      officialUrl="https://comptroller.texas.gov/taxes/property-tax/protests/"
      officialLabel="Check the Texas Comptroller's protest guidance"
      sections={[
        {
          title: 'Do not miss the deadline',
          paragraphs: [
            'Your appraisal notice and Texas law determine the protest deadline. File on time even if you are still gathering evidence; waiting too long can cost you the ordinary right to challenge the value.',
          ],
        },
        {
          title: 'Choose the right reason',
          paragraphs: [
            'Common reasons include an excessive value, unequal appraisal, an incorrect property description, a denied exemption or an ownership error. Select every reason that honestly applies to your property.',
          ],
        },
        {
          title: 'Build a clean evidence packet',
          paragraphs: [
            'A short, organized case is usually easier to follow than a large pile of unrelated documents.',
          ],
          steps: [
            "Review the appraisal district's evidence and property record.",
            'Choose comparable sales or properties and explain the important differences.',
            'Document condition, damage, access, location or factual errors.',
            'Write a brief explanation of the value you believe is fair.',
            'Keep a copy of everything you submit.',
          ],
        },
        {
          title: 'At the informal meeting and hearing',
          paragraphs: [
            'An informal review may settle the issue before a formal hearing. If it does not, present your strongest evidence clearly, answer questions directly and keep the written order for any next step.',
          ],
        },
        {
          title: 'After the decision',
          paragraphs: [
            'Read the order carefully and note the deadlines for arbitration, court, SOAH review when available or another appeal. You may still need to pay taxes on time while the challenge continues.',
          ],
        },
      ]}
    />
  ),
});
