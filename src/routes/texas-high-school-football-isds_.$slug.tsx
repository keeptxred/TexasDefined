import { createFileRoute, notFound } from '@tanstack/react-router';

import { getFootballIsdProfilePage } from '@/data/high-school-football/football-isds.functions';

const siteUrl = 'https://texasdefined.com';

export const Route = createFileRoute('/texas-high-school-football-isds/$slug')({
  loader: async ({ params }) => {
    const profile = await getFootballIsdProfilePage(params.slug);
    if (!profile) throw notFound();
    return profile;
  },
  head: ({ loaderData }) => {
    // During streamed SSR the head can be evaluated before async loader data
    // resolves. A transient absence is NOT evidence that the URL is missing.
    // The loader's explicit notFound() handles genuinely unknown ISD slugs.
    // Do not emit a sticky noindex tag on a successfully fetched ISD profile.
    if (!loaderData) return { meta: [{ title: 'Texas high school football by ISD' }] };
    const canonicalPath = loaderData.profilePath;
    const description = `${loaderData.districtName} football research: ${loaderData.programCount} current UIL ${loaderData.programCount === 1 ? 'program' : 'programs'}, school profiles, classifications, exact UIL enrollment and relocation links.`;
    return {
      meta: [
        { title: `${loaderData.districtName} Football Programs: High Schools, UIL Classes & Enrollment` },
        { name: 'description', content: description },
      ],
      links: [{ rel: 'canonical', href: `${siteUrl}${canonicalPath}` }],
      scripts: [{
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': `${siteUrl}${canonicalPath}#page`,
              url: `${siteUrl}${canonicalPath}`,
              name: `${loaderData.districtName} football programs`,
              description,
              mainEntity: {
                '@type': 'ItemList',
                numberOfItems: loaderData.programCount,
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
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
                { '@type': 'ListItem', position: 2, name: 'High School Football', item: `${siteUrl}/texas-high-school-football-teams` },
                { '@type': 'ListItem', position: 3, name: 'Football by ISD', item: `${siteUrl}/texas-high-school-football-isds` },
                { '@type': 'ListItem', position: 4, name: loaderData.districtName, item: `${siteUrl}${canonicalPath}` },
              ],
            },
          ],
        }),
      }],
    };
  },
});
