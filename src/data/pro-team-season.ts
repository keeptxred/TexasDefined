export type TeamSeason = { record?: string; standing?: string; season?: string; retrievedAt: string; sourceUrl: string };
type ProviderTeam = { id?: string; displayName?: string; record?: { items?: { type?: string; name?: string; summary?: string }[] }; standingSummary?: string };
export function normalizeTeamName(value: string) { return value.toLowerCase().replace(/[^a-z0-9]/g, ''); }
export function parseTeamSeason(payload: { team?: ProviderTeam; season?: { displayName?: string; year?: number } }, names: readonly string[], sourceUrl: string, now = new Date()): TeamSeason | null {
  const team = payload?.team;
  if (!team?.displayName || !names.some((name) => normalizeTeamName(name) === normalizeTeamName(team.displayName!))) return null;
  const item = team.record?.items?.find((row) => row.type === 'total' || row.name === 'overall');
  const record = item?.summary && /^\d{1,3}\s*-\s*\d{1,3}(?:\s*-\s*\d{1,3})?$/.test(item.summary) ? item.summary : undefined;
  const standing = typeof team.standingSummary === 'string' && team.standingSummary.length <= 140 ? team.standingSummary : undefined;
  if (!record && !standing) return null;
  return { record, standing, season: payload.season?.displayName ?? (payload.season?.year ? String(payload.season.year) : undefined), retrievedAt: now.toISOString(), sourceUrl };
}

export type MajorTeamUpdate = { label: string; url: string; publishedAt: string };
export function selectMajorTeamUpdates(articles: { headline?: string; published?: string; links?: { web?: { href?: string } }; categories?: { type?: string; teamId?: number | string }[] }[], teamId: string, now = new Date()): MajorTeamUpdate[] {
  const major = /\b(trade[sd]?|acquir(?:e[sd]?|ing)|head coach|coach(?:ing)? change|retires?|retirement|contract extension|draft(?:s|ed)?|signs? (?:star|all-star|max))\b/i;
  return articles.filter((article) => {
    const age = now.getTime() - Date.parse(article.published ?? '');
    const url = article.links?.web?.href;
    let safe = false;
    try { const parsed = new URL(url ?? ''); safe = parsed.protocol === 'https:' && (parsed.hostname === 'www.espn.com' || parsed.hostname === 'espn.com'); } catch { /* absent or invalid source */ }
    return safe && Number.isFinite(age) && age >= 0 && age <= 21 * 86400000
      && major.test(article.headline ?? '') && !/\b(rumou?rs?|could|might|mock draft|predictions?|fantasy|betting|odds)\b/i.test(article.headline ?? '')
      && new Set(article.categories?.filter((category) => category.type === 'team').map((category) => String(category.teamId))).size <= 2
      && article.categories?.some((category) => category.type === 'team' && String(category.teamId) === teamId);
  }).sort((a, b) => Date.parse(b.published!) - Date.parse(a.published!))
    .filter((article, index, all) => all.findIndex((other) => other.links?.web?.href === article.links?.web?.href) === index)
    .slice(0, 3).map((article) => ({ label: article.headline!.split(/\s+/).slice(0, 16).join(' '), url: article.links!.web!.href!, publishedAt: article.published! }));
}
