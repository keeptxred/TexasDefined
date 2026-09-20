import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getFootballChampionshipHistoryPage } from '@/data/high-school-football/football-championship-history.functions';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-high-school-football-championship-history';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute(canonicalPath)({
  loader: () => getFootballChampionshipHistoryPage(),
  head: ({ loaderData }) => {
    const description = 'Browse all-time UIL state-title and state-final history for current Texas high school football programs, with 2026–28 classification context and direct school-profile links.';
    const url = `${siteUrl}${canonicalPath}`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: 'Texas High School Football State Championships: All-Time UIL History',
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: loaderData ? [jsonLd({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        url,
        name: 'Texas High School Football State Championships: All-Time UIL History',
        description,
        numberOfItems: loaderData.finalAppearingPrograms,
        isPartOf: { '@id': `${siteUrl}/#website` },
      })] : [],
    };
  },
});
