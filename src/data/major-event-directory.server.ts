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

interface EventDiscoveryLink {
  href: string;
  title: string;
  description: string;
}

const eventTopicLinks: EventDiscoveryLink[] = [
  { href: "/events/rodeos", title: "Rodeos & western events", description: "Stock shows, county fairs and rodeo weekends with permanent sourced planning guides." },
  { href: "/events/food-festivals", title: "Food festivals", description: "Barbecue, chili, Oktoberfest, harvest, beer, wine and local food traditions." },
  { href: "/events/music-festivals", title: "Music festivals", description: "Texas country, folk, jazz, blues and other major live-music gatherings." },
  { href: "/events/arts-culture", title: "Arts & culture", description: "Art, film, books, heritage festivals, parades and community traditions." },
  { href: "/events/seasonal-events", title: "Seasonal & holiday events", description: "Wildflowers, holiday parades, fall traditions and other seasonal anchors." },
  { href: "/events/sports-events", title: "Sports events", description: "Races, tournaments and major competition weekends across Texas." },
];

const eventRegionLinks: EventDiscoveryLink[] = [
  { href: "/events/hill-country-events", title: "Hill Country", description: "Austin, New Braunfels, Fredericksburg, Kerrville and the surrounding region." },
  { href: "/events/gulf-coast-events", title: "Gulf Coast", description: "Houston, Galveston, the Coastal Bend and island event weekends." },
  { href: "/events/north-texas-events", title: "North Texas", description: "Dallas-Fort Worth, Prairies & Lakes cities and nearby fair and festival towns." },
  { href: "/events/south-texas-events", title: "South Texas", description: "San Antonio, border traditions, Valley festivals and regional rodeos." },
  { href: "/events/piney-woods-events", title: "East Texas & Piney Woods", description: "Rose, forest, music and small-town traditions across East Texas." },
  { href: "/events/big-bend-events", title: "Big Bend & Far West", description: "Remote destination events around Terlingua, Alpine, Marfa and Far West Texas." },
  { href: "/events/panhandle-events", title: "Panhandle", description: "Source-qualified High Plains and Panhandle event guides without padded listings." },
];

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

export function loadMajorEventLandingDirectoryServer() {
  return {
    majorEventGuides: loadMajorEventGuideDirectoryServer(),
    eventTopicLinks,
    eventRegionLinks,
  };
}
