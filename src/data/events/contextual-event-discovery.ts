import { createServerFn } from "@tanstack/react-start";

import type { TexasRegion } from "../types";
import type { TexasEventRecord } from "./texas-event-record";

export interface ContextualEventDiscoveryInput {
  city?: string;
  countySlug?: string;
  region?: TexasRegion;
  start?: string;
  end?: string;
  category?: TexasEventRecord["category"];
  excludeSlug?: string;
  limit?: number;
}

function clean(value: string | undefined) {
  return value?.trim().toLocaleLowerCase("en-US") ?? "";
}

function overlapsRange(event: TexasEventRecord, start?: string, end?: string) {
  if (!start && !end) return true;
  const lower = start || end || "";
  const upper = end || start || "";
  return event.startDate <= upper && (event.endDate ?? event.startDate) >= lower;
}

export function contextualEventScore(event: TexasEventRecord, input: ContextualEventDiscoveryInput) {
  let score = 0;
  if (input.city && clean(event.city) === clean(input.city)) score += 300;
  if (input.countySlug && event.countySlug === input.countySlug) score += 200;
  if (input.region && event.region === input.region) score += 100;
  return score;
}

export function selectContextualEvents(records: readonly TexasEventRecord[], input: ContextualEventDiscoveryInput) {
  const limit = Math.max(1, Math.min(input.limit ?? 12, 24));
  return records
    .filter((event) => event.status !== "cancelled")
    .filter((event) => !input.excludeSlug || event.slug !== input.excludeSlug)
    .filter((event) => !input.category || event.category === input.category)
    .filter((event) => overlapsRange(event, input.start, input.end))
    .map((event) => ({ event, score: contextualEventScore(event, input) }))
    .filter((item) => item.score > 0)
    .sort((left, right) =>
      right.score - left.score
      || left.event.startDate.localeCompare(right.event.startDate)
      || left.event.title.localeCompare(right.event.title))
    .slice(0, limit)
    .map((item) => item.event);
}

export const getContextualEventDiscovery = createServerFn({ method: "POST" })
  .inputValidator((data: ContextualEventDiscoveryInput) => data)
  .handler(async ({ data }) => {
    const [
      { loadUpcomingTexasCalendarRecordsServer },
      { buildTexasEventCarouselItemsServer },
    ] = await Promise.all([
      import("./texas-event-records.server"),
      import("./texas-event-calendar.server"),
    ]);
    const records = loadUpcomingTexasCalendarRecordsServer();
    return buildTexasEventCarouselItemsServer(selectContextualEvents(records, data));
  });
