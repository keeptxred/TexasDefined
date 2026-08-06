import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyClusterGuidePage } from '@/components/guides/PropertyClusterGuidePage';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/learn/agricultural-valuation';
const description = 'Complete guide to Texas agricultural appraisal, qualification, applications, intensity standards, rollback taxes and land-use planning.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const faqs = [
  { question: 'Is the Texas ag exemption really an exemption?', answer: 'Usually no. It is a special appraisal method that values qualifying land according to agricultural productivity rather than ordinary market value.' },
  { question: 'How much acreage is required?', answer: 'Texas law does not establish one statewide minimum for every use. Local appraisal districts apply degree-of-intensity and typical-use standards for the area.' },
  { question: 'Can a new owner keep the valuation?', answer: 'Qualification depends on the land use and application requirements. Buyers should confirm history, current use and filing obligations with the appraisal district.' },
  { question: 'What are rollback taxes?', answer: 'A change from qualifying agricultural use can trigger additional tax based on the difference between special appraisal and market-value taxation for prior years, plus interest as provided by law.' },
];

export const Route = createFileRoute('/learn/agricultural-valuation')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Agricultural Valuation Guide', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Article', '@id': `${pageUrl}#article`, headline: 'Texas Agricultural Valuation Guide', description, url: pageUrl, dateModified: '2026-08-06', publisher: { '@id': `${siteUrl}/#organization` } },
      { '@type': 'FAQPage', '@id': `${pageUrl}#faq`, mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Property taxes', item: `${siteUrl}/learn/property-taxes` }, { '@type': 'ListItem', position: 3, name: 'Agricultural valuation', item: pageUrl }] },
    ] })],
  }),
  component: () => <PropertyClusterGuidePage eyebrow="Land & property taxes" title="Texas Agricultural Valuation: Complete Guide" intro={description} officialUrl="https://comptroller.texas.gov/taxes/property-tax/ag-timber/" officialLabel="Texas Comptroller agricultural and timber appraisal resources" faqs={faqs} sections={[
    { id: 'overview', title: 'What agricultural valuation does', paragraphs: ['Qualifying Texas land may be appraised according to its capacity to produce agricultural products rather than its full market value. This can reduce taxable value substantially, but it is a use-based appraisal with continuing requirements.'] },
    { id: 'qualification', title: 'Qualification and prior use', paragraphs: ['The land must generally be devoted principally to a qualifying agricultural use to the degree of intensity typical for the area. Many applications also depend on an established history of agricultural use.'], bullets: ['Grazing and livestock', 'Crop production', 'Hay production', 'Orchards and vineyards', 'Beekeeping where statutory conditions are met', 'Other qualifying agricultural uses'] },
    { id: 'intensity', title: 'Degree-of-intensity standards', paragraphs: ['Appraisal districts publish local guidelines because typical agricultural operations differ across Texas. Stocking rates, acreage, management practices and production evidence should be compared with local standards.'] },
    { id: 'application', title: 'Application and documentation', paragraphs: ['File with the county appraisal district and retain leases, receipts, livestock records, photographs, production records, maps and other proof showing actual use. Missing a filing deadline can delay or prevent special appraisal for the year.'] },
    { id: 'rollback', title: 'Rollback taxes and change of use', paragraphs: ['A qualifying change of use may trigger additional taxes for prior years. Before subdividing, developing, converting or selling land for another use, estimate the rollback exposure and verify the current statute and local account history.'] },
    { id: 'buyer-checklist', title: 'Buyer due-diligence checklist', paragraphs: ['Do not rely only on the seller’s current tax bill. Confirm the exact account, use history, pending applications, rollback exposure, leases, intensity standards and your own intended use before closing.'] },
  ]} />,
});
