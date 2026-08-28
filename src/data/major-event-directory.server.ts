import { formatDateRange } from "@/domain/utils/format";
import { majorEventIndexRecords } from "./major-event-index";
import { getMajorEventRecordServer } from "./major-event-page.server";

const supplementalMajorEventSlugs = [
  "dobie-dichos",
  "dallas-holiday-parade",
  "schulenburg-festival",
  "westfest",
  "luling-watermelon-thump",
  "national-polka-festival",
  "gillespie-county-fair",
  "north-texas-fair-rodeo",
  "austin-chronicle-hot-sauce-festival",
  "parker-county-peach-festival",
  "buc-days",
  "valero-texas-open",
  "houston-auto-show",
  "fulton-oysterfest",
  "sandhills-stock-show-rodeo",
  "sweetwater-rattlesnake-roundup",
  "granbury-founders-day-jubilee",
  "galveston-juneteenth-celebrations",
  "larry-joe-taylor-texas-music-festival",
  "san-antonio-marathon",
  "rockport-art-festival",
  "viva-el-paso",
  "texas-shakespeare-festival",
  "poteet-strawberry-festival",
  "comicpalooza",
  "tejano-conjunto-festival",
  "great-texas-balloon-race",
  "hidalgo-borderfest",
  "austin-reggae-festival",
  "texas-outdoor-musical",
  "washington-on-the-brazos-texas-independence-day",
  "great-american-scrapbook-convention",
] as const;

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
