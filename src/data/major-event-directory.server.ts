import type { TexasEvent, TexasRegion } from "./types";
import { majorEventIndexRecords } from "./major-event-index";
import { formatMajorEventDateLabelServer, getMajorEventRecordServer } from "./major-event-page.server";
import { loadSupplementalMajorEventRecordsServer } from "./major-event-supplemental-registry.server";

export interface MajorEventGuideDirectoryItem {
  slug: string;
  name: string;
  city: string;
  countyName?: string;
  region: TexasRegion;
  category: TexasEvent["category"];
  detail: string;
  startDate: string;
  endDate?: string;
  sourceCheckedAt?: string;
}

export function loadMajorEventGuideDirectoryServer(): MajorEventGuideDirectoryItem[] {
  const coreSlugs = new Set(majorEventIndexRecords.map((event) => event.slug));
  const coreEvents = majorEventIndexRecords.map(({ slug }) => {
    const event = getMajorEventRecordServer(slug);
    if (!event) throw new Error(`Indexed major-event entry does not resolve: ${slug}`);
    return event;
  });
  const events = [
    ...coreEvents,
    ...loadSupplementalMajorEventRecordsServer().filter((event) => !coreSlugs.has(event.slug)),
  ];
  const today = new Date().toISOString().slice(0, 10);

  return events
    .map((event) => ({
      slug: event.slug,
      name: event.name,
      city: event.city,
      countyName: event.countyName,
      region: event.region,
      category: event.category,
      detail: `${event.city} · ${formatMajorEventDateLabelServer(event)}`,
      startDate: event.startDate,
      endDate: event.endDate,
      sourceCheckedAt: event.sourceCheckedAt,
    }))
    .sort((left, right) => {
      const leftPast = (left.endDate || left.startDate) < today;
      const rightPast = (right.endDate || right.startDate) < today;
      if (leftPast !== rightPast) return leftPast ? 1 : -1;
      return left.startDate.localeCompare(right.startDate) || left.name.localeCompare(right.name);
    });
}
