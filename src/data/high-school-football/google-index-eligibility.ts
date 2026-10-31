import p from './google-index-eligibility.generated.json';
// Small static allowlists, no live Google API, full registry, or remote data on Worker requests.
const teams = new Set<string>(p.teamIndexableSlugs);
const districts = new Set<string>(p.districtIndexableSlugs);
export const isFootballTeamGoogleIndexReady = (slug: string) => teams.has(slug);
export const isFootballDistrictGoogleIndexReady = (slug: string) => districts.has(slug);
