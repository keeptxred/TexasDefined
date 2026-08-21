import {
  texasSocialEvergreenPosts,
  type TexasSocialEvergreenCategory,
  type TexasSocialEvergreenPost,
} from "@/data/texas-social-evergreen";
import { texasSocialEvergreenBatch2 } from "@/data/texas-social-evergreen-batch2";

export const texasSocialEvergreenPool: TexasSocialEvergreenPost[] = [
  ...texasSocialEvergreenPosts,
  ...texasSocialEvergreenBatch2,
];

export type TexasSocialDailyPlanOptions = {
  count?: number;
  excludeIds?: Iterable<string>;
  category?: TexasSocialEvergreenCategory;
  preferDifferentCategories?: boolean;
  preferDifferentLinks?: boolean;
};

function hashString(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function normalizeDateKey(date: Date | string) {
  if (typeof date === "string") {
    const parsed = /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T12:00:00Z` : date;
    const d = new Date(parsed);
    if (Number.isNaN(d.getTime())) throw new Error(`Invalid date: ${date}`);
    return d.toISOString().slice(0, 10);
  }
  if (Number.isNaN(date.getTime())) throw new Error("Invalid date");
  return date.toISOString().slice(0, 10);
}

function rotate<T>(items: T[], offset: number) {
  if (!items.length) return items;
  const start = offset % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}

export function getTexasSocialEvergreenPool(category?: TexasSocialEvergreenCategory) {
  return category ? texasSocialEvergreenPool.filter((post) => post.category === category) : texasSocialEvergreenPool;
}

export function getTexasSocialPostById(id: string) {
  return texasSocialEvergreenPool.find((post) => post.id === id) ?? null;
}

export function buildTexasSocialDailyPlan(
  date: Date | string,
  options: TexasSocialDailyPlanOptions = {},
): TexasSocialEvergreenPost[] {
  const {
    count = 2,
    excludeIds = [],
    category,
    preferDifferentCategories = true,
    preferDifferentLinks = true,
  } = options;

  if (count <= 0) return [];

  const excluded = new Set(excludeIds);
  const dateKey = normalizeDateKey(date);
  const candidates = getTexasSocialEvergreenPool(category).filter((post) => !excluded.has(post.id));
  if (!candidates.length) return [];

  const ordered = rotate(candidates, hashString(`texasdefined-social:${dateKey}`));
  const selected: TexasSocialEvergreenPost[] = [];
  const usedCategories = new Set<TexasSocialEvergreenCategory>();
  const usedLinks = new Set<string>();

  const score = (post: TexasSocialEvergreenPost) => {
    let value = 0;
    if (preferDifferentCategories && usedCategories.has(post.category)) value += 4;
    if (preferDifferentLinks && post.link && usedLinks.has(post.link)) value += 2;
    return value;
  };

  while (selected.length < count && selected.length < ordered.length) {
    let bestIndex = -1;
    let bestScore = Number.POSITIVE_INFINITY;

    for (let i = 0; i < ordered.length; i += 1) {
      const candidate = ordered[i];
      if (selected.some((post) => post.id === candidate.id)) continue;
      const candidateScore = score(candidate);
      if (candidateScore < bestScore) {
        bestScore = candidateScore;
        bestIndex = i;
        if (candidateScore === 0) break;
      }
    }

    if (bestIndex < 0) break;
    const chosen = ordered[bestIndex];
    selected.push(chosen);
    usedCategories.add(chosen.category);
    if (chosen.link) usedLinks.add(chosen.link);
  }

  return selected;
}

export function buildTexasSocialWeekPlan(startDate: Date | string, postsPerDay = 2) {
  const startKey = normalizeDateKey(startDate);
  const start = new Date(`${startKey}T12:00:00Z`);
  const used = new Set<string>();

  return Array.from({ length: 7 }, (_, dayOffset) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + dayOffset);
    const dateKey = date.toISOString().slice(0, 10);
    const posts = buildTexasSocialDailyPlan(dateKey, {
      count: postsPerDay,
      excludeIds: used,
      preferDifferentCategories: true,
      preferDifferentLinks: true,
    });
    posts.forEach((post) => used.add(post.id));
    return { date: dateKey, posts };
  });
}
