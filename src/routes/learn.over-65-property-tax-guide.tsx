import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyClusterGuidePage } from '@/components/guides/PropertyClusterGuidePage';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/learn/over-65-property-tax-guide';
const description = 'Texas over-65 property-tax guide covering exemptions, school tax ceilings, installments, deferrals, surviving spouses and moving rules.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const faqs = [
  { question: 'What happens when a Texas homeowner turns 65?', answer: 'A qualifying owner may receive the additional $60,000 school-district exemption for a residence homestead, on top of the general $140,000 school-district homestead exemption, plus a school tax ceiling and possible local benefits.' },
  { question: 'Is the tax bill frozen forever?', answer: 'The school tax ceiling limits qualifying school taxes, but other taxing units, new improvements and statutory adjustments can still change the total bill.' },
  { question: 'Can over-65 homeowners pay in installments?', answer: 'Qualifying homeowners may pay residence-homestead taxes in four installments when statutory notice and payment requirements are met.' },
  { question: 'Can collection be deferred?', answer: 'A qualifying homeowner may defer collection on the residence homestead, but the tax is not forgiven and generally accrues interest while remaining secured by a lien.' },
];

export const Route = createFileRoute('/learn/over-65-property-tax-guide')({
  head: () => ({ meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Over-65 Property Tax Guide', description }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [jsonLd({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: 'Texas Over-65 Property Tax Guide', description, url: pageUrl, dateModified: '2026-08-27', publisher: { '@id': `${siteUrl}/#organization` } },
    { '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Property taxes', item: `${siteUrl}/learn/property-taxes` }, { '@type': 'ListItem', position: 3, name: 'Over-65 guide', item: pageUrl }] },
  ] })] }),
  component: () => <PropertyClusterGuidePage eyebrow="Senior homeowner relief" title="Texas Over-65 Property Tax Guide" intro={description} officialUrl="https://comptroller.texas.gov/taxes/property-tax/exemptions/age65older-disabled-faq.php" officialLabel="Texas Comptroller age-65 and disabled homeowner guidance" faqs={faqs} sections={[
    { id: 'exemption', title: 'Additional age-65 exemption', paragraphs: ['For tax year 2025 and later, a qualifying owner age 65 or older may receive an additional $60,000 school-district residence-homestead exemption. That is in addition to the general $140,000 school-district residence-homestead exemption. Counties, cities and special districts may also provide optional local age-based exemptions.'] },
    { id: 'ceiling', title: 'School tax ceiling', paragraphs: ['The school tax ceiling generally limits future school taxes on the qualifying homestead. It is not a universal freeze on every line of the bill, and new improvements can affect the calculation.'] },
    { id: 'installments', title: 'Four-payment installment option', paragraphs: ['Qualifying homeowners may divide residence-homestead taxes into four installments by giving notice and making the first payment before delinquency. Later installments follow statutory deadlines.'] },
    { id: 'deferral', title: 'Tax deferral', paragraphs: ['A deferral postpones collection while eligibility continues. It does not erase the tax, remove the lien or prevent interest from accruing. Consider estate, refinance and sale implications before choosing it.'] },
    { id: 'moving', title: 'Moving and transferring the ceiling', paragraphs: ['Texas law may permit a proportional school tax ceiling transfer to another qualifying residence homestead. Apply with the new appraisal district and retain documentation from the prior district.'] },
    { id: 'surviving-spouse', title: 'Surviving spouse protections', paragraphs: ['A qualifying surviving spouse may continue certain age-65 benefits if statutory age, residence and remarriage conditions are met. Verify the rules promptly after an ownership change.'] },
  ]} />,
});
