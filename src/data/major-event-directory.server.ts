import { formatDateRange } from "@/domain/utils/format";
import { majorEventIndexRecords } from "./major-event-index";
import { getMajorEventRecordServer } from "./major-event-page.server";
import { supplementalMajorEventSlugs } from "./major-event-supplemental-registry.server";

export interface MajorEventGuideDirectoryItem {
  slug: string;
  name: string;
  detail: string;
  startDate: string;
  endDate?: string;
}

export function loadMajorEventGuideDirectoryServer(): MajorEventGuideDirectoryItem[] {
  const slugs = [...new Set([
    ...majorEventIndexRecords.map((event) => event.slug),
    ...supplementalMajorEventSlugs,
  ])];
  const today = new Date().toISOString().slice(0, 10);

  return slugs
    .flatMap((slug) => {
      const event = getMajorEventRecordServer(slug);
      if (!event) return [];
      return [{
        slug: event.slug,
        name: event.name,
        detail: `${event.city} · ${formatDateRange(event.startDate, event.endDate, "en-US")}`,
        startDate: event.startDate,
        endDate: event.endDate,
      }];
    })
    .sort((left, right) => {
      const leftPast = (left.endDate || left.startDate) < today;
      const rightPast = (right.endDate || right.startDate) < today;
      if (leftPast !== rightPast) return leftPast ? 1 : -1;
      return left.startDate.localeCompare(right.startDate) || left.name.localeCompare(right.name);
    });
}
