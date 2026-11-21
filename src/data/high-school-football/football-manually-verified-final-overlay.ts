import snapshot from './football-manually-verified-finals-2026.snapshot.json';
import type { FootballProgramEditorial } from './program-editorial';

type Editorial = FootballProgramEditorial | null;
type Game = NonNullable<FootballProgramEditorial['season']>['games'][number];
type Verified = {
  slug: string; date: string; opponent: string; pointsFor: number;
  pointsAgainst: number; verifiedAt: string; primarySourceUrl: string;
  secondarySourceUrl: string; verificationMethod: 'manual-editorial-review';
};
const registry = snapshot.verifiedFinals as readonly Verified[];
const normalized = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ');

/** A reviewed, manually published score ledger is applied at render time.
 * No fetches or result inference; an unexpected opponent, date, or conflicting
 * existing final rejects publication rather than silently rewriting a score. */
export function applyManuallyVerifiedFootballFinals(editorial: Editorial, slug: string): Editorial {
  const updates = registry.filter(row => row.slug === slug);
  if (!updates.length) return editorial;
  if (snapshot.schemaVersion !== 1 || snapshot.season !== '2026' ||
      !editorial?.season?.games?.length) throw Error('Source-backed football result missing an authored 2026 season: '+slug);
  const publishedDates = new Set<string>();
  for (const row of updates) {
    const first = new URL(row.primarySourceUrl), second = new URL(row.secondarySourceUrl);
    if (!/^2026-\d{2}-\d{2}$/.test(row.date) ||
        !/^2026-\d{2}-\d{2}$/.test(row.verifiedAt) ||
        row.verificationMethod !== 'manual-editorial-review' ||
        !Number.isInteger(row.pointsFor) || !Number.isInteger(row.pointsAgainst) ||
        Math.min(row.pointsFor,row.pointsAgainst)<0 || row.pointsFor===row.pointsAgainst ||
        first.protocol !== 'https:' || second.protocol !== 'https:' ||
        first.hostname === second.hostname ||
        publishedDates.has(row.date)) throw Error('Unapproved duplicate or invalid football final: '+slug+' '+row.date);
    publishedDates.add(row.date);
  }
  const found = new Set<string>(), corrections = new Set<string>();
  const games: Game[] = editorial.season.games.map(game => {
    const row = updates.find(result => result.date === game.date);
    if (!row) return game;
    if (normalized(game.opponent)!==normalized(row.opponent)) throw Error(
      'Football postgame opponent mismatch, no score published: '+slug+' '+row.date);
    const result=(row.pointsFor>row.pointsAgainst?'W ':'L ')+row.pointsFor+'–'+row.pointsAgainst;
    if (game.result && game.result !== result) throw Error(
      'Football source result conflicts with previously published final: '+slug+' '+row.date);
    found.add(row.date);
    if (!game.result) corrections.add(row.date);
    return {...game,result};
  });
  for (const row of updates) if (!found.has(row.date)) throw Error(
    'Unlisted football fixture, refusing to publish result: '+slug+' '+row.date);
  if (!corrections.size) return editorial;
  const completed=games.filter(game=>/^[WLT] /.test(game.result??''));
  const won=completed.filter(game=>game.result?.startsWith('W ')).length;
  const lost=completed.filter(game=>game.result?.startsWith('L ')).length;
  const tied=completed.filter(game=>game.result?.startsWith('T ')).length;
  const districtGames=completed.filter(game=>game.district);
  const districtWins=districtGames.filter(game=>game.result?.startsWith('W ')).length;
  const districtLosses=districtGames.filter(game=>game.result?.startsWith('L ')).length;
  const record=won+'–'+lost+(tied?'–'+tied:'')+' in '+completed.length+
    ' individually verified listed final'+(completed.length===1?'':'s')+
    ' (partial season snapshot'+(districtGames.length?'; '+districtWins+'–'+districtLosses+' among listed district finals':'')+')';
  const mostRecent=updates.reduce((latest,row)=>row.date>latest.date?row:latest);
  const headline=mostRecent.pointsFor>mostRecent.pointsAgainst?'won':'lost';
  const displayedName=slug.split('-').map(part=>part.slice(0,1).toUpperCase()+part.slice(1)).join(' ');
  const gameDate=new Intl.DateTimeFormat('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'})
    .format(new Date(mostRecent.date+'T12:00:00Z'));
  const updateNotice=displayedName+' '+headline+' '+mostRecent.pointsFor+'–'+mostRecent.pointsAgainst+
    ' against '+mostRecent.opponent+' on '+gameDate+', independently reviewed '+mostRecent.verifiedAt+'.'+
    ' This is a source-dated published result, not live scores. Other fixtures without confirmed finals remain unverified.';
  const original=editorial.season;
  return {
    ...editorial,
    overview:[updateNotice,...(editorial.overview??[])],
    season:{
      ...original,games,record,
      recordLabel:'Partial 2026 scorecard from independently verified final results, NOT full-season standings',
      verifiedAt:mostRecent.verifiedAt>original.verifiedAt?mostRecent.verifiedAt:original.verifiedAt,
      latestResultSourceUrl:mostRecent.primarySourceUrl,
    },
    seo:editorial.seo?{...editorial.seo,description:
      displayedName+' football 2026: '+mostRecent.opponent+' '+mostRecent.pointsFor+'–'+
      mostRecent.pointsAgainst+' on '+gameDate+'. '+completed.length+
      ' independently checked reported scores; remaining 2026 results await confirmation.'}:editorial.seo,
    faq:editorial.faq?.map(entry=>/(2026.*record|record.*2026)/i.test(entry.question)
      ?{...entry,answer:record+'. Additional dated results require independently published sources.'}
      :entry)??[],
  };
}
