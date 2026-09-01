import { texasDefinedBrand } from '@/brand/texasdefined';
import { LOCAL_RENT_VS_BUY_PROFILE_BY_SLUG } from '@/data/local-rent-vs-buy';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export function loadLocalRentVsBuyPageServer(slug: string) {
  const profile = LOCAL_RENT_VS_BUY_PROFILE_BY_SLUG.get(slug);
  if (!profile) return null;

  const pageUrl = absoluteUrl(texasDefinedBrand, profile.rentVsBuyPath);
  const siteUrl = absoluteUrl(texasDefinedBrand, '/');
  const movingUrl = absoluteUrl(texasDefinedBrand, '/moving-to-texas');
  const faqs = [
    { question: `Is renting or buying always cheaper in ${profile.name}?`, answer: 'No. The result depends on the specific rent, home price, financing, taxes, insurance, maintenance, transaction costs, appreciation, investment-return assumption and how long you expect to stay. This calculator is designed to make those assumptions visible and editable.' },
    { question: `Does this ${profile.name} calculator use an average rent or home price?`, answer: 'No. Enter the actual rental and purchase scenarios you are comparing. Texas Defined does not assign one citywide rent, home value or property-tax rate to every household or address.' },
    { question: 'What should I verify before making a housing decision?', answer: 'Verify the lease terms, property price, lender estimate, parcel taxing units, homeowners and flood-insurance quotes where relevant, HOA charges, expected maintenance, closing costs and how long you realistically expect to keep the home.' },
  ];

  return {
    profile,
    faqs,
    head: {
      meta: buildMeta(texasDefinedBrand, { canonicalPath: profile.rentVsBuyPath, title: profile.rentVsBuySeoTitle, description: profile.rentVsBuyDescription }),
      links: [canonicalLink(texasDefinedBrand, profile.rentVsBuyPath)],
      scripts: [jsonLd({ '@context': 'https://schema.org', '@graph': [
        { '@type': 'WebApplication', '@id': `${pageUrl}#calculator`, name: profile.rentVsBuyTitle, description: profile.rentVsBuyDescription, url: pageUrl, applicationCategory: 'FinanceApplication', operatingSystem: 'Any', isPartOf: { '@id': `${siteUrl}#website` } },
        { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Moving to Texas', item: movingUrl },
          { '@type': 'ListItem', position: 3, name: profile.name, item: pageUrl },
        ] },
        { '@type': 'FAQPage', '@id': `${pageUrl}#faq`, mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
      ] })],
    },
  };
}