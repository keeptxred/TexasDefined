import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyClusterGuidePage } from '@/components/guides/PropertyClusterGuidePage';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/learn/disabled-veteran-property-tax-benefits';
const description = 'Texas disabled veteran property-tax guide covering exemption tiers, total homestead exemption, surviving spouses, donated homes and filing steps.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const faqs = [
  { question: 'What exemption tiers apply to disabled veterans?', answer: 'Texas provides graduated exemption amounts tied to qualifying disability ratings, with separate rules for certain 100% disabled or individually unemployable veterans.' },
  { question: 'Can a 100% disabled veteran owe no tax on a homestead?', answer: 'A qualifying veteran may receive a total exemption from property taxes on the residence homestead when statutory requirements are met.' },
  { question: 'Can a surviving spouse continue the benefit?', answer: 'Some surviving spouses may continue a veteran-related exemption if statutory conditions are met, including residence and remarriage requirements.' },
  { question: 'Where do I apply?', answer: 'Apply with the county appraisal district that appraises the property, using the official form and supporting VA or military documentation.' },
];

export const Route = createFileRoute('/learn/disabled-veteran-property-tax-benefits')({
  head: () => ({ meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Disabled Veteran Property Tax Benefits', description }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [jsonLd({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: 'Texas Disabled Veteran Property Tax Benefits', description, url: pageUrl, dateModified: '2026-08-06', publisher: { '@id': `${siteUrl}/#organization` } },
    { '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Property taxes', item: `${siteUrl}/learn/property-taxes` }, { '@type': 'ListItem', position: 3, name: 'Disabled veteran benefits', item: pageUrl }] },
  ] })] }),
  component: () => <PropertyClusterGuidePage eyebrow="Veteran property-tax relief" title="Texas Disabled Veteran Property Tax Benefits" intro={description} officialUrl="https://comptroller.texas.gov/taxes/property-tax/exemptions/disabledvet-faq.php" officialLabel="Texas Comptroller disabled veteran exemption guidance" faqs={faqs} sections={[
    { id: 'tiers', title: 'Graduated disabled-veteran exemptions', paragraphs: ['Texas provides exemption amounts based on qualifying disability ratings. The exemption can generally be applied to property selected by the veteran, subject to statutory rules and documentation.'] },
    { id: 'total', title: 'Total residence-homestead exemption', paragraphs: ['Certain veterans rated 100% disabled or paid at the 100% rate because of individual unemployability may qualify for a total exemption on the residence homestead. Verify the exact VA documentation and ownership requirements.'] },
    { id: 'donated-home', title: 'Donated-home provisions', paragraphs: ['Separate relief may apply to qualifying disabled veterans who receive a donated residence from a charitable organization. The benefit depends on disability rating, donation terms and statutory qualifications.'] },
    { id: 'survivors', title: 'Surviving spouses and children', paragraphs: ['Texas law provides continuation or separate relief for some surviving spouses and, in limited cases, children. Eligibility can depend on residence, remarriage, ownership and the veteran’s qualifying status at death.'] },
    { id: 'filing', title: 'How to file', paragraphs: ['File with the appraisal district and include the official application plus qualifying military or VA documentation. Keep the approval notice and verify the exemption on the appraisal record and tax bill.'] },
    { id: 'mistakes', title: 'Common mistakes', paragraphs: ['Frequent problems include filing with the tax office instead of the appraisal district, assuming benefits transfer automatically after a move, failing to update ownership and not checking whether the exemption appears for every applicable taxing unit.'] },
  ]} />,
});
