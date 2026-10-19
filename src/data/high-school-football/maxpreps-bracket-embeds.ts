/**
 * Only embed code explicitly issued by MaxPreps may be configured here.
 * The public tournament page and UIL bracket page are NOT embed URLs.
 *
 * MaxPreps requires a signed-in account to generate a tournament widget.
 * Do not guess or derive embed URLs, scrape brackets, or proxy provider HTML.
 * Store only the iframe src from MaxPreps' official generated embed snippet.
 * If their generated code uses a different integration type, review it first.
 *
 * These public URLs are not credentials. Leave entries absent until verified.
 */
export type TexasFootballBracketKey =
  `${'1A'|'2A'|'3A'|'4A'|'5A'|'6A'}D${1|2}`;

export const maxPrepsTournamentEmbedUrls: Partial<Record<TexasFootballBracketKey, string>> = {
  // '6AD1': 'https://<actual MaxPreps-issued iframe URL>',
};

export function approvedMaxPrepsTournamentEmbedUrl(
  classification: string,
  division: 1 | 2,
): string | null {
  const key = `${classification}D${division}` as TexasFootballBracketKey;
  const value = maxPrepsTournamentEmbedUrls[key];
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:'
      || !['www.maxpreps.com', 'maxpreps.com', 'widgets.maxpreps.com'].includes(url.hostname)
      || url.username || url.password || url.hash
      || !/(?:^|\/)(?:widgets?|embed|brackets?)(?:\/|$)/i.test(url.pathname)
      || /create_tournament_widget\.aspx|view\.aspx/i.test(url.pathname)) return null;
    return url.href;
  } catch {
    return null;
  }
}
