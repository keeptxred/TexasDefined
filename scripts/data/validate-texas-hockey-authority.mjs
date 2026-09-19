import fs from 'node:fs';

const failures = [];
const requireText = (source, marker, label) => {
  if (!source.includes(marker)) failures.push(label + ' missing required marker: ' + marker);
};

const data = fs.readFileSync('src/data/texas-hockey.ts', 'utf8');
const hub = fs.readFileSync('src/routes/texas-hockey.tsx', 'utf8');
const team = fs.readFileSync('src/routes/texas-hockey.teams.$slug.tsx', 'utf8');
const league = fs.readFileSync('src/routes/texas-hockey.leagues.$slug.tsx', 'utf8');
const venue = fs.readFileSync('src/routes/texas-hockey.venues.$slug.tsx', 'utf8');
const stay = fs.readFileSync('src/components/sports/HockeyStayNearby.tsx', 'utf8');
const publicRoutes = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const expedia = fs.readFileSync('public/expedia-travel.js', 'utf8');
const sports = fs.readFileSync('src/routes/sports.lazy.tsx', 'utf8');
const llms = fs.readFileSync('src/routes/llms[.]txt.ts', 'utf8');
const sportsVenueRoute = fs.readFileSync('src/routes/sports-venue.$slug.tsx', 'utf8');
const sportsVenuePilot = fs.readFileSync('src/components/sports/SportsVenueGuidePilotContent.tsx', 'utf8');
const entityHockey = fs.readFileSync('src/components/sports/EntityHockeyTeams.tsx', 'utf8');
const entityLazy = fs.readFileSync('src/routes/$kind.$slug.lazy.tsx', 'utf8');
const routeTree = fs.readFileSync('src/routeTree.gen.ts', 'utf8');

for (const marker of [
  "TEXAS_HOCKEY_SEASON = '2026–27'",
  'Dallas Stars', 'Texas Stars', 'Allen Americans',
  'Amarillo Wranglers', 'Corpus Christi IceRays', 'El Paso Rhinos', 'Houston Bulls', 'Lone Star Brahmas', 'Odessa Jackalopes',
  'Texas Brahmas', 'West Texas Wranglers', 'Austin Ice Bats', 'Texas RoadRunners',
  'Baylor Bears Hockey', 'East Texas Baptist Tigers Hockey', 'SMU Mustangs Hockey', 'Texas A&M Aggies Hockey',
  'TCU Horned Frogs Hockey', 'Texas State Bobcats Hockey', 'Texas Longhorns Hockey', 'North Texas Mean Green Hockey',
  'George’s Pond at Hirsch Coliseum', 'ETBU 2026 Family Weekend / hockey home site',
  "slug: 'mid-cities-jr-stars'", "status: 'historical'",
  'American Airlines Center', 'H-E-B Center at Cedar Park', 'Credit Union of Texas Event Center', 'Comerica Center',
  'Amarillo Civic Center Complex', 'American Bank Center', 'El Paso County Coliseum', 'Deep South Ice & Sports Center',
  'NYTEX Sports Centre', 'Ector County Coliseum', 'Chaparral Ice at The Crossover', 'Amarillo Ice Ranch', 'Spirit Ice Arena',
  "secondaryVenuePath: '/sports-venue/comerica-center'", '2027 NHL Stadium Series',
]) requireText(data, marker, 'Texas hockey data');

for (const marker of [
  "createFileRoute('/texas-hockey')",
  'Texas hockey teams, leagues and arenas',
  'TEXAS_HOCKEY_ACTIVE_TEAMS.length',
  "'@type': 'CollectionPage'",
  "'@type': 'ItemList'",
  'Historical names',
  'Comerica Center — Allen Americans 2026–27 secondary date',
]) requireText(hub, marker, 'Texas hockey hub');

for (const marker of [
  "createFileRoute('/texas-hockey/teams/$slug')",
  "'@type': 'SportsTeam'",
  'buildMeta',
  'canonicalLink',
  'HockeyStayNearby',
  "'/city/' + team.citySlug",
  "'/county/' + team.countySlug",
  'hockeyVenuePathForTeam',
  'team.secondaryVenuePath',
  "team.status === 'active' && venuePath",
]) requireText(team, marker, 'Texas hockey team route');

for (const marker of [
  "createFileRoute('/texas-hockey/leagues/$slug')",
  "'@type': 'SportsOrganization'",
  "'@type': 'ItemList'",
  'texasHockeyTeamsForLeague',
]) requireText(league, marker, 'Texas hockey league route');

for (const marker of [
  "createFileRoute('/texas-hockey/venues/$slug')",
  "'@type': 'SportsActivityLocation'",
  'HockeyStayNearby',
  'encodeURIComponent(venue.address)',
  'texasHockeyTeamsForHockeyVenue',
]) requireText(venue, marker, 'Texas hockey venue route');

for (const marker of [
  'data-stay-nearby-slot',
  'data-hockey-stay-nearby-slot',
  'data-stay-context-kind="city"',
  'data-stay-allow-broad-fallback="true"',
  'TexasDefinedStayNearby',
  "kind: 'city'",
  'allowBroadFallback: true',
]) requireText(stay, marker, 'Hockey stay-nearby component');

requireText(publicRoutes, '"/texas-hockey"', 'Public route governance');
for (const marker of ['TEXAS_HOCKEY_LEAGUES', 'TEXAS_HOCKEY_ACTIVE_TEAMS', 'TEXAS_HOCKEY_VENUES', 'texasHockeyTeamPath', 'texasHockeyLeaguePath', 'texasHockeyVenuePath']) {
  requireText(sitemap, marker, 'Primary sitemap');
}
requireText(expedia, 'texas-hockey', 'Travel affiliate route eligibility');
requireText(expedia, '[data-stay-context-kind][data-stay-context-key]', 'Travel affiliate explicit-context support');
requireText(sports, 'to="/texas-hockey"', 'Sports hub discovery');
requireText(llms, 'https://texasdefined.com/texas-hockey', 'Machine discovery');
requireText(sportsVenueRoute, 'return <SportsVenueGuidePilotContent', 'Protected sports venue SSR route');
for (const marker of ['texasHockeyTeamsForVenuePath', 'texasHockeyTeamPath', 'Hockey teams at this venue', 'All Texas hockey →']) requireText(sportsVenuePilot, marker, 'Sports venue hockey cross-links');
for (const marker of ['TEXAS_HOCKEY_ACTIVE_TEAMS', "kind === 'city' ? team.citySlug === slug : team.countySlug === slug", 'Hockey in {name}', 'texasHockeyTeamPath', 'hockeyVenuePathForTeam']) requireText(entityHockey, marker, 'City/county hockey backlinks');
for (const marker of ['EntityHockeyTeams', "entity.kind === 'city' || entity.kind === 'county'"]) requireText(entityLazy, marker, 'City/county hockey integration');
for (const marker of ["'/texas-hockey'", "'/texas-hockey/teams/$slug'", "'/texas-hockey/leagues/$slug'", "'/texas-hockey/venues/$slug'"]) requireText(routeTree, marker, 'Generated hockey route tree');

const activeTeamCount = [...data.matchAll(/status: 'active'/g)].length;
if (activeTeamCount !== 21) failures.push('Expected exactly 21 current Texas hockey teams/programs; found ' + activeTeamCount + '.');

const leagueCounts = {
  nhl: [...data.matchAll(/leagueSlug: 'nhl', status: 'active'/g)].length,
  ahl: [...data.matchAll(/leagueSlug: 'ahl', status: 'active'/g)].length,
  echl: [...data.matchAll(/leagueSlug: 'echl', status: 'active'/g)].length,
  nahl: [...data.matchAll(/leagueSlug: 'nahl', status: 'active'/g)].length,
  na3hl: [...data.matchAll(/leagueSlug: 'na3hl', status: 'active'/g)].length,
  tchc: [...data.matchAll(/leagueSlug: 'tchc', status: 'active'/g)].length,
};
const expected = { nhl: 1, ahl: 1, echl: 1, nahl: 6, na3hl: 4, tchc: 8 };
for (const [key, value] of Object.entries(expected)) {
  if (leagueCounts[key] !== value) failures.push('Expected ' + value + ' active ' + key + ' Texas entries; found ' + leagueCounts[key] + '.');
}

if (failures.length) {
  console.error('Texas hockey authority validation failed:');
  for (const failure of failures) console.error('- ' + failure);
  process.exit(1);
}

console.log('Texas hockey authority contracts validated: 21 current teams/programs across six leagues/conferences, historical-name separation, team/league/venue routes, SEO/schema, city/county cross-links, lodging integration, sitemap discovery and sports/machine entry points.');
