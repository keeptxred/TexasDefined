import type { TexasEventRecord } from "./texas-event-record";

/** Exact original venue/organizer announcements. No inferred repeat dates, image rights or ticket terms. */
const records: TexasEventRecord[] = [
  {
    "id": "curated-venue-program:big-spring-symphony-night-out-at-the-movies-2027",
    "slug": "big-spring-symphony-night-out-at-the-movies-2027",
    "title": "Big Spring Symphony: A Night Out at the Movies",
    "summary": "The orchestra's published 2026–27 season confirms the public concert on February 20, 2027, at 5:30 p.m. The program includes live accompaniment to Buster Keaton's One Week and pianist Sergio Salani, with film music and his first piano concerto. The organizer refers to a two-day project but specifies only Saturday for the public performance; check the box office for tickets and any changes.",
    "startDate": "2027-02-20",
    "startTime": "5:30 PM",
    "city": "Big Spring",
    "countySlug": "howard",
    "countyName": "Howard County",
    "region": "panhandle",
    "category": "music",
    "venueName": "Big Spring Municipal Auditorium, 310 E. 3rd Street",
    "officialEventUrl": "https://bigspringsymphony.org/season-letter/",
    "sourceName": "Big Spring Symphony Orchestra — 2026–27 season announcement",
    "guidePath": "/events?location=county%3Ahoward&start=2027-02-20&end=2027-02-20#calendar",
    "status": "scheduled",
    "lastVerifiedAt": "2026-11-24",
    "lastUpdatedAt": "2026-11-24"
  },
  {
    "id": "curated-venue-program:big-spring-symphony-jazzy-night-out-2027",
    "slug": "big-spring-symphony-jazzy-night-out-2027",
    "title": "Big Spring Symphony: A Jazzy Night Out",
    "summary": "The official season concludes April 24, 2027, at 5:30 p.m. with a collaboration between the Big Spring Symphony and West Texas Jazz Orchestra. The concert features symphonic arrangements of jazz and big-band music at the Municipal Auditorium. Confirm ticket prices, seating and any program changes directly with the orchestra.",
    "startDate": "2027-04-24",
    "startTime": "5:30 PM",
    "city": "Big Spring",
    "countySlug": "howard",
    "countyName": "Howard County",
    "region": "panhandle",
    "category": "music",
    "venueName": "Big Spring Municipal Auditorium, 310 E. 3rd Street",
    "officialEventUrl": "https://bigspringsymphony.org/season-letter/",
    "sourceName": "Big Spring Symphony Orchestra — 2026–27 season announcement",
    "guidePath": "/events?location=county%3Ahoward&start=2027-04-24&end=2027-04-24#calendar",
    "status": "scheduled",
    "lastVerifiedAt": "2026-11-24",
    "lastUpdatedAt": "2026-11-24"
  },
  {
    "id": "curated-venue-program:wellington-ritz-retro-reels-december-2026",
    "slug": "wellington-ritz-retro-reels-december-2026",
    "title": "Retro Reels at the Wellington Ritz",
    "summary": "The theater's current program lists its next Retro Reels presentation in honor of Will Grant at 3 p.m. on December 6, 2026. The public listing does not identify the film in text or confirm admission terms; check the venue's current information before traveling. This is a film program, not a confirmed Christmas festival.",
    "startDate": "2026-12-06",
    "startTime": "3:00 PM",
    "city": "Wellington",
    "countySlug": "collingsworth",
    "countyName": "Collingsworth County",
    "region": "panhandle",
    "category": "culture",
    "venueName": "Ritz Theatre, 902 East Avenue",
    "officialEventUrl": "https://www.wellingtonritztheatre.com/",
    "sourceName": "Wellington Ritz Theatre — current Retro Reels announcement",
    "guidePath": "/events?location=county%3Acollingsworth&start=2026-12-06&end=2026-12-06#calendar",
    "status": "scheduled",
    "lastVerifiedAt": "2026-11-24",
    "lastUpdatedAt": "2026-11-24"
  },
  {
    "id": "curated-venue-program:wellington-ritz-josh-abbott-william-clark-green-2027",
    "slug": "wellington-ritz-josh-abbott-william-clark-green-2027",
    "title": "Josh Abbott & William Clark Green at the Ritz",
    "summary": "The Wellington Ritz Theatre lists Josh Abbott and William Clark Green for January 17, 2027, at 6 p.m. at its historic downtown theater. Check the venue's current ticket information and any age or seating restrictions before attending; no ticket price or availability is assumed.",
    "startDate": "2027-01-17",
    "startTime": "6:00 PM",
    "city": "Wellington",
    "countySlug": "collingsworth",
    "countyName": "Collingsworth County",
    "region": "panhandle",
    "category": "music",
    "venueName": "Ritz Theatre, 902 East Avenue",
    "officialEventUrl": "https://www.wellingtonritztheatre.com/",
    "sourceName": "Wellington Ritz Theatre — Live at the Ritz schedule",
    "guidePath": "/events?location=county%3Acollingsworth&start=2027-01-17&end=2027-01-17#calendar",
    "status": "scheduled",
    "lastVerifiedAt": "2026-11-24",
    "lastUpdatedAt": "2026-11-24"
  }
];

export function getVerifiedHowardCollingsworthVenuePrograms(): TexasEventRecord[] {
  return records.map(event => ({ ...event }));
}
