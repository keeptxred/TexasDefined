import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { PropertyTaxGuidePage } from '@/components/guides/PropertyTaxGuidePage';
import { Container } from '@/components/layout/Container';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description =
  'How to protest a Texas property appraisal, identify the controlling deadline, build a useful evidence packet and prepare for the appraisal review board process.';
const canonicalPath = '/do/property-tax-protest';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const officialUrl = 'https://comptroller.texas.gov/taxes/property-tax/protests/';
const steps = [
  "Review the appraisal district's evidence and property record.",
  'Choose comparable sales or properties and explain the important differences.',
  'Document condition, damage, access, location or factual errors.',
  'Write a brief explanation of the value you believe is fair.',
  'Keep a copy of everything you submit.',
];

export const Route = createFileRoute('/do/property-tax-protest')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Property Tax Protest & Deadline Guide', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo', '@id': `${pageUrl}#howto`, url: pageUrl, name: 'How to prepare a Texas property appraisal protest', description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          step: steps.map((text, index) => ({ '@type': 'HowToStep', position: index + 1, name: text, text, url: `${pageUrl}#protest-step-${index + 1}` })),
        },
        { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumbs`, itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Property Taxes', item: `${siteUrl}/decide/property-taxes` },
          { '@type': 'ListItem', position: 3, name: 'Protest Your Appraisal', item: pageUrl },
        ] },
      ],
    })],
  }),
  component: PropertyTaxProtestPage,
});

function PropertyTaxProtestPage() {
  return <>
    <PropertyTaxGuidePage
      eyebrow="Know your options"
      title="How to protest your property appraisal"
      intro={description}
      officialUrl={officialUrl}
      officialLabel="Texas Comptroller protest guidance"
      canonicalPath={canonicalPath}
      stepPrefix="protest-step-"
      sections={[
        { title: 'Start with the deadline', paragraphs: ['For many appraisal notices, the ordinary protest deadline is May 15 or 30 days after the notice was delivered, whichever is later. Other notices and actions can use different rules, so the notice and current law control. File on time even if you are still gathering evidence.'] },
        { title: 'Choose the reason that fits', paragraphs: ['Common reasons include an excessive value, unequal appraisal, an incorrect property description, a denied exemption or an ownership error. Select every reason that honestly applies to your property.'] },
        { title: 'Build a clear evidence packet', paragraphs: ['A short, organized case is usually easier to follow than a large pile of unrelated documents.'], steps },
        { title: 'At the informal meeting and hearing', paragraphs: ['An informal review may settle the issue before a formal hearing. If it does not, present your strongest evidence clearly, answer questions directly and keep the written order for any next step.'] },
        { title: 'Read the decision carefully', paragraphs: ['Note the deadlines for arbitration, court, SOAH review when available or another appeal. You may still need to pay taxes on time while the challenge continues.'] },
      ]}
    />
    <Container className="pb-16 sm:pb-24">
      <section className="grid gap-5 border-t-2 border-foreground pt-8 sm:grid-cols-[1fr_auto] sm:items-center">
        <div><p className="eyebrow text-primary">Deadline check</p><h2 className="mt-2 font-display text-3xl">Do not rely on a generic calendar alone</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">The notice date and type of appraisal-district action can change the deadline. Use the statewide calendar to understand the normal sequence, then confirm the exact date printed on your notice and the current official guidance.</p></div>
        <Link to="/learn/property-tax-deadlines" className="font-semibold text-primary underline underline-offset-4">Open the Texas property-tax deadline guide →</Link>
      </section>
      <CitationTrustPanel
        className="mt-10"
        sources={[{ name: 'Texas Comptroller property-tax protest guidance', url: officialUrl }, { name: 'Texas Comptroller property-tax calendars', url: 'https://comptroller.texas.gov/taxes/property-tax/calendars/' }]}
        methodology="Texas Defined summarizes the ordinary protest process and common statutory timing rules for orientation. It treats the appraisal notice and current official guidance as controlling and does not infer a parcel-specific deadline from a statewide calendar."
        lastVerified="August 3, 2026"
        title="Protest and deadline sources"
      />
    </Container>
  </>;
}
