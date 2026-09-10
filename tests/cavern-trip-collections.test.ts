import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const html = readFileSync(resolve(process.cwd(), 'public/content/explore-category-authority/caverns.html'), 'utf8');

const PUBLIC_CAVERN_SLUGS = new Set([
  'natural-bridge-caverns',
  'inner-space-cavern',
  'longhorn-cavern-state-park',
  'caverns-of-sonora',
  'cascade-caverns',
  'cave-without-a-name',
  'wonder-world-cave',
  'kickapoo-cavern-state-park',
  'gorman-cave',
  'devils-sinkhole-state-natural-area',
  'westcave-preserve',
]);

const COLLECTION_TITLES = [
  'Guided cavern experiences',
  'Caverns that pair well with a family day out',
  'Hill Country &amp; Central Texas cave country',
];

function collectionHtml(title: string) {
  const titleIndex = html.indexOf(title);
  expect(titleIndex, title).toBeGreaterThanOrEqual(0);
  const articleStart = html.lastIndexOf('<article', titleIndex);
  const articleEnd = html.indexOf('</article>', titleIndex);
  expect(articleStart, title).toBeGreaterThanOrEqual(0);
  expect(articleEnd, title).toBeGreaterThan(titleIndex);
  return html.slice(articleStart, articleEnd + '</article>'.length);
}

function destinationSlugs(fragment: string) {
  return [...fragment.matchAll(/href="\/destination\/([^"]+)"/g)].map((match) => match[1]);
}

describe('cavern trip collections', () => {
  it('renders all three collections inside the static cavern authority HTML', () => {
    expect(html).toContain('id="cavern-trip-collections-heading"');
    for (const title of COLLECTION_TITLES) expect(html).toContain(title);
  });

  it('uses only destinations in the verified public cavern catalog', () => {
    for (const title of COLLECTION_TITLES) {
      for (const slug of destinationSlugs(collectionHtml(title))) {
        expect(PUBLIC_CAVERN_SLUGS.has(slug), `${title}: ${slug}`).toBe(true);
      }
    }
  });

  it('does not repeat a destination within one collection', () => {
    for (const title of COLLECTION_TITLES) {
      const slugs = destinationSlugs(collectionHtml(title));
      expect(new Set(slugs).size, title).toBe(slugs.length);
    }
  });

  it('keeps protected-viewing destinations out of the guided-tour collection', () => {
    const slugs = destinationSlugs(collectionHtml('Guided cavern experiences'));
    expect(slugs).not.toContain('gorman-cave');
    expect(slugs).not.toContain('devils-sinkhole-state-natural-area');
  });

  it('keeps every collection substantial enough to be useful', () => {
    for (const title of COLLECTION_TITLES) {
      expect(destinationSlugs(collectionHtml(title)).length, title).toBeGreaterThanOrEqual(5);
    }
  });

  it('adds no new collection routes and links only to existing destination canonicals', () => {
    expect(html).not.toMatch(/href="\/explore\/caverns\//);
    for (const title of COLLECTION_TITLES) {
      for (const slug of destinationSlugs(collectionHtml(title))) {
        expect(html).toContain(`href="/destination/${slug}"`);
      }
    }
  });
});
