import {
  buildPreparedTexasSocialDailyPlan,
  type TexasSocialPreparedPost,
} from "@/lib/texas-social-rotation";

export type TexasFacebookQueueSlot = "morning" | "evening" | `slot-${number}`;

export type TexasFacebookQueueItem = {
  id: string;
  date: string;
  slot: TexasFacebookQueueSlot;
  sourcePostId: string;
  category: TexasSocialPreparedPost["category"];
  message: string;
  canonicalUrl: string | null;
  idempotencyKey: string;
  status: "draft";
  canPublish: false;
};

export type TexasFacebookQueueConfig = {
  enabled: boolean;
  postsPerDay: number;
  origin: string;
};

export const DEFAULT_TEXAS_FACEBOOK_QUEUE_CONFIG: TexasFacebookQueueConfig = {
  enabled: false,
  postsPerDay: 2,
  origin: "https://texasdefined.com",
};

function normalizeDateKey(date: Date | string) {
  const value = typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)
    ? `${date}T12:00:00Z`
    : date;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) throw new Error(`Invalid date: ${String(date)}`);
  return parsed.toISOString().slice(0, 10);
}

function slotForIndex(index: number): TexasFacebookQueueSlot {
  if (index === 0) return "morning";
  if (index === 1) return "evening";
  return `slot-${index + 1}`;
}

export function buildTexasFacebookDraftQueue(
  date: Date | string,
  config: Partial<TexasFacebookQueueConfig> = {},
  excludeIds: Iterable<string> = [],
): TexasFacebookQueueItem[] {
  const resolved = { ...DEFAULT_TEXAS_FACEBOOK_QUEUE_CONFIG, ...config };
  const dateKey = normalizeDateKey(date);
  const posts = buildPreparedTexasSocialDailyPlan(
    dateKey,
    {
      count: resolved.postsPerDay,
      excludeIds,
      preferDifferentCategories: true,
      preferDifferentLinks: true,
    },
    resolved.origin,
  );

  return posts.map((post, index) => ({
    id: `facebook:${dateKey}:${post.id}`,
    date: dateKey,
    slot: slotForIndex(index),
    sourcePostId: post.id,
    category: post.category,
    message: post.message,
    canonicalUrl: post.canonicalUrl,
    idempotencyKey: `texasdefined:facebook:${dateKey}:${post.id}`,
    status: "draft",
    canPublish: false,
  }));
}

export function buildTexasFacebookDraftWeek(
  startDate: Date | string,
  config: Partial<TexasFacebookQueueConfig> = {},
) {
  const resolved = { ...DEFAULT_TEXAS_FACEBOOK_QUEUE_CONFIG, ...config };
  const startKey = normalizeDateKey(startDate);
  const start = new Date(`${startKey}T12:00:00Z`);
  const used = new Set<string>();

  return Array.from({ length: 7 }, (_, dayOffset) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + dayOffset);
    const dateKey = date.toISOString().slice(0, 10);
    const items = buildTexasFacebookDraftQueue(dateKey, resolved, used);
    items.forEach((item) => used.add(item.sourcePostId));
    return { date: dateKey, items };
  });
}

export function assertTexasFacebookPublishingDisabled(
  config: Partial<TexasFacebookQueueConfig> = {},
) {
  const resolved = { ...DEFAULT_TEXAS_FACEBOOK_QUEUE_CONFIG, ...config };
  if (resolved.enabled) {
    throw new Error(
      "TexasDefined Facebook publishing is not implemented in this module. This queue is draft-only by design.",
    );
  }
  return true;
}
