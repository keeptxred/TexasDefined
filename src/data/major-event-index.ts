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

type MajorEventRow = readonly [
  slug: string,
  name: string,
  city: string,
  countySlug: string | undefined,
  countyName: string | undefined,
  region: TexasRegion,
  category: TexasEvent["category"],
  startDate: string,
  endDate: string | undefined,
  dateNote: string | undefined,
  venue: string | undefined,
  officialUrl: string,
  sourceCheckedAt: string,
];

// Keep the client-shipped authority index compact: tuple rows avoid repeating
// object keys for every event while preserving the same typed public shape.
const rows: MajorEventRow[] = [
  ["grapefest", "GrapeFest", "Grapevine", "tarrant", "Tarrant County", "prairies-lakes", "food", "2026-09-17", "2026-09-20", undefined, "Historic Downtown Grapevine", "https://www.grapevinetexasusa.com/grapefest/general-information/", "2026-08-26"],
  ["texas-renaissance-festival", "Texas Renaissance Festival", "Todd Mission", undefined, undefined, "prairies-lakes", "culture", "2026-10-10", "2026-11-29", "Open Saturdays and Sundays during the published season, plus Thanksgiving Friday; check the official calendar before traveling.", "Texas Renaissance Festival", "https://www.texrenfest.com/", "2026-08-26"],
  ["texas-rose-festival", "Texas Rose Festival", "Tyler", "smith", "Smith County", "piney-woods", "culture", "2026-10-15", "2026-10-18", undefined, "Tyler", "https://www.texasrosefestival.org/", "2026-08-26"],
  ["wurstfest", "Wurstfest", "New Braunfels", "comal", "Comal County", "hill-country", "food", "2026-11-06", "2026-11-15", undefined, "Wurstfest grounds", "https://wurstfest.com/", "2026-08-26"],
  ["fort-worth-stock-show-rodeo", "Fort Worth Stock Show & Rodeo", "Fort Worth", "tarrant", "Tarrant County", "prairies-lakes", "rodeo", "2027-01-15", "2027-02-06", undefined, "Will Rogers Memorial Center and Dickies Arena", "https://www.fwssr.com/", "2026-08-26"],
  ["san-antonio-stock-show-rodeo", "San Antonio Stock Show & Rodeo", "San Antonio", "bexar", "Bexar County", "south-texas", "rodeo", "2027-02-11", "2027-02-28", undefined, "Frost Bank Center and Freeman Coliseum grounds", "https://www.sarodeo.com/", "2026-08-26"],
  ["sxsw", "South by Southwest (SXSW)", "Austin", "travis", "Travis County", "hill-country", "culture", "2027-03-15", "2027-03-21", undefined, "Downtown Austin venues", "https://sxsw.com/", "2026-08-26"],
  ["texas-sandfest", "Texas SandFest", "Port Aransas", "nueces", "Nueces County", "gulf-coast", "culture", "2027-04-16", "2027-04-18", undefined, "Port Aransas beach festival grounds", "https://www.texassandfest.org/", "2026-08-26"],
];

export const majorEventIndexRecords: MajorEventIndexRecord[] = rows.map(([
  slug,
  name,
  city,
  countySlug,
  countyName,
  region,
  category,
  startDate,
  endDate,
  dateNote,
  venue,
  officialUrl,
  sourceCheckedAt,
]) => ({
  slug,
  name,
  city,
  countySlug,
  countyName,
  region,
  category,
  startDate,
  endDate,
  dateNote,
  venue,
  officialUrl,
  sourceCheckedAt,
}));

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
