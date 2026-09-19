import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getFootballSchoolProfilePage } from '@/data/high-school-football/football-school-profile.functions';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute('/texas-high-school-football-teams/$slug')({
  loader: async ({ params }) => {
    const profile = await getFootballSchoolProfilePage(params.slug);
    if (!profile) throw notFound();
    return profile;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: 'Football school profile not found' }, { name: 'robots', content: 'noindex' }] };
    const { school, program, identity } = loaderData;
    const canonicalPath = `/texas-high-school-football-teams/${school.slug}`;
    const classification = program
      ? `${program.classification}${program.division ? ` Division ${program.division === 1 ? 'I' : 'II'}` : ''}, District ${program.district}`
      : school.governingBody !== 'Unverified'
        ? `${school.governingBody}${school.associationClassification ? ` ${school.associationClassification}` : ''}`
        : 'Texas high school football';
    const description = `${school.displayName} football profile: ${classification}, school and county context, enrollment research steps${identity ? `, ${identity.mascot} mascot` : ''}, and links for families researching a Texas high school.`;
    const url = `${siteUrl}${canonicalPath}`;

    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${school.displayName} Football: Class, District, Enrollment & School Guide`,
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${url}#page`,
            url,
            name: `${school.displayName} Football School Profile`,
            description,
            isPartOf: { '@id': `${siteUrl}/#website` },
            about: {
              '@type': 'HighSchool',
              name: program?.officialSchoolName || school.displayName,
              address: program?.city ? {
                '@type': 'PostalAddress',
                addressLocality: program.city,
                addressRegion: 'TX',
                addressCountry: 'US',
              } : undefined,
            },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumbs`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Texas Sports', item: `${siteUrl}/sports` },
              { '@type': 'ListItem', position: 3, name: 'High School Football Teams', item: `${siteUrl}/texas-high-school-football-teams` },
              { '@type': 'ListItem', position: 4, name: school.displayName, item: url },
            ],
          },
        ],
      })],
    };
  },
});
