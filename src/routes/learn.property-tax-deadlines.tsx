import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyClusterGuidePage } from '@/components/guides/PropertyClusterGuidePage';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/learn/property-tax-deadlines';
const description = 'Texas property-tax deadlines guide covering appraisal dates, exemptions, protests, tax bills, installments, appeals and delinquency.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const faqs = [
  { question: 'What is the normal Texas property-tax protest deadline?', answer: 'For many notices, the ordinary deadline is May 15 or 30 days after delivery of the notice, whichever is later. The notice controls.' },
  { question: 'When are Texas property taxes due?', answer: 'Most ordinary bills are due by January 31 and become delinquent February 1, although late-mailed and corrected bills can have different dates.' },
  { question: 'When is a homestead application due?', answer: 'April 30 is a common application deadline, but late-filing rules may allow relief in some circumstances.' },
  { question: 'Do weekend and holiday rules matter?', answer: 'Yes. Some statutory deadlines shift when the date falls on a weekend or legal holiday. Always verify the current calendar and the official notice.' },
];

export const Route = createFileRoute('/learn/property-tax-deadlines')({
  head: () => ({ meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Property Tax Deadlines', description }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [jsonLd({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: 'Texas Property Tax Deadlines', description, url: pageUrl, dateModified: '2026-08-06', publisher: { '@id': `${siteUrl}/#organization` } },
    { '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Property taxes', item: `${siteUrl}/learn/property-taxes` }, { '@type': 'ListItem', position: 3, name: 'Deadlines', item: pageUrl }] },
  ] })] }),
  component: () => <PropertyClusterGuidePage eyebrow="Annual property-tax calendar" title="Texas Property Tax Deadlines" intro={description} officialUrl="https://comptroller.texas.gov/taxes/property-tax/calendars/" officialLabel="Texas Comptroller property-tax calendars" faqs={faqs} sections={[
    { id: 'january', title: 'January 1: appraisal date', paragraphs: ['Ownership, property condition, use and exemption eligibility are generally measured as of January 1. Save photographs and records showing the property’s condition on that date.'] },
    { id: 'applications', title: 'Spring application deadlines', paragraphs: ['April 30 is a common deadline for many exemption and special-appraisal applications. Some late-filing provisions exist, but they may involve penalties or narrower eligibility.'] },
    { id: 'protests', title: 'Protest deadlines', paragraphs: ['For many appraisal notices, the ordinary deadline is May 15 or 30 days after delivery, whichever is later. Other actions and notices can carry different deadlines.'] },
    { id: 'hearings', title: 'ARB hearings and post-order appeals', paragraphs: ['After a timely protest, the appraisal review board schedules a hearing. Arbitration, SOAH and district-court appeals have separate filing and payment deadlines measured from receipt of the ARB order.'] },
    { id: 'bills', title: 'Bills and payment deadlines', paragraphs: ['Tax bills are commonly mailed in the fall. Most ordinary taxes must be paid by January 31 and become delinquent February 1, but the printed bill controls.'] },
    { id: 'installments', title: 'Installments and deferrals', paragraphs: ['Age-65, disabled and certain disabled-veteran homeowners may have installment or deferral options. Notice and first-payment deadlines are critical.'] },
  ]} />,
});
