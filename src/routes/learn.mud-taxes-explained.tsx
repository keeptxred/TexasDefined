import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyClusterGuidePage } from '@/components/guides/PropertyClusterGuidePage';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/learn/mud-taxes-explained';
const description = 'Texas MUD taxes explained: infrastructure debt, tax rates, utility fees, disclosures, homebuyer research and long-term cost planning.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const faqs = [
  { question: 'What is a Texas MUD?', answer: 'A municipal utility district is a local governmental entity that can provide water, wastewater, drainage, roads and related infrastructure and may impose property taxes and service charges.' },
  { question: 'Can a property have both city and MUD taxes?', answer: 'Yes. Depending on boundaries and service arrangements, a property can owe city taxes and MUD taxes at the same time.' },
  { question: 'Do MUD rates always decline as development grows?', answer: 'A growing tax base can support lower rates, but rate changes depend on debt, operations, assessed value, additional bonds and district decisions.' },
  { question: 'Are MUD taxes included in escrow?', answer: 'They are commonly included when billed as property tax, but buyers and homeowners should verify the exact accounts and servicer payment history.' },
];

export const Route = createFileRoute('/learn/mud-taxes-explained')({
  head: () => ({ meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas MUD Taxes Explained', description }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [jsonLd({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: 'Texas MUD Taxes Explained', description, url: pageUrl, dateModified: '2026-08-06', publisher: { '@id': `${siteUrl}/#organization` } },
    { '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Property taxes', item: `${siteUrl}/learn/property-taxes` }, { '@type': 'ListItem', position: 3, name: 'MUD taxes', item: pageUrl }] },
  ] })] }),
  component: () => <PropertyClusterGuidePage eyebrow="Special district costs" title="Texas MUD Taxes Explained" intro={description} officialUrl="https://www.tceq.texas.gov/permitting/water-districts" officialLabel="Texas Commission on Environmental Quality water district resources" faqs={faqs} sections={[
    { id: 'purpose', title: 'What MUDs finance', paragraphs: ['Municipal utility districts often finance water, wastewater, drainage, roads and other development infrastructure. They can issue bonds, levy property taxes and charge utility fees.'] },
    { id: 'bill', title: 'How MUD taxes appear on a bill', paragraphs: ['A MUD is a separate taxing unit. Its taxable value, exemptions and rate may differ from the county, city and school district lines on the same statement.'] },
    { id: 'debt', title: 'Debt and development stage', paragraphs: ['Newer districts may carry significant infrastructure debt over a smaller initial tax base. As development grows, the base can expand, but future rates also depend on operations, new bonds and refinancing.'] },
    { id: 'fees', title: 'Taxes versus utility fees', paragraphs: ['Property tax supports district obligations, while monthly water, wastewater and other charges pay for service and operations. Homebuyers should budget for both.'] },
    { id: 'disclosure', title: 'Real-estate disclosures', paragraphs: ['Texas transactions involving certain districts may include statutory notices describing the district, tax rate, debt and authority. Read the notice and verify current records independently.'] },
    { id: 'buyer-checklist', title: 'MUD buyer checklist', paragraphs: ['Verify the exact district, current and historical rates, outstanding debt, adopted exemptions, utility fees, planned bonds, development stage and whether city taxes also apply.'] },
  ]} />,
});
