import bluebonnets from "@/assets/bluebonnets.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { resolveSportsVenueEventLink } from "@/data/sports-venue-event-links";
import { formatDateRange } from "@/domain/utils/format";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

import type { TexasEvent, TexasRegion } from "./types";
import { majorEventIndexRecords } from "./major-event-index";
import { formatMajorEventDateLabelServer, getMajorEventRecordServer } from "./major-event-page.server";
import { loadSupplementalMajorEventRecordsServer } from "./major-event-supplemental-registry.server";

export interface MajorEventGuideDirectoryItem {
  slug: string;
  href: string;
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

interface EventsPageRegion {
  id: string;
  name: string;
}

const priorityEventGuides: MajorEventGuideDirectoryItem[] = [
  {
    slug: "state-fair-of-texas",
    href: "/texas-state-fair",
    name: "State Fair of Texas",
    city: "Dallas",
    countyName: "Dallas County",
    region: "prairies-lakes",
    category: "seasonal",
    detail: "Dallas · Sep 25–Oct 18, 2026 · Fair Park",
    startDate: "2026-09-25",
    endDate: "2026-10-18",
    sourceCheckedAt: "2026-09-01",
  },
];

const eventTimingLinks: EventDiscoveryLink[] = [
  { href: "/events/this-weekend", title: "Events this weekend", description: "A live Friday-through-Sunday view built only from source-verified permanent event guides." },
  { href: "/events/this-month", title: "Events this month", description: "The current Texas event month, with thin periods automatically withheld from indexing." },
  { href: "/events/september-events", title: "September events", description: "Fairs, rodeos, Oktoberfests, music and fall-opening traditions across Texas." },
  { href: "/events/fall-festivals", title: "Fall festivals", description: "Verified September-through-November food, music, heritage, fair and seasonal events." },
  { href: "/events/christmas-events", title: "Christmas & holiday events", description: "Source-checked holiday parades, markets, lights and recurring seasonal traditions." },
  { href: "/events/county-fairs", title: "County fairs", description: "Texas county fairs and fairground traditions with current dates and county context." },
];

const eventTopicLinks: EventDiscoveryLink[] = [
  { href: "/events/tournaments", title: "Texas tournaments", description: "Browse 250 competition seeds across 22 sports and activity categories, with county connections where the supplied location is clear." },
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
  { href: "/events/houston-area-events", title: "Houston area", description: "Harris, Fort Bend, Montgomery and Brazoria County events grouped by actual venue and county." },
  { href: "/events/dallas-fort-worth-events", title: "Dallas-Fort Worth", description: "Dallas, Fort Worth and core DFW county events with city-level planning context." },
  { href: "/events/north-texas-events", title: "North Texas", description: "Dallas-Fort Worth, Prairies & Lakes cities and nearby fair and festival towns." },
  { href: "/events/south-texas-events", title: "South Texas", description: "San Antonio, border traditions, Valley festivals and regional rodeos." },
  { href: "/events/piney-woods-events", title: "East Texas & Piney Woods", description: "Rose, forest, music and small-town traditions across East Texas." },
  { href: "/events/big-bend-events", title: "Big Bend & Far West", description: "Remote destination events around Terlingua, Alpine, Marfa and Far West Texas." },
  { href: "/events/panhandle-events", title: "Panhandle", description: "Source-qualified High Plains and Panhandle event guides without padded listings." },
];

function texasTodayIso(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = (type: "year" | "month" | "day") => parts.find((part) => part.type === type)?.value ?? "00";
  return `${value("year")}-${value("month")}-${value("day")}`;
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
  const today = texasTodayIso();
  const prioritySlugs = new Set(priorityEventGuides.map((event) => event.slug));

  return [
    ...priorityEventGuides,
    ...events
      .filter((event) => !prioritySlugs.has(event.slug))
      .map((event) => ({
        slug: event.slug,
        href: `/event/${event.slug}`,
        name: event.name,
        city: event.city,
        countyName: event.countyName,
        region: event.region,
        category: event.category,
        detail: `${event.city} · ${formatMajorEventDateLabelServer(event)}`,
        startDate: event.startDate,
        endDate: event.endDate,
        sourceCheckedAt: event.sourceCheckedAt,
      })),
  ].sort((left, right) => {
    const leftPast = (left.endDate || left.startDate) < today;
    const rightPast = (right.endDate || right.startDate) < today;
    if (leftPast !== rightPast) return leftPast ? 1 : -1;
    return left.startDate.localeCompare(right.startDate) || left.name.localeCompare(right.name);
  });
}

export function loadMajorEventLandingDirectoryServer() {
  return {
    majorEventGuides: loadMajorEventGuideDirectoryServer(),
    eventTimingLinks,
    eventTopicLinks,
    eventRegionLinks,
  };
}

export function buildEventsPageHeadServer(events: TexasEvent[], regions: EventsPageRegion[]) {
  const description = "Rodeos, wildflower weekends, barbecue throwdowns, dance halls and county fairs — a curated calendar of what’s worth showing up for across Texas.";
  const canonicalPath = "/events";
  const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
  const pageUrl = `${siteUrl}${canonicalPath}`;
  void regions;
  const eventItems = events.slice(0, 50).map((event, index) => {
    const eventUrl = event.id.startsWith("authority:") ? `${siteUrl}/event/${event.slug}` : `${pageUrl}#${event.id}`;

    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebPage",
        "@id": eventUrl,
        url: eventUrl,
        name: event.name,
        description: event.blurb,
      },
    };
  });
  const graph = [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#page`,
      url: pageUrl,
      name: "Texas Events",
      description,
      image: {
        "@type": "ImageObject",
        url: absoluteUrl(texasDefinedBrand, bluebonnets),
        caption: "Bluebonnets running to a fence line in a Texas spring field",
        width: 1600,
        height: 1067,
      },
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": `${pageUrl}#events` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#events`,
      name: "Texas events calendar",
      url: pageUrl,
      numberOfItems: eventItems.length,
      itemListElement: eventItems,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Events", item: pageUrl },
      ],
    },
  ];
  const featured = events[0];

  return {
    head: {
      meta: buildMeta(texasDefinedBrand, {
        title: "Texas Events",
        description,
        canonicalPath,
        image: bluebonnets,
        imageAlt: "Bluebonnets running to a fence line in a Texas spring field",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: eventItems.length
        ? [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }]
        : [],
    },
    featuredVenueGuide: resolveSportsVenueEventLink(featured?.venue),
    featuredDateLabel: featured
      ? formatDateRange(featured.startDate, featured.endDate, texasDefinedBrand.identity.locale)
      : undefined,
  };
}