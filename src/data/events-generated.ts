import { events as curatedTexasEvents } from "./fixtures/texas";
import { generatedTexasEvents } from "./generated/texas-events";
import type { TexasEvent, TexasRegion } from "./types";

interface GeneratedEventRow {
  id: string;
  slug: string;
  name: string;
  blurb: string;
  city: string;
  region: string;
  startDate: string;
  endDate?: string;
  category: string;
  venue?: string;
  officialUrl?: string;
  sourceName?: string;
  sourceCheckedAt?: string;
  confidenceScore: number;
  editorialScore: number;
  status: string;
}

function region(value: string): TexasRegion {
  if (value === "hill-country" || value === "gulf-coast" || value === "big-bend" || value === "panhandle" || value === "piney-woods" || value === "prairies-lakes" || value === "south-texas") return value;
  return "prairies-lakes";
}

function category(value: string): TexasEvent["category"] {
  if (value === "music" || value === "food" || value === "rodeo" || value === "seasonal" || value === "sport" || value === "culture") return value;
  return "seasonal";
}

function generatedRows(): TexasEvent[] {
  const rows = generatedTexasEvents as readonly GeneratedEventRow[];
  return rows
    .filter((row) => row.status === "published")
    .map((row) => ({
      id: row.id,
      brandId: "texasdefined",
      slug: row.slug,
      name: row.name,
      blurb: row.blurb,
      city: row.city,
      region: region(row.region),
      startDate: row.startDate,
      endDate: row.endDate,
      category: category(row.category),
      venue: row.venue,
      officialUrl: row.officialUrl,
      sourceName: row.sourceName,
      sourceCheckedAt: row.sourceCheckedAt,
    }));
}

function eventIdentityKey(event: Pick<TexasEvent, "name" | "city">): string {
  return `${event.name.trim().toLowerCase()}:${event.city.trim().toLowerCase()}`;
}

export function getGeneratedTexasEvents(limit = 24): TexasEvent[] {
  const today = new Date().toISOString().slice(0, 10);
  const merged = new Map<string, TexasEvent>();
  const sourceControlledIdentities = new Set(
    (generatedTexasEvents as readonly GeneratedEventRow[]).map((row) => eventIdentityKey(row)),
  );

  for (const event of curatedTexasEvents) {
    if ((event.endDate || event.startDate) < today) continue;
    // Once an identity is source-controlled, never resurrect an older curated occurrence
    // merely because the generated row is temporarily unpublished, canceled, or rescheduled.
    if (sourceControlledIdentities.has(eventIdentityKey(event))) continue;
    merged.set(eventIdentityKey(event), event);
  }

  // Generated rows are refreshed from source-controlled event sync output and intentionally
  // own a matching fixture identity even when an older fixture carries stale dates.
  for (const event of generatedRows()) {
    if ((event.endDate || event.startDate) < today) continue;
    merged.set(eventIdentityKey(event), event);
  }

  return [...merged.values()]
    .sort((left, right) => left.startDate.localeCompare(right.startDate) || left.name.localeCompare(right.name))
    .slice(0, Math.max(1, limit));
}
