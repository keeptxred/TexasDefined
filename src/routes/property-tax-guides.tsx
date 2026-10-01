import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/property-tax-guides';
const title = 'Texas Property Tax Guide 2026: Exemptions, Protests & Rates';
const description = 'Texas property tax guide for 2026: understand appraisals, homestead exemptions, protests, local rates, MUDs, bills, deadlines, county offices and official-rate calculators.';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
const siteUrl = absoluteUrl(texasDefinedBrand, '/');

const schemaFaqs = [
  ['How do Texas property taxes work?', 'Local appraisal districts determine property values, exemptions reduce taxable value when a property qualifies, and local taxing units such as counties, cities, school districts and special districts adopt tax rates. The bill depends on the taxable value and the rates for the exact taxing units serving the property.'],
  ['Does Texas have one statewide property-tax rate?', 'No. Texas does not impose a statewide property tax. Local taxing units adopt their own rates, so two homes with the same value can have different bills depending on their county, city, school district and special districts.'],
  ['What is the Texas homestead exemption for school taxes in 2026?', 'Texas law requires school districts to provide a $140,000 residence-homestead exemption. Other taxing units may offer additional local-option exemptions, so the taxable value can differ by taxing unit.'],
  ['When is the usual Texas property-tax protest deadline?', 'In most cases, the deadline is May 15 or 30 days after the appraisal district mails the notice of appraised value, whichever is later. Special situations can have different deadlines, so verify the date shown by your appraisal district.'],
  ['When are Texas property taxes normally due?', 'In most cases, property taxes must be paid by January 31. Taxes unpaid on February 1 are generally delinquent, although a later-mailed bill can postpone the delinquency date.'],
  ['Where do I file a homestead exemption?', 'File with the appraisal district for the county where the property is located. The appraisal district chief appraiser determines whether the property qualifies.'],
  ['What is a MUD tax?', 'A municipal utility district is a special-purpose district that may levy property taxes in addition to county, city and school-district taxes. MUD rates can materially affect the total annual cost of owning a property.'],
  ['Are Texas Defined estimates official tax bills?', 'No. Texas Defined provides educational guides and planning tools. Appraisal districts, appraisal review boards, taxing units and tax assessor-collectors control official values, exemptions, rates, decisions and bills.'],
] as const;

export const Route = createFileRoute('/property-tax-guides')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Property Tax Guide 2026: Exemptions, Protests & Rates',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${pageUrl}#page`,
          url: pageUrl,
          name: title,
          description,
          dateModified: '2026-10-01',
          isPartOf: { '@id': `${siteUrl}#website` },
          publisher: { '@id': `${siteUrl}#organization` },
        },
        {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: schemaFaqs.map(([question, answer]) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: answer },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: 'Property', item: absoluteUrl(texasDefinedBrand, '/property') },
            { '@type': 'ListItem', position: 3, name: 'Texas Property Tax Guide', item: pageUrl },
          ],
        },
      ],
    })],
  }),
});
