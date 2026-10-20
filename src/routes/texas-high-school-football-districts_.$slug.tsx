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
    const katyPilot = loaderData.slug === '6a-district-22';
    const district5Pilot = loaderData.slug === '6a-district-5';
    const district21Pilot = loaderData.slug === '6a-district-21';
    const canonicalPath = loaderData.profilePath;
    const url = `${siteUrl}${canonicalPath}`;
    const description = katyPilot
      ? 'Katy ISD District 22-6A football: 2026 varsity matchups, source-checked reported final scores, upcoming fixtures, nine UIL teams and playoff rules. Scores are not live standings.'
      : district5Pilot
        ? 'District 5-6A 2026 football scores, 16 verified district finals through Oct. 16, remaining schedule, source-derived records, all eight UIL schools and 6A playoff rules.'
        : district21Pilot
          ? 'District 21-6A football 2026: Ridge Point, Hightower, Travis and five other schools. Reported district standings, all 16 results, next 12 fixtures, tickets and 6A playoff rules.'
        : `${label}: ${loaderData.programCount} teams in the 2026–28 UIL alignment, with sourced district game coverage where available, school pages, playoff context and official UIL links.`;

    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: katyPilot ? 'Katy ISD District 22-6A Football: 2026 Scores & Schedule' : district5Pilot ? 'District 5-6A Football: 2026 Scores, Records & Schedule' : district21Pilot ? 'District 21-6A Football: 2026 Scores, Standings & Schedule' : `${label} Football | Teams & UIL Guide`,
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
            name: katyPilot ? `Katy ISD ${label} Football` : `${label} Football`,
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
