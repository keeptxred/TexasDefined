import type { SportsVenueGuidePilot } from './sports-venue-guide-pilots';

const GALAXY_STADIUM_GUIDE: SportsVenueGuidePilot = {
  canonicalPath: '/sports-venue/jones-att-stadium',
  city: 'Lubbock',
  subtitle: 'Texas Tech campus · Red Raiders football · formerly Jones AT&T Stadium',
  venueType: 'College football stadium',
  homeTeam: 'Texas Tech Red Raiders football',
  capacity: '60,229 (Texas Tech 2026 football game notes)',
  opened: 'Texas Tech football home since 1947; Galaxy Stadium name began in 2026',
  officialUrl: 'https://texastech.com/facilities/galaxy-stadium/2',
  eventScheduleUrl: 'https://texastech.com/sports/football/schedule',
  reviewedAt: '2026-11-12',
  sources: [
    { label: 'Galaxy Stadium facility page', href: 'https://texastech.com/facilities/galaxy-stadium/2' },
    { label: '2026 Texas Tech football game notes — official 60,229 capacity', href: 'https://texastech.com/documents/download/2026/10/19/2026_Texas_Tech_Game_Notes_-_GM7_-_Cincinnati.pdf' },
    { label: '2026 Galaxy Stadium fan information', href: 'https://texastech.com/news/2026/9/2/football-texas-tech-announces-fan-information-for-2026-season' },
    { label: 'Gameday in Raiderland', href: 'https://texastech.com/sports/2026/7/15/gameday-in-raiderland' },
    { label: 'Galaxy Stadium naming announcement', href: 'https://texastech.com/news/2026/7/17/football-texas-tech-secures-landmark-naming-rights-agreement-with-galaxy' },
  ],
};

export function getSportsVenueGuideGalaxy(slug: string) {
  return slug === 'jones-att-stadium' ? GALAXY_STADIUM_GUIDE : undefined;
}
