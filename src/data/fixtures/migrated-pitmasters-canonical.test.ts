import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

import {
  loadMigratedEditorialArticle,
  migratedEditorialArticleStubs,
  migratedEditorialSlugs,
} from './lazy-migrated-editorial';

const LEGACY_SLUG = 'live-2026-07-07-texas-pitmasters-to-feature-in-new-food-network-competition-series-v3wglp';
const CANONICAL_SLUG = 'texas-pitmasters-food-network-competition';

describe('migrated pitmasters canonical URL', () => {
  it('publishes only the clean slug through the lightweight article catalog', () => {
    expect(migratedEditorialSlugs).toContain(CANONICAL_SLUG);
    expect(migratedEditorialSlugs).not.toContain(LEGACY_SLUG);
    expect(migratedEditorialArticleStubs.filter((article) => article.slug === CANONICAL_SLUG)).toHaveLength(1);
  });

  it('loads the preserved migrated body through the clean canonical slug only', async () => {
    const canonical = await loadMigratedEditorialArticle('texasdefined', CANONICAL_SLUG);
    expect(canonical?.slug).toBe(CANONICAL_SLUG);
    expect(canonical?.title).toBe('Texas Pitmasters Bring Several Traditions to National Television');
    expect(canonical?.body.length).toBeGreaterThan(0);
    await expect(loadMigratedEditorialArticle('texasdefined', LEGACY_SLUG)).resolves.toBeNull();
  });

  it('keeps permanent edge redirects for both legacy URL forms', () => {
    const serverEntry = fs.readFileSync('src/server-entry.ts', 'utf8');
    expect(serverEntry).toContain(`const LEGACY_PITMASTERS_SLUG = \"${LEGACY_SLUG}\"`);
    expect(serverEntry).toContain(`const PITMASTERS_CANONICAL_PATH = \"/article/${CANONICAL_SLUG}\"`);
    expect(serverEntry).toContain('[`/article/${LEGACY_PITMASTERS_SLUG}`]: PITMASTERS_CANONICAL_PATH');
    expect(serverEntry).toContain('[`/news/${LEGACY_PITMASTERS_SLUG}`]: PITMASTERS_CANONICAL_PATH');
  });
});
