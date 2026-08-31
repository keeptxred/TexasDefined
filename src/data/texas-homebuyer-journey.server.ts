import { texasDefinedBrand } from '@/brand/texasdefined';
import {
  TEXAS_HOMEBUYER_DESCRIPTION,
  TEXAS_HOMEBUYER_FAQS,
  TEXAS_HOMEBUYER_PATH,
  TEXAS_HOMEBUYER_STEPS,
  TEXAS_HOMEBUYER_TITLE,
} from '@/data/texas-homebuyer-journey';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export function loadTexasHomebuyerJourneyServer() {
  const pageUrl = absoluteUrl(texasDefinedBrand, TEXAS_HOMEBUYER_PATH);
  const siteUrl = absoluteUrl(texasDefinedBrand, '/');
  return {
    head: {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: TEXAS_HOMEBUYER_PATH,
        title: TEXAS_HOMEBUYER_TITLE,
        description: TEXAS_HOMEBUYER_DESCRIPTION,
      }),
      links: [canonicalLink(texasDefinedBrand, TEXAS_HOMEBUYER_PATH)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'HowTo',
            '@id': `${pageUrl}#howto`,
            name: 'How to plan a Texas home purchase',
            description: TEXAS_HOMEBUYER_DESCRIPTION,
            url: pageUrl,
            isPartOf: { '@id': `${siteUrl}#website` },
            step: TEXAS_HOMEBUYER_STEPS.map(([name, text], index) => ({ '@type': 'HowToStep', position: index + 1, name, text, url: `${pageUrl}#step-${index + 1}` })),
          },
          {
            '@type': 'FAQPage',
            '@id': `${pageUrl}#faq`,
            mainEntity: TEXAS_HOMEBUYER_FAQS.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
              { '@type': 'ListItem', position: 2, name: 'Property', item: absoluteUrl(texasDefinedBrand, '/property') },
              { '@type': 'ListItem', position: 3, name: 'Buying a Home in Texas', item: pageUrl },
            ],
          },
        ],
      })],
    },
  };
}
