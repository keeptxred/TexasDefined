import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/sports/softball';
const title = 'Texas Women’s Softball: Teams, 2026 Champions, Colleges & UIL Guide';
const description = 'Research-backed guide to Texas women’s softball: UIL champions, NCAA and junior-college programs, professional Texas Volts, official schedules and history.';
const url = 'https://texasdefined.com' + canonicalPath;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title: title, description, canonicalPath }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'CollectionPage', '@id': url + '#page', name: title, headline: title, description, url, dateModified: '2026-10-11',
           },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'TexasDefined', item: 'https://texasdefined.com/' },
          { '@type': 'ListItem', position: 2, name: 'Texas Sports', item: 'https://texasdefined.com/sports' },
          { '@type': 'ListItem', position: 3, name: 'Texas Softball', item: 'https://texasdefined.com/sports/softball' },
          
        ] },
      ],
    }) }],
  }),
});
