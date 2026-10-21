import { normalizeTeamName, parseTeamSeason, selectMajorTeamUpdates } from './pro-team-season';

type TeamLiveInput = { apiLeague: string; apiNames: readonly string[] };
type CachedJson = { retrievedAt: string; payload: unknown };
type EdgeCache = { match(request: Request): Promise<Response | undefined>; put(request: Request, response: Response): Promise<void> };

// Bounded, optional enrichment. A provider outage never prevents the trip guide
// from rendering, and no failed response becomes a fabricated zero record.
export async function loadProTeamLiveServer(team: TeamLiveInput) {
  const signal = AbortSignal.timeout(3500);
  const cache = (globalThis as unknown as { caches?: { default?: EdgeCache } }).caches?.default;
  const root = `https://site.api.espn.com/apis/site/v2/sports/${team.apiLeague}`;
  async function json(url: string): Promise<CachedJson> {
    const key = new Request(url);
    try {
      const hit = await cache?.match(key);
      if (hit) {
        const value = await hit.json() as CachedJson;
        const age = Date.now() - Date.parse(value.retrievedAt);
        if (age >= 0 && age < 900000) return value;
      }
    } catch { /* cache is optional */ }
    const response = await fetch(url, { signal, headers: { accept: 'application/json' } });
    if (!response.ok) throw new Error(`Sports source returned ${response.status}`);
    const reader = response.body?.getReader();
    if (!reader) throw new Error('Sports source response has no body');
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    for (;;) {
      const { value: chunk, done } = await reader.read();
      if (done) break;
      bytes += chunk.byteLength;
      if (bytes > 1000000) { await reader.cancel(); throw new Error('Sports source response exceeds byte limit'); }
      chunks.push(chunk);
    }
    const body = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
    const value = { retrievedAt: new Date().toISOString(), payload: JSON.parse(new TextDecoder().decode(body)) };
    try { await cache?.put(key, new Response(JSON.stringify(value), { headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=900' } })); } catch { /* source result remains usable */ }
    return value;
  }
  try {
    const list = await json(`${root}/teams?limit=100`);
    const league = list.payload as { sports?: { leagues?: { teams?: { team: { id: string; displayName: string } }[] }[] }[] };
    const found = league.sports?.flatMap((sport) => sport.leagues ?? []).flatMap((entry) => entry.teams ?? [])
      .find(({ team: candidate }) => team.apiNames.some((name) => normalizeTeamName(name) === normalizeTeamName(candidate.displayName)))?.team;
    if (!found || !/^\d+$/.test(found.id)) return { season: null, updates: [] };
    const [detail, news] = await Promise.allSettled([json(`${root}/teams/${found.id}`), json(`${root}/news?team=${found.id}&limit=20`)]);
    const season = detail.status === 'fulfilled'
      ? parseTeamSeason(detail.value.payload as Parameters<typeof parseTeamSeason>[0], team.apiNames, `https://www.espn.com/${team.apiLeague.startsWith('soccer/') ? 'soccer' : team.apiLeague.split('/')[1]}/team/_/id/${found.id}`, new Date(detail.value.retrievedAt)) : null;
    const updates = news.status === 'fulfilled'
      ? selectMajorTeamUpdates((news.value.payload as { articles?: Parameters<typeof selectMajorTeamUpdates>[0] }).articles ?? [], found.id) : [];
    return { season, updates };
  } catch { return { season: null, updates: [] }; }
}
