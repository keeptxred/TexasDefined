import { texasDefinedBrand } from '@/brand/texasdefined';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

import { isTexasLandscapeIndexReady } from './explore-leaf-quality';
import { texasLandscapeCatalog, texasLandscapeGuideCatalog } from './texas-landscape-catalog';
import { enrichedTexasLandscapeGuides } from './texas-landscape-guide-enrichment';
import { enrichedTexasLandscapeProfiles } from './texas-landscape-profile-enrichment';

const hubDescription = 'A field guide to the landscapes that define Texas: Hill Country limestone, Piney Woods forest, Gulf marshes, prairie, canyon, desert, mountain, river and more.';
const hubPath = '/explore/landscapes';

function buildHubHead() {
  const indexableLandscapes = texasLandscapeCatalog.filter((catalogItem) => {
    const item = enrichedTexasLandscapeProfiles.find((entry) => entry.slug === catalogItem.slug);
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

function buildLandscapePageHead(item: (typeof enrichedTexasLandscapeProfiles)[number] | (typeof enrichedTexasLandscapeGuides)[number]) {
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
          citation: item.sourceLinks.map((source) => source.href),
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

function balancedLandscapePeers(slug: string, limit = 6) {
  const currentIndex = texasLandscapeCatalog.findIndex((item) => item.slug === slug);
  if (currentIndex < 0 || texasLandscapeCatalog.length <= 1) return [];

  return Array.from({ length: Math.min(limit, texasLandscapeCatalog.length - 1) }, (_, offset) => {
    const peerIndex = (currentIndex + offset + 1) % texasLandscapeCatalog.length;
    const peer = texasLandscapeCatalog[peerIndex];
    return { slug: peer.slug, name: peer.name, dek: peer.dek };
  });
}

export function loadTexasLandscapeHubServer() {
  return {
    landscapes: texasLandscapeCatalog,
    guides: texasLandscapeGuideCatalog,
    head: buildHubHead(),
  };
}

export function loadTexasLandscapePageServer(slug: string) {
  const item = enrichedTexasLandscapeProfiles.find((entry) => entry.slug === slug)
    ?? enrichedTexasLandscapeGuides.find((entry) => entry.slug === slug)
    ?? null;

  if (!item) return null;

  return {
    item,
    nearby: 'name' in item ? balancedLandscapePeers(item.slug) : [],
    head: buildLandscapePageHead(item),
  };
}
