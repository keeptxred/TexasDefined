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
    const { displayName, slug, program, identity, privateAlignment, governingBodyHint, associationClassification } = loaderData;
    const canonicalPath = `/texas-high-school-football-teams/${slug}`;
    const classification = program
      ? `${program.classification}${program.division ? ` Division ${program.division === 1 ? 'I' : 'II'}` : ''}, District ${program.district}`
      : privateAlignment
        ? `${privateAlignment.association} ${privateAlignment.divisionLabel}${privateAlignment.districtLabel ? `, ${privateAlignment.districtLabel}` : ''}`
        : governingBodyHint
          ? `${governingBodyHint}${associationClassification ? ` ${associationClassification}` : ''}`
          : 'Texas high school football';
    const description = `${displayName} football profile: ${classification}, school and county context, enrollment research steps${identity ? `, ${identity.mascot} mascot` : ''}, and links for families researching a Texas high school.`;
    const url = `${siteUrl}${canonicalPath}`;

    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${displayName} Football: Class, District, Enrollment & School Guide`,
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
            name: `${displayName} Football School Profile`,
            description,
            isPartOf: { '@id': `${siteUrl}/#website` },
            about: {
              '@type': 'HighSchool',
              name: program?.officialSchoolName || displayName,
              url: program?.webAddress ? normalizeExternalUrl(program.webAddress) : undefined,
              telephone: program?.phone || undefined,
              address: (program?.siteStreetAddress || program?.siteCity || program?.city) ? {
                '@type': 'PostalAddress',
                streetAddress: program?.siteStreetAddress || undefined,
                addressLocality: program?.siteCity || program?.city || undefined,
                addressRegion: program?.siteState || 'TX',
                postalCode: program?.siteZip || undefined,
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
              { '@type': 'ListItem', position: 4, name: displayName, item: url },
            ],
          },
        ],
      })],
    };
  },
});

function normalizeExternalUrl(value: string) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}
