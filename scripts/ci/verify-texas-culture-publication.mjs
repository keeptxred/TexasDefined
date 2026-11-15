/**
 * Fail-closed bounded publication acceptance for the ten Texas culture guides
 * remediated in PR #7229. Canonical, build and status-only checks are not proof
 * that an edge cache served the editorial revision actually merged to main.
 */
export const TEXAS_CULTURE_PUBLICATION_MARKERS = Object.freeze({
  '/things-unique-to-texas/landmarks': 'How to evaluate a Texas landmark beyond a photo',
  '/things-unique-to-texas/roadside-small-towns': 'How to tell a roadside landmark from a useful small-town stop',
  '/things-unique-to-texas/culture-music': 'Why Texas has several musical histories, not one signature sound',
  '/things-unique-to-texas/wildlife-landscape': 'Match Texas wildlife to its habitat instead of treating the state as one ecosystem',
  '/things-unique-to-texas/slang-folklore': 'Four kinds of Texas shorthand: speech, slogans, symbols and stories',
  '/texas-food-history': 'Five turning points behind the Texas table',
  '/texas-food-trail': 'Plan two food-focused days without crossing the state',
  '/texas-roadside-oddities': 'Which stops require a plan before arriving?',
  '/texas-slang-explained': 'What the research can—and cannot—show',
  '/what-does-chud-mean': 'Dictionary and trend-report sources',
});

const archivalPath = '/what-does-chud-mean';
const obsoleteAdministrativeDisclaimer = 'Current fees, eligibility, deadlines, appointments, rules and transactions';
const obsoleteRoadsideCount = '40 Texas roadside and small-town icons';

export function assertTexasCulturePublication(path, html, surface) {
  const marker = TEXAS_CULTURE_PUBLICATION_MARKERS[path];
  if (!marker) return;
  if (typeof html !== 'string' || !html.includes(marker)) {
    throw new Error('Texas culture authority content missing or stale on ' + path + ' (' + surface + '): ' + marker);
  }
  const robotsTag = [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((match) => match[0])
    .find((tag) => /\bname\s*=\s*["']robots["']/i.test(tag));
  const isNoindex = Boolean(robotsTag && /\bcontent\s*=\s*["'][^"']*\bnoindex\b/i.test(robotsTag));
  if (path === archivalPath && !isNoindex) {
    throw new Error('Off-topic Texas culture slang archive incorrectly indexable on ' + surface);
  }
  if (path !== archivalPath && isNoindex) {
    throw new Error('Texas culture authority page unexpectedly noindexed: ' + path + ' (' + surface + ')');
  }
  if (path === archivalPath && html.includes(obsoleteAdministrativeDisclaimer)) {
    throw new Error('Unrelated government services disclaimer persists on slang archive (' + surface + ')');
  }
  if (path === '/texas-roadside-oddities' && html.includes(obsoleteRoadsideCount)) {
    throw new Error('Texas roadside collection count remains stale on ' + surface);
  }
}
