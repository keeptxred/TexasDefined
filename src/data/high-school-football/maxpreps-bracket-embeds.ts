import type { MaxPrepsTournamentWidgetConfig } from '@/components/sports/MaxPrepsTournamentWidget';

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

/**
 * Provider-generated code pasted by the owner on 2026-10-20. This is the
 * official MaxPreps JavaScript anchor widget, NOT an iframe URL.
 *
 * Do not generate the remaining 11 widget memberships by guessing from this
 * one. They continue to use official UIL / MaxPreps source links until each
 * legitimate provider-generated widget snippet has been verified.
 */
export const approvedMaxPrepsJsTournamentWidgets: Partial<
  Record<TexasFootballBracketKey, MaxPrepsTournamentWidgetConfig>
> = {
  '6AD1': {
    title: '2026 UIL Texas Football State Championships 2026 Football Conference 6A D1',
    href: 'https://www.maxpreps.com/tournament/view.aspx?tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&bracketid=ade72ad3-0f62-42ef-a2cb-143bf425942b',
    memberId: '8ada50e8-19a3-462f-9a14-ca430a481250',
    width: 900,
    height: 600,
    allowScrollbar: true,
  },
};

export function approvedMaxPrepsJsTournamentWidget(classification: string, division: 1 | 2) {
  const key = `${classification}D${division}` as TexasFootballBracketKey;
  return Object.prototype.hasOwnProperty.call(approvedMaxPrepsJsTournamentWidgets, key)
    ? approvedMaxPrepsJsTournamentWidgets[key] ?? null
    : null;
}

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
