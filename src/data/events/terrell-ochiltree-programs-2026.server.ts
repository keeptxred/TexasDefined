import type { TexasEventRecord } from "./texas-event-record";

/** Organizer-confirmed occurrences, no inferred repeat dates or media rights. */
const records: TexasEventRecord[] = [
  {
    "status": "scheduled",
    "lastVerifiedAt": "2026-11-24",
    "lastUpdatedAt": "2026-11-24",
    "id": "curated-local-program:sanderson-distillery-visitor-program-nov27-2026",
    "slug": "sanderson-distillery-visitor-program-nov27-2026",
    "title": "Tall Texan Distillery Visitor Program",
    "summary": "The Sanderson distillery lists a November 27 public visitor program from 3 to 9 p.m. The optional guided facility tours begin at 3, 5 and 7 p.m.; advance booking is required for those tours, which cost $30 per person and are restricted to guests aged 21 and older. The venue is open-air; check weather and current arrangements directly with the operator. Admission terms for the general visitor area are not stated.",
    "startDate": "2026-11-27",
    "city": "Sanderson",
    "countySlug": "terrell",
    "countyName": "Terrell County",
    "region": "big-bend",
    "category": "culture",
    "venueName": "Tall Texan Distillery, Sanderson",
    "officialEventUrl": "https://talltexandistilling.com/distillery-events",
    "sourceName": "Tall Texan Distilling official dated visitor calendar",
    "guidePath": "/events?location=county%3Aterrell&start=2026-11-27&end=2026-11-27#calendar"
  },
  {
    "status": "scheduled",
    "lastVerifiedAt": "2026-11-24",
    "lastUpdatedAt": "2026-11-24",
    "id": "curated-local-program:sanderson-distillery-visitor-program-nov28-dec13-2026",
    "slug": "sanderson-distillery-visitor-program-nov28-dec13-2026",
    "title": "Tall Texan Distillery Seasonal Visitor Program",
    "summary": "The venue confirms a continuous visitor-area schedule from November 28 through December 13, 2026: Monday–Friday 6–9 p.m. and Saturday–Sunday 3–9 p.m. Optional guided tours are offered only Thursday and Friday at 7 p.m., and Saturday and Sunday at 3, 5 and 7 p.m. The tours require reservations, cost $30 per person and are for guests aged 21 and older. Check the operator for current availability and weather; the general visitor-area schedule does not mean tours run every day.",
    "startDate": "2026-11-28",
    "endDate": "2026-12-13",
    "city": "Sanderson",
    "countySlug": "terrell",
    "countyName": "Terrell County",
    "region": "big-bend",
    "category": "culture",
    "venueName": "Tall Texan Distillery, Sanderson",
    "officialEventUrl": "https://talltexandistilling.com/distillery-events",
    "sourceName": "Tall Texan Distilling official dated visitor calendar",
    "guidePath": "/events?location=county%3Aterrell&start=2026-11-28&end=2026-12-13#calendar"
  },
  {
    "status": "scheduled",
    "lastVerifiedAt": "2026-11-24",
    "lastUpdatedAt": "2026-11-24",
    "id": "curated-local-program:perryton-blake-jenna-bolerjack-concert-2026",
    "slug": "perryton-blake-jenna-bolerjack-concert-2026",
    "title": "Blake & Jenna Bolerjack Concert in Perryton",
    "summary": "The performing duo's official tour calendar lists a December 13 concert at First Baptist Church in Perryton at 6 p.m. The artists' event listing identifies the 2026 edition. The church's website confirms its street address. Check directly with the host or performers for admission, seating and any program updates; no ticket price, exact end time or future edition is inferred.",
    "startDate": "2026-12-13",
    "startTime": "6:00 PM",
    "city": "Perryton",
    "countySlug": "ochiltree",
    "countyName": "Ochiltree County",
    "region": "panhandle",
    "category": "music",
    "venueName": "First Baptist Church, 415 S. Baylor Street",
    "officialEventUrl": "https://linktr.ee/blakeandjenna",
    "sourceName": "Blake & Jenna Bolerjack official tour calendar",
    "guidePath": "/events?location=county%3Aochiltree&start=2026-12-13&end=2026-12-13#calendar"
  }
];

export function getVerifiedTerrellOchiltreePrograms(): TexasEventRecord[] {
  return records.map(event => ({ ...event }));
}
