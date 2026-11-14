type TeamEvent = { category: string; title: string; venueId?: string; status: string; startDate: string; sport?: { teamNames: string[] } };
// Both venue AND full team identity must match. Never turn every concert in a
// shared arena into a home game, or a parking pass into a game ticket.
export function isProTeamHomeGame(event: TeamEvent, team: { name: string; apiNames: readonly string[]; venues: readonly string[] }) {
  if (event.category !== 'sport' || event.status !== 'scheduled' || !team.venues.some((slug) => event.venueId === `sports-venue:${slug}`)) return false;
  if (/\b(parking|tour|tailgat(?:e|ing)|watch party|season tickets?|season pass|deposit|package)\b/i.test(event.title)) return false;
  if (!/\b(?:vs?\.?|versus|at)\s/i.test(event.title)) return false;
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const title = ` ${normalize(event.title)} `;
  return [team.name, ...team.apiNames].some((name) => title.includes(` ${normalize(name)} `));
}
