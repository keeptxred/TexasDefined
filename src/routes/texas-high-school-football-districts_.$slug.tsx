import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getFootballDistrictPage } from '@/data/high-school-football/football-districts.functions';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute('/texas-high-school-football-districts/$slug')({
  loader: async ({ params }) => {
    const district = await getFootballDistrictPage(params.slug);
    if (!district) throw notFound();
    return district;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: 'Football district not found' }, { name: 'robots', content: 'noindex' }] };
    const divisionRoman = loaderData.division ? (loaderData.division === 1 ? 'I' : 'II') : null;
    const label = divisionRoman
      ? `District ${loaderData.district}-${loaderData.classification} Division ${divisionRoman}`
      : `District ${loaderData.district}-${loaderData.classification}`;
    const canonicalPath = loaderData.profilePath;
    const url = `${siteUrl}${canonicalPath}`;
    const schools = loaderData.programs.map((program) => program.schoolName).join(', ');
    const description = `${label} Texas high school football for the 2026–28 UIL alignment. See all ${loaderData.programCount} teams, school pages, scores and schedule resources, playoff context and official UIL data. Teams: ${schools}.`;

    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${label} Football | Teams, Scores & UIL Guide`,
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': `${url}#page`,
            url,
            name: `${label} Football`,
            description,
            numberOfItems: loaderData.programCount,
            isPartOf: { '@id': `${siteUrl}/#website` },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: loaderData.programs.map((program, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: program.schoolName,
                url: `${siteUrl}${program.profilePath}`,
              })),
            },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumbs`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Texas Sports', item: `${siteUrl}/sports` },
              { '@type': 'ListItem', position: 3, name: 'High School Football Districts', item: `${siteUrl}/texas-high-school-football-districts` },
              { '@type': 'ListItem', position: 4, name: `${label} Football`, item: url },
            ],
          },
        ],
      })],
    };
  },
});
