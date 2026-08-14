import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyClusterGuidePage } from '@/components/guides/PropertyClusterGuidePage';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/learn/disabled-veteran-property-tax-benefits';
const description = '2026 Texas disabled veteran property-tax exemption guide covering VA disability-rating tiers, the 100% homestead exemption, surviving spouses, donated homes and how to apply with your appraisal district.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const pageTitle = 'Texas Disabled Veteran Property Tax Exemption | 2026 Guide';
const heading = 'Texas Disabled Veteran Property Tax Exemption: 2026 Guide';
const faqs = [
  { question: 'Do disabled veterans get a property-tax exemption in Texas?', answer: 'Texas provides property-tax exemptions for qualifying disabled veterans. The amount and type of relief depend on the veteran’s qualifying disability status, the property involved and the statutory requirements that apply.' },
  { question: 'What exemption tiers apply to disabled veterans?', answer: 'Texas provides graduated exemption amounts tied to qualifying disability ratings, with separate rules for certain 100% disabled or individually unemployable veterans.' },
  { question: 'Can a 100% disabled veteran owe no property tax on a Texas homestead?', answer: 'A qualifying veteran may receive a total exemption from property taxes on the residence homestead when statutory requirements are met.' },
  { question: 'Is a VA disability rating enough by itself to determine the Texas exemption?', answer: 'No. The VA documentation is important, but the appraisal district must apply Texas property-tax law to the application, ownership, residence and other eligibility requirements.' },
  { question: 'Can a surviving spouse continue the benefit?', answer: 'Some surviving spouses may continue a veteran-related exemption if statutory conditions are met, including residence and remarriage requirements.' },
  { question: 'Where do I apply for a disabled-veteran property-tax exemption?', answer: 'Apply with the county appraisal district that appraises the property, using the official form and supporting VA or military documentation.' },
];

export const Route = createFileRoute('/learn/disabled-veteran-property-tax-benefits')({
  head: () => ({ meta: buildMeta(texasDefinedBrand, { canonicalPath, title: pageTitle, description }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [jsonLd({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: heading, description, url: pageUrl, dateModified: '2026-08-13', publisher: { '@id': `${siteUrl}/#organization` } },
    { '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Property taxes', item: `${siteUrl}/learn/property-taxes` }, { '@type': 'ListItem', position: 3, name: 'Disabled veteran benefits', item: pageUrl }] },
  ] })] }),
  component: () => <PropertyClusterGuidePage eyebrow="Veteran property-tax relief" title={heading} intro="Texas offers several forms of property-tax relief for qualifying disabled veterans, including rating-based exemptions and, for some qualifying veterans, a total residence-homestead exemption. This guide explains the major benefit types, what the VA rating does and does not establish, and where to file locally." officialUrl="https://comptroller.texas.gov/taxes/property-tax/exemptions/disabledvet-faq.php" officialLabel="Texas Comptroller disabled veteran exemption guidance" faqs={faqs} sections={[
    { id: 'tiers', title: 'Graduated disabled-veteran exemptions', paragraphs: ['Texas provides exemption amounts based on qualifying disability ratings. The exemption can generally be applied to property selected by the veteran, subject to statutory rules and documentation. The appraisal district applies the exemption after reviewing the application and supporting records.'] },
    { id: 'total', title: '100% disabled veteran homestead exemption', paragraphs: ['Certain veterans rated 100% disabled or paid at the 100% rate because of individual unemployability may qualify for a total exemption on the residence homestead. A 100% VA rating is an important eligibility element, but the appraisal district still verifies the Texas ownership, residence and documentation requirements.'] },
    { id: 'donated-home', title: 'Donated-home provisions', paragraphs: ['Separate relief may apply to qualifying disabled veterans who receive a donated residence from a charitable organization. The benefit depends on disability rating, donation terms and statutory qualifications.'] },
    { id: 'survivors', title: 'Surviving spouses and children', paragraphs: ['Texas law provides continuation or separate relief for some surviving spouses and, in limited cases, children. Eligibility can depend on residence, remarriage, ownership and the veteran’s qualifying status at death.'] },
    { id: 'filing', title: 'How to apply in your Texas county', paragraphs: ['File with the appraisal district that appraises the property—not the tax office—and include the official application plus qualifying military or VA documentation. Keep the approval notice and verify the exemption on the appraisal record and tax bill. Use the county guide to find the correct appraisal district before filing.'], bullets: ['/property-tax/counties', '/texas-disabled-veteran-property-tax-calculator'] },
    { id: 'mistakes', title: 'Common mistakes', paragraphs: ['Frequent problems include filing with the tax office instead of the appraisal district, assuming benefits transfer automatically after a move, treating the VA rating as the only requirement, failing to update ownership and not checking whether the exemption appears for every applicable taxing unit.'] },
  ]} />,
});
