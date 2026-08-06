import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyClusterGuidePage } from '@/components/guides/PropertyClusterGuidePage';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/learn/wildlife-management-valuation';
const description = 'Texas wildlife management valuation guide covering eligibility, management plans, qualifying practices, annual records and rollback risks.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const faqs = [
  { question: 'Is wildlife management a separate exemption?', answer: 'It is generally a continuation of qualifying open-space agricultural appraisal when the land is converted to wildlife management use under statutory requirements.' },
  { question: 'How many management practices are required?', answer: 'Qualifying land generally must use at least three recognized wildlife-management practices, subject to applicable rules and local review.' },
  { question: 'Does hunting alone qualify?', answer: 'Recreational hunting by itself is not enough. The land must be actively managed for sustaining a breeding, migrating or wintering population of indigenous wild animals.' },
  { question: 'Do I need an annual report?', answer: 'Appraisal districts may request plans, reports and supporting documentation. Keep annual records even when the district does not request them every year.' },
];

export const Route = createFileRoute('/learn/wildlife-management-valuation')({
  head: () => ({ meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Wildlife Management Valuation', description }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [jsonLd({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: 'Texas Wildlife Management Valuation Guide', description, url: pageUrl, dateModified: '2026-08-06', publisher: { '@id': `${siteUrl}/#organization` } },
    { '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Property taxes', item: `${siteUrl}/learn/property-taxes` }, { '@type': 'ListItem', position: 3, name: 'Wildlife management valuation', item: pageUrl }] },
  ] })] }),
  component: () => <PropertyClusterGuidePage eyebrow="Land conservation" title="Texas Wildlife Management Valuation" intro={description} officialUrl="https://comptroller.texas.gov/taxes/property-tax/ag-timber/" officialLabel="Texas Comptroller agricultural and wildlife resources" faqs={faqs} sections={[
    { id: 'eligibility', title: 'Who can qualify', paragraphs: ['Wildlife management valuation generally applies when land already qualified for open-space agricultural appraisal and the owner changes the primary use to active wildlife management. The acreage, prior qualification and use requirements must remain satisfied.'] },
    { id: 'practices', title: 'Recognized management practices', paragraphs: ['A qualifying plan normally uses at least three statutory categories. The work should benefit a target wildlife population and be appropriate for the property.'], bullets: ['Habitat control', 'Erosion control', 'Predator management', 'Supplemental water', 'Supplemental food', 'Providing shelter', 'Census counts'] },
    { id: 'plan', title: 'Build a defensible wildlife plan', paragraphs: ['Describe the property, target species, goals, selected practices, schedules, maps and measurement methods. Match the plan to actual work rather than using generic language.'] },
    { id: 'records', title: 'Keep annual evidence', paragraphs: ['Maintain photographs, receipts, logs, maps, census results, contractor records and notes showing when and where each practice occurred. Documentation is crucial when the appraisal district reviews continued qualification.'] },
    { id: 'mistakes', title: 'Common mistakes', paragraphs: ['Owners commonly assume hunting, feeders or an unused pasture automatically qualify. Another risk is filing a plan but failing to perform or document the activities described in it.'] },
    { id: 'rollback', title: 'Change-of-use and rollback risk', paragraphs: ['A later nonqualifying change can create additional-tax exposure. Before development, subdivision or conversion, obtain account-specific guidance and estimate potential liability.'] },
  ]} />,
});
