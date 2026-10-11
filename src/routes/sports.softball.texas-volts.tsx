import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/sports/softball/texas-volts';
const title = 'Texas Volts Softball: Round Rock AUSL Team, Dell Diamond & Cat Osterman';
const description = 'Texas Volts professional softball team: AUSL, Dell Diamond, Cat Osterman, Ricci Woodard and Round Rock history.';
const url = 'https://texasdefined.com' + canonicalPath;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title: title, description, canonicalPath }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Article', '@id': url + '#page', name: title, headline: title, description, url, dateModified: '2026-10-11',
          author: { '@type': 'Organization', name: 'TexasDefined Editorial' },
          publisher: { '@type': 'Organization', name: 'TexasDefined', url: 'https://texasdefined.com' }, },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'TexasDefined', item: 'https://texasdefined.com/' },
          { '@type': 'ListItem', position: 2, name: 'Texas Sports', item: 'https://texasdefined.com/sports' },
          { '@type': 'ListItem', position: 3, name: 'Texas Softball', item: 'https://texasdefined.com/sports/softball' },
          { '@type': 'ListItem', position: 4, name: 'Texas Volts', item: url },
        ] },
      ],
    }) }],
  }),
});
