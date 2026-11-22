// Manually checked editorial snapshot, November 21, 2026. NOT a live feed.
// Completed district totals from Pressbox, shared champions verified by CFISD;
// overall records from MaxPreps November 21, including the reported playoffs.
// The MaxPreps district table omits the Nov. 7 Langham Creek–Cypress Creek final;
// Pressbox includes it. Cypress Woods district PA differs by one point between sources.
// Team "match" keys resolve to school profiles from the current UIL alignment at render time.
export const DISTRICT_16_STANDINGS_URL = 'https://www.maxpreps.com/tx/football/26-27/district/6a-region-ii-district-16/?leagueid=30542350-2954-4f15-a3f8-1944386a4e88';
export const DISTRICT_16_CFISD_SCHEDULE_URL = 'https://www.cfisd.net/athletics/schedules/high-school-schedules/football-hs';
export const DISTRICT_16_CFISD_TICKETS_URL = 'https://www.cfisd.net/athletics/tickets';
export const DISTRICT_16_BERRY_CALENDAR_URL = 'https://berrycenter.cfisd.net/events/calendar';
export const DISTRICT_16_STANDINGS_AS_OF = 'November 21, 2026';
export const DISTRICT_16_VERIFIED_AT = 'November 21, 2026';

export const DISTRICT_16_COMPLETE_LEDGER_URL = 'https://texas6a.thepressbox.io/sites/uil-6a-region-2-football/divisions/district-16-6a/';
export const DISTRICT_16_STANDINGS = [
  { name: 'Cypress Falls', match: 'Cypress Falls', won: 6, lost: 1, pf: 289, pa: 103, overall: '10–2' },
  { name: 'Cypress Lakes', match: 'Cypress Lakes', won: 6, lost: 1, pf: 238, pa: 166, overall: '9–3' },
  { name: 'Langham Creek', match: 'Langham Creek', won: 6, lost: 1, pf: 255, pa: 172, overall: '9–3' },
  { name: 'Cypress Woods', match: 'Cypress Woods', won: 4, lost: 3, pf: 206, pa: 137, overall: '6–4' },
  { name: 'Cy-Fair', match: 'Cypress Fairbanks', won: 3, lost: 4, pf: 297, pa: 228, overall: '6–4' },
  { name: 'Cypress Creek', match: 'Cypress Creek', won: 1, lost: 6, pf: 130, pa: 267, overall: '1–9' },
  { name: 'Cypress Ridge', match: 'Cypress Ridge', won: 1, lost: 6, pf: 82, pa: 349, overall: '3–7' },
  { name: 'Jersey Village', match: 'Jersey Village', won: 1, lost: 6, pf: 180, pa: 255, overall: '1–9' },
] as const;

// Only independently checked Week 8 finals. This is not a complete historical
// district score ledger. Away / home follows the CFISD fixture listing.
export const DISTRICT_16_RECENT_FINALS = [
  { date: '2026-10-15', away: 'Cypress Creek', home: 'Cypress Woods', awayScore: 18, homeScore: 33, sourceUrl: 'https://www.maxpreps.com/tx/houston/cypress-creek-cougars/football/' },
  { date: '2026-10-16', away: 'Cypress Falls', home: 'Jersey Village', awayScore: 58, homeScore: 14, sourceUrl: 'https://www.maxpreps.com/news/JNKKiuk5lk-z8lVg6jUZpA/football-recap-cypress-falls-piles-up-the-points-against-jersey-village--how-to-watch.htm' },
  { date: '2026-10-16', away: 'Cy-Fair', home: 'Cypress Lakes', awayScore: 31, homeScore: 38, sourceUrl: 'https://www.cyfairathleticbooster.com/sport/football/boys/' },
  { date: '2026-10-17', away: 'Cypress Ridge', home: 'Langham Creek', awayScore: 13, homeScore: 59, sourceUrl: 'https://www.maxpreps.com/news/DXwR4ZFSUES3X2Vq9QvKSA/football-recap-langham-creek-piles-up-the-points-against-cypress-ridge--how-to-watch.htm' },
] as const;

// November 20 retrospective verification of all remaining 2026 District 16 league dates.
// Original game dates retained from the CFISD schedule; final-score reporting corroborated
// by the MaxPreps UIL partner, Pigskin Prep and Houston regional coverage.
// Each item is an independently published FINAL, not a live-score prediction.
export const DISTRICT_16_LATE_FINALS = [
  { date: '2026-10-22', away: 'Jersey Village', home: 'Cy-Fair', awayScore: 34, homeScore: 48, verifiedAt: '2026-11-20', sourceUrl: 'https://texas6a.thepressbox.io/sites/uil-6a-region-2-football/divisions/district-16-6a/' },
  { date: '2026-10-22', away: 'Cypress Lakes', home: 'Cypress Creek', awayScore: 32, homeScore: 12, verifiedAt: '2026-11-20', sourceUrl: 'https://texas6a.thepressbox.io/sites/uil-6a-region-2-football/divisions/district-16-6a/' },
  { date: '2026-10-23', away: 'Cypress Woods', home: 'Cypress Ridge', awayScore: 58, homeScore: 0, verifiedAt: '2026-11-20', sourceUrl: 'https://texas6a.thepressbox.io/sites/uil-6a-region-2-football/divisions/district-16-6a/' },
  { date: '2026-10-24', away: 'Langham Creek', home: 'Cypress Falls', awayScore: 7, homeScore: 45, verifiedAt: '2026-11-20', sourceUrl: 'https://texas6a.thepressbox.io/sites/uil-6a-region-2-football/divisions/district-16-6a/' },
  { date: '2026-10-29', away: 'Cypress Falls', home: 'Cypress Ridge', awayScore: 41, homeScore: 0, verifiedAt: '2026-11-20', sourceUrl: 'https://texas6a.thepressbox.io/sites/uil-6a-region-2-football/divisions/district-16-6a/' },
  { date: '2026-10-30', away: 'Cypress Creek', home: 'Jersey Village', awayScore: 27, homeScore: 17, verifiedAt: '2026-11-20', sourceUrl: 'https://texas6a.thepressbox.io/sites/uil-6a-region-2-football/divisions/district-16-6a/' },
  { date: '2026-10-30', away: 'Cy-Fair', home: 'Langham Creek', awayScore: 51, homeScore: 56, verifiedAt: '2026-11-20', sourceUrl: 'https://texas6a.thepressbox.io/sites/uil-6a-region-2-football/divisions/district-16-6a/' },
  { date: '2026-10-31', away: 'Cypress Lakes', home: 'Cypress Woods', awayScore: 28, homeScore: 22, verifiedAt: '2026-11-20', sourceUrl: 'https://texas6a.thepressbox.io/sites/uil-6a-region-2-football/divisions/district-16-6a/' },
  { date: '2026-11-05', away: 'Cypress Ridge', home: 'Cy-Fair', awayScore: 10, homeScore: 56, verifiedAt: '2026-11-20', sourceUrl: 'https://texas6a.thepressbox.io/sites/uil-6a-region-2-football/divisions/district-16-6a/' },
  { date: '2026-11-06', away: 'Jersey Village', home: 'Cypress Lakes', awayScore: 30, homeScore: 51, verifiedAt: '2026-11-20', sourceUrl: 'https://texas6a.thepressbox.io/sites/uil-6a-region-2-football/divisions/district-16-6a/' },
  { date: '2026-11-07', away: 'Langham Creek', home: 'Cypress Creek', awayScore: 38, homeScore: 12, verifiedAt: '2026-11-20', sourceUrl: 'https://texas6a.thepressbox.io/sites/uil-6a-region-2-football/divisions/district-16-6a/' },
  { date: '2026-11-07', away: 'Cypress Woods', home: 'Cypress Falls', awayScore: 16, homeScore: 30, verifiedAt: '2026-11-20', sourceUrl: 'https://texas6a.thepressbox.io/sites/uil-6a-region-2-football/divisions/district-16-6a/' },
] as const;

// Historical CFISD/Berry Center fixture schedule reviewed October 20; the outcomes
// are now supplied independently by DISTRICT_16_LATE_FINALS, not this schedule.
// Times are local CDT through October and CST in November. One November 7 kickoff is
// withheld because the third-party display is inconsistent; verify with CFISD.
// Venue assignments, entrances and dates can change; check the linked host calendar.
export const DISTRICT_16_NEXT_GAMES = [
  { date: '2026-10-22', kickoff: '6:30 p.m. CDT', away: 'Jersey Village', home: 'Cy-Fair' },
  { date: '2026-10-22', kickoff: '6:30 p.m. CDT', away: 'Cypress Lakes', home: 'Cypress Creek' },
  { date: '2026-10-23', kickoff: '7:00 p.m. CDT', away: 'Cypress Woods', home: 'Cypress Ridge' },
  { date: '2026-10-24', kickoff: '11:00 a.m. CDT', away: 'Langham Creek', home: 'Cypress Falls' },
  { date: '2026-10-29', kickoff: '6:30 p.m. CDT', away: 'Cypress Falls', home: 'Cypress Ridge' },
  { date: '2026-10-30', kickoff: '7:00 p.m. CDT', away: 'Cypress Creek', home: 'Jersey Village' },
  { date: '2026-10-30', kickoff: '7:00 p.m. CDT', away: 'Cy-Fair', home: 'Langham Creek' },
  { date: '2026-10-31', kickoff: '11:00 a.m. CDT', away: 'Cypress Lakes', home: 'Cypress Woods' },
  { date: '2026-11-05', kickoff: '6:30 p.m. CST', away: 'Cypress Ridge', home: 'Cy-Fair' },
  { date: '2026-11-06', kickoff: '7:00 p.m. CST', away: 'Jersey Village', home: 'Cypress Lakes' },
  { date: '2026-11-07', kickoff: 'Kickoff unconfirmed', away: 'Langham Creek', home: 'Cypress Creek' },
  { date: '2026-11-07', kickoff: '11:00 a.m. CST', away: 'Cypress Woods', home: 'Cypress Falls' },
] as const;
