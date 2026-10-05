import { createFileRoute, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getFootballProgramProfilePage } from '@/data/high-school-football/football-program-profile.functions';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute('/texas-high-school-football-teams/$slug')({
  loader: async ({ params }) => {
    const profile = await getFootballProgramProfilePage(params.slug);
    if (!profile) throw notFound();
    return profile;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: 'Football school profile not found' }, { name: 'robots', content: 'noindex' }] };
    const { displayName, slug, program, identity, privateAlignment, governingBodyHint, associationClassification, faq } = loaderData;
    const canonicalPath = `/texas-high-school-football-teams/${slug}`;
    const classification = program
      ? `${program.classification}${program.division ? ` Division ${program.division === 1 ? 'I' : 'II'}` : ''}, District ${program.district}`
      : privateAlignment
        ? `${privateAlignment.association} ${privateAlignment.divisionLabel}${privateAlignment.districtLabel ? `, ${privateAlignment.districtLabel}` : ''}`
        : governingBodyHint
          ? `${governingBodyHint}${associationClassification ? ` ${associationClassification}` : ''}`
          : 'Texas high school football';
    const seoName = program?.schoolName || displayName;
    const teamName = identity?.mascot ? `${seoName} ${identity.mascot}` : seoName;
    const enrollment = program?.uilEnrollment ? `, UIL enrollment ${program.uilEnrollment.toLocaleString('en-US')}` : '';
    const description = `${teamName} football: ${classification}${enrollment}. See 2026 district opponents, verified school and venue links where available, UIL history, scores and schedule sources.`;
    const url = `${siteUrl}${canonicalPath}`;
    const sportsTeamName = identity?.mascot ? `${seoName} ${identity.mascot}` : `${seoName} Football`;

    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${teamName} Football: 2026 District, Schedule & Team Guide`,
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
            name: `${teamName} Football Profile`,
            description,
            isPartOf: { '@id': `${siteUrl}/#website` },
            about: {
              '@type': 'HighSchool',
              name: program?.officialSchoolName || displayName,
              address: program?.city ? {
                '@type': 'PostalAddress',
                addressLocality: program.city,
                addressRegion: 'TX',
                addressCountry: 'US',
              } : undefined,
            },
          },
          {
            '@type': 'SportsTeam',
            '@id': `${url}#football-team`,
            name: sportsTeamName,
            sport: 'American football',
            memberOf: {
              '@type': 'HighSchool',
              name: program?.officialSchoolName || displayName,
            },
            location: program?.city ? {
              '@type': 'Place',
              name: [program.city, program.countyName].filter(Boolean).join(', '),
              address: {
                '@type': 'PostalAddress',
                addressLocality: program.city,
                addressRegion: 'TX',
                addressCountry: 'US',
              },
            } : undefined,
            description: `${sportsTeamName} competes in ${classification}.`,
          },
          ...(faq.length ? [{
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: faq.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }] : []),
          {
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumbs`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Texas Sports', item: `${siteUrl}/sports` },
              { '@type': 'ListItem', position: 3, name: 'High School Football Teams', item: `${siteUrl}/texas-high-school-football-teams` },
              { '@type': 'ListItem', position: 4, name: displayName, item: url },
            ],
          },
        ],
      })],
    };
  },
});
