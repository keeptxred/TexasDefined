// Manually checked editorial snapshot, October 20, 2026. NOT a live feed.
// MaxPreps reported standings updated October 18; these are not UIL-certified seeds.
// Team "match" keys resolve to school profiles from the current UIL alignment at render time.
export const DISTRICT_16_STANDINGS_URL = 'https://www.maxpreps.com/tx/football/26-27/district/6a-region-ii-district-16/?leagueid=30542350-2954-4f15-a3f8-1944386a4e88';
export const DISTRICT_16_CFISD_SCHEDULE_URL = 'https://www.cfisd.net/athletics/schedules/high-school-schedules/football-hs';
export const DISTRICT_16_CFISD_TICKETS_URL = 'https://www.cfisd.net/athletics/tickets';
export const DISTRICT_16_BERRY_CALENDAR_URL = 'https://berrycenter.cfisd.net/events/calendar';
export const DISTRICT_16_STANDINGS_AS_OF = 'October 18, 2026';
export const DISTRICT_16_VERIFIED_AT = 'October 20, 2026';

export const DISTRICT_16_STANDINGS = [
  { name: 'Langham Creek', match: 'Langham Creek', won: 4, lost: 0, pf: 153, pa: 64, overall: '6–1' },
  { name: 'Cypress Woods', match: 'Cypress Woods', won: 3, lost: 1, pf: 110, pa: 78, overall: '5–1' },
  { name: 'Cypress Falls', match: 'Cypress Falls', won: 3, lost: 1, pf: 173, pa: 80, overall: '6–1' },
  { name: 'Cypress Lakes', match: 'Cypress Lakes', won: 3, lost: 1, pf: 127, pa: 102, overall: '5–2' },
  { name: 'Cy-Fair', match: 'Cypress Fairbanks', won: 1, lost: 3, pf: 142, pa: 128, overall: '4–3' },
  { name: 'Jersey Village', match: 'Jersey Village', won: 1, lost: 3, pf: 99, pa: 129, overall: '1–6' },
  { name: 'Cypress Ridge', match: 'Cypress Ridge', won: 1, lost: 3, pf: 72, pa: 194, overall: '3–4' },
  { name: 'Cypress Creek', match: 'Cypress Creek', won: 0, lost: 4, pf: 79, pa: 180, overall: '0–7' },
] as const;

// Only independently checked Week 8 finals. This is not a complete historical
// district score ledger. Away / home follows the CFISD fixture listing.
export const DISTRICT_16_RECENT_FINALS = [
  { date: '2026-10-15', away: 'Cypress Creek', home: 'Cypress Woods', awayScore: 18, homeScore: 33, sourceUrl: 'https://www.maxpreps.com/tx/houston/cypress-creek-cougars/football/' },
  { date: '2026-10-16', away: 'Cypress Falls', home: 'Jersey Village', awayScore: 58, homeScore: 14, sourceUrl: 'https://www.maxpreps.com/news/JNKKiuk5lk-z8lVg6jUZpA/football-recap-cypress-falls-piles-up-the-points-against-jersey-village--how-to-watch.htm' },
  { date: '2026-10-16', away: 'Cy-Fair', home: 'Cypress Lakes', awayScore: 31, homeScore: 38, sourceUrl: 'https://www.cyfairathleticbooster.com/sport/football/boys/' },
  { date: '2026-10-17', away: 'Cypress Ridge', home: 'Langham Creek', awayScore: 13, homeScore: 59, sourceUrl: 'https://www.maxpreps.com/news/DXwR4ZFSUES3X2Vq9QvKSA/football-recap-langham-creek-piles-up-the-points-against-cypress-ridge--how-to-watch.htm' },
] as const;

// Published CFISD/Berry Center calendar and current school/team schedules reviewed October 20.
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
