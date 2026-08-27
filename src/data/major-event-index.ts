import type { TexasEvent, TexasRegion } from "./types";

export interface MajorEventIndexRecord {
  slug: string;
  name: string;
  city: string;
  countySlug?: string;
  countyName?: string;
  region: TexasRegion;
  category: TexasEvent["category"];
  startDate: string;
  endDate?: string;
  dateNote?: string;
  venue?: string;
  officialUrl: string;
  sourceCheckedAt: string;
}

// Client-safe occurrence metadata. Long-form guide copy stays server-only.
export const majorEventIndexRecords: MajorEventIndexRecord[] = [
  { slug: "grapefest", name: "GrapeFest", city: "Grapevine", countySlug: "tarrant", countyName: "Tarrant County", region: "prairies-lakes", category: "food", startDate: "2026-09-17", endDate: "2026-09-20", venue: "Historic Downtown Grapevine", officialUrl: "https://www.grapevinetexasusa.com/grapefest/general-information/", sourceCheckedAt: "2026-08-26" },
  { slug: "texas-renaissance-festival", name: "Texas Renaissance Festival", city: "Todd Mission", region: "prairies-lakes", category: "culture", startDate: "2026-10-10", endDate: "2026-11-29", dateNote: "Open Saturdays and Sundays during the published season, plus Thanksgiving Friday; check the official calendar before traveling.", venue: "Texas Renaissance Festival", officialUrl: "https://www.texrenfest.com/", sourceCheckedAt: "2026-08-26" },
  { slug: "texas-rose-festival", name: "Texas Rose Festival", city: "Tyler", countySlug: "smith", countyName: "Smith County", region: "piney-woods", category: "culture", startDate: "2026-10-15", endDate: "2026-10-18", venue: "Tyler", officialUrl: "https://www.texasrosefestival.org/", sourceCheckedAt: "2026-08-26" },
  { slug: "wurstfest", name: "Wurstfest", city: "New Braunfels", countySlug: "comal", countyName: "Comal County", region: "hill-country", category: "food", startDate: "2026-11-06", endDate: "2026-11-15", venue: "Wurstfest grounds", officialUrl: "https://wurstfest.com/", sourceCheckedAt: "2026-08-26" },
  { slug: "fort-worth-stock-show-rodeo", name: "Fort Worth Stock Show & Rodeo", city: "Fort Worth", countySlug: "tarrant", countyName: "Tarrant County", region: "prairies-lakes", category: "rodeo", startDate: "2027-01-15", endDate: "2027-02-06", venue: "Will Rogers Memorial Center and Dickies Arena", officialUrl: "https://www.fwssr.com/", sourceCheckedAt: "2026-08-26" },
  { slug: "san-antonio-stock-show-rodeo", name: "San Antonio Stock Show & Rodeo", city: "San Antonio", countySlug: "bexar", countyName: "Bexar County", region: "south-texas", category: "rodeo", startDate: "2027-02-11", endDate: "2027-02-28", venue: "Frost Bank Center and Freeman Coliseum grounds", officialUrl: "https://www.sarodeo.com/", sourceCheckedAt: "2026-08-26" },
  { slug: "sxsw", name: "South by Southwest (SXSW)", city: "Austin", countySlug: "travis", countyName: "Travis County", region: "hill-country", category: "culture", startDate: "2027-03-15", endDate: "2027-03-21", venue: "Downtown Austin venues", officialUrl: "https://sxsw.com/", sourceCheckedAt: "2026-08-26" },
  { slug: "texas-sandfest", name: "Texas SandFest", city: "Port Aransas", countySlug: "nueces", countyName: "Nueces County", region: "gulf-coast", category: "culture", startDate: "2027-04-16", endDate: "2027-04-18", venue: "Port Aransas beach festival grounds", officialUrl: "https://www.texassandfest.org/", sourceCheckedAt: "2026-08-26" },
];

export const verifiedMajorEventOccurrences: TexasEvent[] = majorEventIndexRecords.map((event) => ({
  id: `authority:${event.slug}`,
  brandId: "texasdefined",
  slug: event.slug,
  name: event.name,
  blurb: `Major annual event in ${event.city}. Confirm current details with the organizer before traveling.`,
  city: event.city,
  region: event.region,
  startDate: event.startDate,
  endDate: event.endDate,
  category: event.category,
  venue: event.venue,
  officialUrl: event.officialUrl,
  sourceName: "Official organizer",
  sourceCheckedAt: event.sourceCheckedAt,
}));

export const majorEventsForCounty = (countySlug: string) => majorEventIndexRecords
  .filter((event) => event.countySlug === countySlug)
  .sort((a, b) => a.startDate.localeCompare(b.startDate));
