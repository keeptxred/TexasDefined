/**
 * Keep the prominent homepage hero editorially selected, then diversify the
 * remaining slots using articles already published and discovery-ready.
 * This never changes article facts, rankings, dates, or indexing eligibility.
 */
type EditorialCandidate = { id: string; category: string };

function diversify<T extends EditorialCandidate>(
  candidates: readonly T[],
  excluded: ReadonlySet<string>,
  reservedCategories: ReadonlySet<string>,
  limit: number,
): T[] {
  const chosen: T[] = [];
  const usedIds = new Set(excluded);
  const usedCategories = new Set(reservedCategories);
  const pool = candidates.filter((article) => !usedIds.has(article.id));
  for (const article of pool) {
    if (chosen.length >= limit) break;
    if (usedIds.has(article.id) || usedCategories.has(article.category)) continue;
    chosen.push(article);
    usedIds.add(article.id);
    usedCategories.add(article.category);
  }
  for (const article of pool) {
    if (chosen.length >= limit) break;
    if (usedIds.has(article.id)) continue;
    chosen.push(article);
    usedIds.add(article.id);
  }
  return chosen;
}

export function selectHomepageEditorPicks<T extends EditorialCandidate>(
  featured: readonly T[],
  latest: readonly T[],
  limit = 3,
): T[] {
  const hero = featured[0];
  return diversify(
    [...featured.slice(1), ...latest],
    new Set(hero ? [hero.id] : []),
    new Set(hero ? [hero.category] : []),
    Math.max(0, limit),
  );
}

export function selectHomepageMoreStories<T extends EditorialCandidate>(
  latest: readonly T[],
  featured: readonly T[],
  editorPicks: readonly T[],
  limit = 4,
): T[] {
  const displayedIds = new Set([...featured.slice(0, 1), ...editorPicks].map((article) => article.id));
  return diversify(latest, displayedIds, new Set(), Math.max(0, limit));
}
