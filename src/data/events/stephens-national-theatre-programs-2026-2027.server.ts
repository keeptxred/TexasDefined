import type { TexasEventRecord } from "./texas-event-record";

/** Operator-confirmed dates only; no inferred times, prices or licensed media. */
const records: TexasEventRecord[] = [
  {
    "id": "curated-stephens-venue:breckenridge-national-theatre-amini-wright-2026",
    "slug": "breckenridge-national-theatre-amini-wright-2026",
    "title": "Maggie Amini & Danny Wright at the National Theatre",
    "summary": "The National Theatre operator has scheduled Maggie Amini and Danny Wright for December 5 as part of its 2026–27 performance season. The original season listing confirms the date; it does not independently establish the showtime, admission price or ticket availability. Check the official venue listing before visiting.",
    "guidePath": "/events?location=county%3Astephens&start=2026-12-05&end=2026-12-05#calendar",
    "startDate": "2026-12-05",
    "venueName": "National Theatre, 116 E. Walker Street",
    "city": "Breckenridge",
    "countySlug": "stephens",
    "countyName": "Stephens County",
    "region": "panhandle",
    "category": "music",
    "officialEventUrl": "https://friendsofhistoricbreckenridge.org/",
    "status": "scheduled",
    "lastVerifiedAt": "2026-11-24",
    "lastUpdatedAt": "2026-11-24",
    "sourceName": "Friends of Historic Breckenridge — original National Theatre schedule"
  },
  {
    "id": "curated-stephens-venue:breckenridge-boomtown-revue-2027",
    "slug": "breckenridge-boomtown-revue-2027",
    "title": "Boomtown Revue at the National Theatre",
    "summary": "Friends of Historic Breckenridge announces the 2027 talent competition performance for January 30. January 10 is the separate audition date, not the public performance. The original listing does not specify public showtime, admission or seating details; confirm these directly with the venue.",
    "guidePath": "/events?location=county%3Astephens&start=2027-01-30&end=2027-01-30#calendar",
    "startDate": "2027-01-30",
    "venueName": "National Theatre, 116 E. Walker Street",
    "city": "Breckenridge",
    "countySlug": "stephens",
    "countyName": "Stephens County",
    "region": "panhandle",
    "category": "culture",
    "officialEventUrl": "https://friendsofhistoricbreckenridge.org/",
    "status": "scheduled",
    "lastVerifiedAt": "2026-11-24",
    "lastUpdatedAt": "2026-11-24",
    "sourceName": "Friends of Historic Breckenridge — original National Theatre schedule"
  },
  {
    "id": "curated-stephens-venue:breckenridge-national-theatre-hayden-baker-2027",
    "slug": "breckenridge-national-theatre-hayden-baker-2027",
    "title": "Hayden Baker at the National Theatre",
    "summary": "The official National Theatre season schedule lists Hayden Baker on February 13, 2027. This performance is in downtown Breckenridge. Consult the organizer for showtime, seating, prices and availability; the season listing alone is not a guarantee of tickets.",
    "guidePath": "/events?location=county%3Astephens&start=2027-02-13&end=2027-02-13#calendar",
    "startDate": "2027-02-13",
    "venueName": "National Theatre, 116 E. Walker Street",
    "city": "Breckenridge",
    "countySlug": "stephens",
    "countyName": "Stephens County",
    "region": "panhandle",
    "category": "music",
    "officialEventUrl": "https://friendsofhistoricbreckenridge.org/",
    "status": "scheduled",
    "lastVerifiedAt": "2026-11-24",
    "lastUpdatedAt": "2026-11-24",
    "sourceName": "Friends of Historic Breckenridge — original National Theatre schedule"
  },
  {
    "id": "curated-stephens-venue:breckenridge-national-theatre-jarrod-morris-2027",
    "slug": "breckenridge-national-theatre-jarrod-morris-2027",
    "title": "Jarrod Morris at the National Theatre",
    "summary": "The National Theatre's 2026–27 schedule identifies Jarrod Morris as the April 10, 2027 performance. Check the venue's latest information for showtime, admission and any schedule changes. No subsequent annual performance date is assumed.",
    "guidePath": "/events?location=county%3Astephens&start=2027-04-10&end=2027-04-10#calendar",
    "startDate": "2027-04-10",
    "venueName": "National Theatre, 116 E. Walker Street",
    "city": "Breckenridge",
    "countySlug": "stephens",
    "countyName": "Stephens County",
    "region": "panhandle",
    "category": "music",
    "officialEventUrl": "https://friendsofhistoricbreckenridge.org/",
    "status": "scheduled",
    "lastVerifiedAt": "2026-11-24",
    "lastUpdatedAt": "2026-11-24",
    "sourceName": "Friends of Historic Breckenridge — original National Theatre schedule"
  }
];

export function getVerifiedStephensNationalTheatrePrograms(): TexasEventRecord[] {
  return records.map(event => ({ ...event }));
}
