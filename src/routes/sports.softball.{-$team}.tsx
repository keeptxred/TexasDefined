import { createFileRoute, notFound } from '@tanstack/react-router';
import { getPublishedSoftballTeamPage } from '@/data/softball/softball-published-team.functions';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';
const base = '/sports/softball';
const siteUrl = 'https://texasdefined.com';
const teamNames = {
  'paris-junior-college': 'Paris Junior College Lady Dragons',
  'texas-volts': 'Texas Volts',
  'schools': '2026–27 UIL Softball Schools and Districts',
} as const;

export const Route = createFileRoute('/sports/softball/{-$team}')({
  beforeLoad: ({ params }) => {
    if (params.team && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(params.team)) throw notFound();
  },
  loader: async ({ params }) => {
    if (!params.team || params.team in teamNames) return null;
    const approved = await getPublishedSoftballTeamPage(params.team);
    if (!approved) throw notFound();
    return approved;
  },
  head: ({ params, loaderData }) => {
    const team = params.team;
    const canonicalPath = base + (team ? '/' + team : '');
    if (loaderData) {
      const profile = loaderData;
      const i = profile.identity;
      const url = siteUrl + canonicalPath;
      const seoDescription = profile.uniqueThesis.replace(/\s+/g, ' ').trim().slice(0, 160);
      return {
        meta: buildMeta(texasDefinedBrand, {
          canonicalPath,
          title: profile.title,
          description: seoDescription,
        }),
        links: [canonicalLink(texasDefinedBrand, canonicalPath)],
        scripts: [jsonLd({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': url + '#webpage',
              url,
              name: profile.title,
              description: seoDescription,
              dateModified: profile.reviewedAt,
              isPartOf: { '@id': siteUrl + '/#website' },
            },
            {
              '@type': 'SportsTeam',
              '@id': url + '#softball-team',
              name: i.softballTeamName,
              sport: 'Softball',
              memberOf: {
                '@type': 'HighSchool',
                name: i.uilName,
                url: i.schoolOfficialUrl,
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: i.city,
                  addressRegion: 'TX',
                  addressCountry: 'US',
                },
              },
            },
            {
              '@type': 'Article',
              '@id': url + '#article',
              headline: profile.title,
              mainEntityOfPage: url,
              dateModified: profile.reviewedAt,
              author: { '@type': 'Organization', name: profile.editor },
              publisher: { '@type': 'Organization', name: 'TexasDefined', url: siteUrl },
              about: { '@id': url + '#softball-team' },
              citation: profile.sources.map(source => source.url),
              image: profile.media.map(asset => siteUrl + asset.path),
            },
          ],
        })],
      };
    }
    return {
      meta: [
        { title: team === 'paris-junior-college'
          ? 'Paris Junior College Lady Dragons Softball: History and Jack Butler'
          : team === 'schools'
            ? 'Texas UIL Softball Schools and Districts: Complete 2026–27 Directory'
          : team === 'texas-volts'
            ? 'Texas Volts: Round Rock Professional Softball'
            : 'Texas Women’s Softball: Teams, Champions and College Guide' },
        { name: 'description', content: team === 'paris-junior-college'
          ? 'PJC Lady Dragons: NJCAA postseason history, 2025 NFCA regional award, and Mr. Jack Butler.'
          : team === 'schools'
            ? 'Search all 1,192 official UIL softball alignment listings, 160 districts and five conference documents, with free source-linked CSV.'
          : team === 'texas-volts'
            ? 'Texas Volts softball, Dell Diamond, Round Rock, AUSL and Cat Osterman.'
            : 'Texas UIL softball champions, NCAA and NJCAA college teams, professional leagues and official records.' },
      ],
      links: [{ rel: 'canonical', href: 'https://texasdefined.com' + canonicalPath }],
    };
  },
});
