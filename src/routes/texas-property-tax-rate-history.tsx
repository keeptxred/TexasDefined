import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-property-tax-rate-history';
const description = 'Explore annual Texas property-tax rates for counties, cities, school districts and special districts using historical Comptroller statewide files.';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

export const Route = createFileRoute('/texas-property-tax-rate-history')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas Property Tax Rate History Explorer', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebApplication', '@id': `${pageUrl}#tool`, name: 'Texas Property Tax Rate History Explorer', description, url: pageUrl, applicationCategory: 'FinanceApplication', operatingSystem: 'Any' },
        { '@type': 'FAQPage', '@id': `${pageUrl}#faq`, mainEntity: [
          { '@type': 'Question', name: 'Does a higher tax rate always mean a higher property-tax bill?', acceptedAnswer: { '@type': 'Answer', text: 'No. A property-tax bill depends on taxable value, exemptions and the rates of every taxing unit that applies to the parcel. A rate can fall while a bill rises if taxable value rises enough.' } },
          { '@type': 'Question', name: 'What are M&O and I&S property-tax rates?', acceptedAnswer: { '@type': 'Answer', text: 'M&O generally refers to maintenance and operations. I&S, also called debt service, generally funds eligible debt obligations. Not every taxing-unit record reports the components in the same way.' } },
          { '@type': 'Question', name: 'Does this history prove that my property was taxed by the unit every year?', acceptedAnswer: { '@type': 'Answer', text: 'No. The tool shows statewide taxing-unit records. Boundaries, annexations, special districts and parcel jurisdiction can change, so a parcel-level bill or official local record is needed to prove which units applied to a property in a specific year.' } },
        ] },
      ],
    })],
  }),
});
