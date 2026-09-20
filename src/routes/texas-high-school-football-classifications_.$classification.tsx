import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getFootballClassificationPage } from '@/data/high-school-football/football-classifications.functions';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute('/texas-high-school-football-classifications/$classification')({
  loader: async ({ params }) => {
    const profile = await getFootballClassificationPage(params.classification);
    if (!profile) throw notFound();
    return profile;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const canonicalPath = loaderData.profilePath;
    const description = `Browse all ${loaderData.programCount} current UIL ${loaderData.classification} Texas high school football programs for 2026–28, with enrollment range, districts and direct school-profile links.`;
    const url = `${siteUrl}${canonicalPath}`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${loaderData.classification} Texas High School Football: Teams & Districts`,
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        url,
        name: `${loaderData.classification} Texas High School Football`,
        description,
        numberOfItems: loaderData.programCount,
        isPartOf: { '@id': `${siteUrl}/#website` },
      })],
    };
  },
});
