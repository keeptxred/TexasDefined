import { texasDefinedBrand } from '@/brand/texasdefined';
import { LOCAL_PROPERTY_TAX_PROFILE_BY_SLUG } from '@/data/local-property-tax-calculators';
import { getCountyPropertyRecordBySlug } from '@/data/property/county-property-data';
import { isCountyPropertyIndexReady } from '@/data/property/county-property-schema';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export function loadLocalPropertyTaxCalculatorPageServer(slug: string) {
  const profile = LOCAL_PROPERTY_TAX_PROFILE_BY_SLUG.get(slug);
  if (!profile) return null;

  const pageUrl = absoluteUrl(texasDefinedBrand, profile.path);
  const siteUrl = absoluteUrl(texasDefinedBrand, '/');
  const calculatorsUrl = absoluteUrl(texasDefinedBrand, '/property-tax-calculators');
  const countyRecord = profile.defaultCountySlug && profile.counties.length === 1
    ? getCountyPropertyRecordBySlug(profile.defaultCountySlug)
    : undefined;
  const verifiedCountyGuide = countyRecord && isCountyPropertyIndexReady(countyRecord)
    ? { href: `/property-tax/county/${countyRecord.slug}`, label: `${countyRecord.name} verified property-tax guide` }
    : null;
  const isCountyCalculator = profile.name.endsWith(' County');
  const searchTitle = isCountyCalculator
    ? `${profile.name} Property Tax Calculator 2026 | Estimate Taxes`
    : profile.seoTitle;
  const searchDescription = isCountyCalculator
    ? `Estimate 2026 ${profile.name} property taxes using official county, city, school-district and special-district rates. Build the taxing-unit stack for your property.`
    : profile.description;

  const head = {
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: profile.path,
      title: searchTitle,
      description: searchDescription,
    }),
    links: [canonicalLink(texasDefinedBrand, profile.path)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          '@id': `${pageUrl}#calculator`,
          name: profile.title,
          description: profile.description,
          url: pageUrl,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Any',
          isPartOf: { '@id': `${siteUrl}#website` },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: 'Property-tax calculators', item: calculatorsUrl },
            { '@type': 'ListItem', position: 3, name: profile.name, item: pageUrl },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: profile.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        },
      ],
    })],
  };

  return { profile, verifiedCountyGuide, head };
}
