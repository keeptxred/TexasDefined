import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyClusterGuidePage } from '@/components/guides/PropertyClusterGuidePage';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/learn/homebuyer-property-tax-checklist';
const description = 'Texas homebuyer property-tax checklist covering post-sale appraisal, exemptions, MUDs, escrow, tax-rate research and closing due diligence.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const faqs = [
  { question: 'Should I use the seller’s current tax bill?', answer: 'Use it only as a starting point. The seller may have a capped appraised value and exemptions that do not transfer to the buyer.' },
  { question: 'Does the purchase price become the appraisal automatically?', answer: 'Not automatically, but an arm’s-length sale can be important evidence of market value and may influence later appraisal.' },
  { question: 'When should I file homestead?', answer: 'File with the appraisal district after you establish eligibility and ownership, using the current application and required identification.' },
  { question: 'How do I identify MUD and special-district taxes?', answer: 'Review the appraisal account, tax bill, title documents, district notices and county truth-in-taxation records for the exact parcel.' },
];

export const Route = createFileRoute('/learn/homebuyer-property-tax-checklist')({
  head: () => ({ meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Homebuyer Property Tax Checklist', description }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [jsonLd({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: 'Texas Homebuyer Property Tax Checklist', description, url: pageUrl, dateModified: '2026-08-06', publisher: { '@id': `${siteUrl}/#organization` } },
    { '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Property taxes', item: `${siteUrl}/learn/property-taxes` }, { '@type': 'ListItem', position: 3, name: 'Homebuyer checklist', item: pageUrl }] },
  ] })] }),
  component: () => <PropertyClusterGuidePage eyebrow="Before and after closing" title="Texas Homebuyer Property Tax Checklist" intro={description} officialUrl="https://comptroller.texas.gov/taxes/property-tax/basics.php" officialLabel="Texas Comptroller property-tax basics" faqs={faqs} sections={[
    { id: 'before-offer', title: 'Before making an offer', paragraphs: ['Look up the exact appraisal account, current market and appraised values, exemptions, taxing units and value history. Compare multiple years rather than relying on a listing estimate.'] },
    { id: 'jurisdictions', title: 'Identify every taxing jurisdiction', paragraphs: ['Confirm the county, city, school district, MUD, ESD, hospital district, community college and other special districts serving the parcel. Nearby homes can have different totals.'] },
    { id: 'future-tax', title: 'Estimate the post-purchase bill', paragraphs: ['Model taxes using a realistic value near the purchase price and the buyer’s own expected exemptions. Do not carry forward the seller’s cap, tax ceiling or veteran benefit.'] },
    { id: 'closing', title: 'Review closing documents and prorations', paragraphs: ['Check tax certificates, prorations, district notices, escrow setup and outstanding assessments. Understand which party is responsible for supplemental or corrected bills.'] },
    { id: 'after-closing', title: 'After closing', paragraphs: ['Update the appraisal district mailing address, file homestead when eligible, verify ownership, confirm the mortgage servicer has the correct tax account and monitor the first appraisal notice.'] },
    { id: 'escrow', title: 'Prepare for escrow changes', paragraphs: ['The first lender projection may use the seller’s lower tax history. Maintain a reserve for a higher bill, insurance renewal and escrow shortage after reassessment.'] },
    { id: 'annual', title: 'Annual homeowner routine', paragraphs: ['Each spring, check the appraisal record and protest deadline. Each fall, verify tax bills and escrow payment. Recalculate the complete housing cost before renewals and major financial decisions.'] },
  ]} />,
});
