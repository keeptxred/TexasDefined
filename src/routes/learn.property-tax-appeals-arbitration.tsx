import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyClusterGuidePage } from '@/components/guides/PropertyClusterGuidePage';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/learn/property-tax-appeals-arbitration';
const description = 'Texas property-tax appeals guide covering ARB orders, binding arbitration, limited binding arbitration, SOAH review and district court.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const faqs = [
  { question: 'What can I do after an ARB decision?', answer: 'Depending on the dispute and property, an owner may have access to regular binding arbitration, limited binding arbitration, SOAH review or state district court.' },
  { question: 'How long do I have to request arbitration?', answer: 'Regular binding arbitration generally must be requested within 60 days after receiving the ARB order, subject to current law and eligibility rules.' },
  { question: 'Does an appeal postpone payment?', answer: 'Usually not. Owners generally must timely pay the amount required by statute to preserve the appeal.' },
  { question: 'What is limited binding arbitration?', answer: 'It is a separate remedy addressing certain alleged procedural violations by an appraisal district or ARB rather than the ordinary market-value dispute itself.' },
];

export const Route = createFileRoute('/learn/property-tax-appeals-arbitration')({
  head: () => ({ meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Property Tax Appeals & Arbitration', description }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [jsonLd({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: 'Texas Property Tax Appeals and Arbitration', description, url: pageUrl, dateModified: '2026-08-06', publisher: { '@id': `${siteUrl}/#organization` } },
    { '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Property taxes', item: `${siteUrl}/learn/property-taxes` }, { '@type': 'ListItem', position: 3, name: 'Appeals and arbitration', item: pageUrl }] },
  ] })] }),
  component: () => <PropertyClusterGuidePage eyebrow="After the ARB hearing" title="Texas Property Tax Appeals & Binding Arbitration" intro={description} officialUrl="https://comptroller.texas.gov/taxes/property-tax/arbitration/" officialLabel="Texas Comptroller arbitration resources" faqs={faqs} sections={[
    { id: 'order', title: 'Read the ARB order immediately', paragraphs: ['The written order controls the next deadline. Confirm the issue decided, final value, delivery date, appeal language and required payment amount.'] },
    { id: 'regular-arbitration', title: 'Regular binding arbitration', paragraphs: ['Qualifying market-value and unequal-appraisal disputes may be appealed through binding arbitration when statutory value and property requirements are met. Residence homesteads receive special treatment under the eligibility rules.'] },
    { id: 'limited-arbitration', title: 'Limited binding arbitration', paragraphs: ['Limited binding arbitration addresses specified procedural complaints, such as whether an appraisal district or ARB followed certain legal requirements. It is not a substitute for a normal value appeal.'] },
    { id: 'soah', title: 'SOAH review', paragraphs: ['Certain qualifying properties and disputes may be appealed to the State Office of Administrative Hearings. Review value thresholds, filing fees, deadlines and payment requirements.'] },
    { id: 'court', title: 'State district court', paragraphs: ['Judicial review may be available after exhausting required administrative remedies. Litigation involves pleadings, evidence, costs, deadlines and strategic considerations that may warrant legal advice.'] },
    { id: 'payment', title: 'Preserve the appeal with timely payment', paragraphs: ['An owner generally must pay the amount required by the Property Tax Code before delinquency. Failure to make the required payment can jeopardize the appeal even when the appraisal argument is strong.'] },
  ]} />,
});
