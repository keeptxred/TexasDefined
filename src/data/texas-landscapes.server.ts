import { texasDefinedBrand } from '@/brand/texasdefined';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

import { isTexasLandscapeIndexReady } from './explore-leaf-quality';
import { texasLandscapeCatalog, texasLandscapeGuideCatalog } from './texas-landscape-catalog';
import { enrichedTexasLandscapeGuides } from './texas-landscape-guide-enrichment';
import { texasLandscapes } from './texas-landscapes';

const hubDescription = 'A field guide to the landscapes that define Texas: Hill Country limestone, Piney Woods forest, Gulf marshes, prairie, canyon, desert, mountain, river and more.';
const hubPath = '/explore/landscapes';

function buildHubHead() {
  const indexableLandscapes = texasLandscapeCatalog.filter((catalogItem) => {
    const item = texasLandscapes.find((entry) => entry.slug === catalogItem.slug);
    return Boolean(item && isTexasLandscapeIndexReady(item));
  });

  return {
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: hubPath,
      title: 'Texas Landscapes: The Complete Guide',
      description: hubDescription,
    }),
    links: [canonicalLink(texasDefinedBrand, hubPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${absoluteUrl(texasDefinedBrand, hubPath)}#page`,
          url: absoluteUrl(texasDefinedBrand, hubPath),
          name: 'Texas Landscapes: The Complete Guide',
          description: hubDescription,
          isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
          mainEntity: { '@id': `${absoluteUrl(texasDefinedBrand, hubPath)}#landscapes` },
        },
        {
          '@type': 'ItemList',
          '@id': `${absoluteUrl(texasDefinedBrand, hubPath)}#landscapes`,
          name: 'Landscapes of Texas',
          numberOfItems: indexableLandscapes.length,
          itemListElement: indexableLandscapes.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'WebPage',
              name: item.name,
              description: item.dek,
              url: absoluteUrl(texasDefinedBrand, `/explore/landscapes/${item.slug}`),
            },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${absoluteUrl(texasDefinedBrand, hubPath)}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
            { '@type': 'ListItem', position: 2, name: 'Explore Texas', item: absoluteUrl(texasDefinedBrand, '/explore') },
            { '@type': 'ListItem', position: 3, name: 'Texas Landscapes', item: absoluteUrl(texasDefinedBrand, hubPath) },
          ],
        },
      ],
    })],
  };
}

function buildLandscapePageHead(item: (typeof texasLandscapes)[number] | (typeof enrichedTexasLandscapeGuides)[number]) {
  const path = `/explore/landscapes/${item.slug}`;
  const isLandscape = 'name' in item;
  const title = isLandscape ? `${item.name}: Texas Landscape Guide` : item.title;
  const description = item.dek;
  const readyForIndexing = isTexasLandscapeIndexReady(item);

  return {
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: path,
      title,
      description,
      robots: readyForIndexing ? undefined : 'noindex, follow',
    }),
    links: [canonicalLink(texasDefinedBrand, path)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${absoluteUrl(texasDefinedBrand, path)}#article`,
          url: absoluteUrl(texasDefinedBrand, path),
          headline: title,
          description,
          isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
          about: isLandscape
            ? [item.terrain, item.geology, item.vegetation, item.water]
            : item.sections.map((section) => section.heading),
          citation: isLandscape ? undefined : item.sourceLinks.map((source) => source.href),
          mainEntityOfPage: absoluteUrl(texasDefinedBrand, path),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${absoluteUrl(texasDefinedBrand, path)}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
            { '@type': 'ListItem', position: 2, name: 'Explore Texas', item: absoluteUrl(texasDefinedBrand, '/explore') },
            { '@type': 'ListItem', position: 3, name: 'Texas Landscapes', item: absoluteUrl(texasDefinedBrand, hubPath) },
            { '@type': 'ListItem', position: 4, name: isLandscape ? item.name : item.title, item: absoluteUrl(texasDefinedBrand, path) },
          ],
        },
      ],
    })],
  };
}

export function loadTexasLandscapeHubServer() {
  return {
    landscapes: texasLandscapeCatalog,
    guides: texasLandscapeGuideCatalog,
    head: buildHubHead(),
  };
}

export function loadTexasLandscapePageServer(slug: string) {
  const item = texasLandscapes.find((entry) => entry.slug === slug)
    ?? enrichedTexasLandscapeGuides.find((entry) => entry.slug === slug)
    ?? null;

  if (!item) return null;

  return {
    item,
    nearby: 'name' in item
      ? texasLandscapeCatalog
        .filter((landscape) => landscape.slug !== item.slug)
        .slice(0, 6)
        .map(({ slug: nearbySlug, name, dek }) => ({ slug: nearbySlug, name, dek }))
      : [],
    head: buildLandscapePageHead(item),
  };
}
