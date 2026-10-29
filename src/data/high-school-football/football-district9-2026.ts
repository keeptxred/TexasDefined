// Editorial 2026 District 9 snapshot, not a licensed scoreboard feed.
// Standings: MaxPreps, last updated October 27, 2026; copied as reported data,
// NOT certified UIL rankings, playoff seeds or district tie-break decisions.
// Games: official Garland/Wylie school varsity calendars and the individually
// source-verified October 22–23 finals; no result is inferred from a fixture.
export const DISTRICT9_VERIFIED_AT = 'October 29, 2026';
export const DISTRICT9_STANDINGS_AS_OF = 'October 27, 2026';
export const DISTRICT9_STANDINGS_URL = 'https://www.maxpreps.com/tx/football/26-27/district/6a-region-ii-district-9/?leagueid=a4b39656-429f-46ce-b04a-360cbee61f47';
export const DISTRICT9_WEEK9_RESULTS_URL = 'https://www.pigskinprep.com/showscores.asp?cid=8&wk=9&yr=2026';
export const DISTRICT9_GISD_CALENDAR_URL = 'https://www.garlandisd.net/calendars/athletic-events-calendar';
export const DISTRICT9_GISD_TICKETS_URL = 'https://garlandisd.net/programs-services/athletics/ticket-sales';
export const DISTRICT9_WYLIE_CALENDAR_URL = 'https://athletics.wylieisd.net/athletics-calendar';
export const DISTRICT9_WYLIE_TICKETS_URL = 'https://wyliesports.rankone.com/Website/Main/CustomPage?customPageId=8196';

export const DISTRICT9_DISPLAY_NAMES: Readonly<Record<string, string>> = {
  'Garland Lakeview Cent': 'Lakeview Centennial',
  'Garland Rowlett': 'Rowlett',
  'Garland Sachse': 'Sachse',
};

export const district9DisplayName = (uilName: string) => DISTRICT9_DISPLAY_NAMES[uilName] ?? uilName;

// The school's UIL name is the stable key for links; visible names are fan-friendly.
// All teams have played five district games in this October 27 snapshot.
export const DISTRICT9_STANDINGS = [
  { uilName: 'Wylie East', won: 5, lost: 0, pf: 242, pa: 54, overall: '7–1' },
  { uilName: 'Garland Sachse', won: 5, lost: 0, pf: 231, pa: 89, overall: '8–0' },
  { uilName: 'Garland Rowlett', won: 3, lost: 2, pf: 179, pa: 100, overall: '4–4' },
  { uilName: 'Wylie', won: 3, lost: 2, pf: 220, pa: 122, overall: '6–2' },
  { uilName: 'Garland Lakeview Cent', won: 2, lost: 3, pf: 132, pa: 135, overall: '3–5' },
  { uilName: 'Garland', won: 1, lost: 4, pf: 60, pa: 198, overall: '2–6' },
  { uilName: 'North Garland', won: 1, lost: 4, pf: 63, pa: 230, overall: '1–7' },
  { uilName: 'South Garland', won: 0, lost: 5, pf: 44, pa: 243, overall: '2–6' },
] as const;

// Latest individually verified league finals, not the full five-round ledger.
export const DISTRICT9_RECENT_FINALS = [
  { date: '2026-10-22', away: 'Garland Lakeview Cent', home: 'Garland Sachse', awayScore: 10, homeScore: 36 },
  { date: '2026-10-23', away: 'Garland', home: 'Garland Rowlett', awayScore: 0, homeScore: 40 },
  { date: '2026-10-23', away: 'North Garland', home: 'Wylie', awayScore: 0, homeScore: 56 },
  { date: '2026-10-23', away: 'South Garland', home: 'Wylie East', awayScore: 10, homeScore: 42 },
] as const;

// Two final scheduled rounds, as published October 29. They do not turn
// automatically into finals; confirm results and changed venues with schools.
export const DISTRICT9_REMAINING_FIXTURES = [
  { date: '2026-10-29', kickoff: '7:00 p.m. CDT', away: 'Garland Sachse', home: 'Wylie East', venue: 'Wylie ISD FB Stadium', sourceUrl: 'https://athletics.wylieisd.net/schools/wehs/mens-football' },
  { date: '2026-10-29', kickoff: '7:00 p.m. CDT', away: 'South Garland', home: 'Garland', venue: 'Williams Stadium', sourceUrl: 'https://www.garlandowlsfootball.com/varsity.html' },
  { date: '2026-10-30', kickoff: '7:00 p.m. CDT', away: 'Garland Lakeview Cent', home: 'North Garland', venue: 'Williams Stadium', sourceUrl: 'https://www.garlandisdschools.net/lchs/activities/calendar' },
  { date: '2026-10-30', kickoff: '7:00 p.m. CDT', away: 'Garland Rowlett', home: 'Wylie', venue: 'Wylie ISD FB Stadium', sourceUrl: 'https://athletics.wylieisd.net/athletics-calendar' },
  { date: '2026-11-05', kickoff: '4:00 p.m. CST', away: 'Wylie East', home: 'Garland Lakeview Cent', venue: 'Homer B. Johnson Stadium', sourceUrl: 'https://athletics.wylieisd.net/schools/wehs/mens-football' },
  { date: '2026-11-05', kickoff: '7:00 p.m. CST', away: 'Garland Rowlett', home: 'North Garland', venue: 'Williams Stadium', sourceUrl: 'https://www.maxpreps.com/tx/garland/north-garland-raiders/football/schedule/' },
  { date: '2026-11-05', kickoff: '8:00 p.m. CST', away: 'Garland', home: 'Garland Sachse', venue: 'Homer B. Johnson Stadium', sourceUrl: 'https://resources.finalsite.net/images/v1772468807/garland/m2of6eyzbsdvbxuaddjn/2026SHSFBSchedule.pdf' },
  { date: '2026-11-06', kickoff: '7:00 p.m. CST', away: 'Wylie', home: 'South Garland', venue: 'Homer B. Johnson Stadium', sourceUrl: 'https://www.wyliepiratefootball.com/sched' },
] as const;
