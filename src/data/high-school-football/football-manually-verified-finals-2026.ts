/**
 * Individually checked November 6, 2026 varsity finals. This is an editorial
 * fact ledger, NOT a feed, crawler, or permission to publish unreviewed scores.
 * Every entry must match its existing UIL team + dated opponent fixture.
 * Partial season records must never be labeled complete or UIL-certified.
 */
export type ManuallyVerifiedTeamFinal = {
  slug: string;
  date: string;
  opponent: string;
  pointsFor: number;
  pointsAgainst: number;
  verifiedAt: string;
  primarySourceUrl: string;
  secondarySourceUrl: string;
  verificationMethod: 'manual-editorial-review';
};

export const FOOTBALL_MANUALLY_VERIFIED_2026_FINALS: readonly ManuallyVerifiedTeamFinal[] = [
  {
    slug: 'alief-taylor', date: '2026-11-06', opponent: 'Houston Lamar',
    pointsFor: 7, pointsAgainst: 24, verifiedAt: '2026-11-20',
    primarySourceUrl: 'https://www.houstonchronicle.com/sports/high-school/football/article/texas-high-school-football-scores-friday-22517637.php',
    secondarySourceUrl: 'https://www.maxpreps.com/tx/houston/alief-taylor-lions/football/',
    verificationMethod: 'manual-editorial-review',
  },
  {
    slug: 'alvarado', date: '2026-11-06', opponent: 'Decatur',
    pointsFor: 28, pointsAgainst: 49, verifiedAt: '2026-11-20',
    primarySourceUrl: 'https://www.houstonchronicle.com/sports/high-school/football/article/texas-high-school-football-scores-friday-22517637.php',
    secondarySourceUrl: 'https://www.maxpreps.com/tx/alvarado/alvarado-indians/football/schedule/',
    verificationMethod: 'manual-editorial-review',
  },
  {
    slug: 'amarillo', date: '2026-11-06', opponent: 'Caprock',
    pointsFor: 52, pointsAgainst: 3, verifiedAt: '2026-11-20',
    primarySourceUrl: 'https://www.newschannel10.com/2026/11/07/week-11-high-school-football-recap-canyon-hangs-beat-dumas-highland-park-storms-back-down-sunray-more/',
    secondarySourceUrl: 'https://www.maxpreps.com/tx/amarillo/amarillo-sandies/football/',
    verificationMethod: 'manual-editorial-review',
  },
  {
    slug: 'amarillo-caprock', date: '2026-11-06', opponent: 'Amarillo',
    pointsFor: 3, pointsAgainst: 52, verifiedAt: '2026-11-20',
    primarySourceUrl: 'https://www.newschannel10.com/2026/11/07/week-11-high-school-football-recap-canyon-hangs-beat-dumas-highland-park-storms-back-down-sunray-more/',
    secondarySourceUrl: 'https://www.maxpreps.com/tx/amarillo/caprock-longhorns/football/',
    verificationMethod: 'manual-editorial-review',
  },
  {
    slug: 'amarillo-river-road', date: '2026-11-06', opponent: 'Canadian',
    pointsFor: 0, pointsAgainst: 59, verifiedAt: '2026-11-20',
    primarySourceUrl: 'https://www.si.com/high-school/stats/texas/25001-division-3a2-region-1-district-1/football/scores?date=2026-11-06',
    secondarySourceUrl: 'https://www.maxpreps.com/tx/canadian/canadian-wildcats/football/',
    verificationMethod: 'manual-editorial-review',
  },
  {
    slug: 'amarillo-highland-park', date: '2026-11-06', opponent: 'Sunray',
    pointsFor: 48, pointsAgainst: 47, verifiedAt: '2026-11-20',
    primarySourceUrl: 'https://www.aol.com/articles/scores-every-week-11-high-172040000.html',
    secondarySourceUrl: 'https://www.maxpreps.com/tx/amarillo/highland-park-hornets/football/',
    verificationMethod: 'manual-editorial-review',
  },
  {
    slug: 'anderson-shiro', date: '2026-11-06', opponent: 'Rogers',
    pointsFor: 14, pointsAgainst: 23, verifiedAt: '2026-11-20',
    primarySourceUrl: 'https://www.si.com/high-school/texas/texas-high-school-football-final-scores-results-november-6-01m6rw22dr0m',
    secondarySourceUrl: 'https://www.maxpreps.com/tx/anderson/anderson-shiro-fighting-owls/football/',
    verificationMethod: 'manual-editorial-review',
  },
  {
    slug: 'anson', date: '2026-11-06', opponent: 'Hico',
    pointsFor: 45, pointsAgainst: 21, verifiedAt: '2026-11-20',
    primarySourceUrl: 'https://www.si.com/high-school/texas/texas-high-school-football-final-scores-results-november-6-01m6rw22dr0m',
    secondarySourceUrl: 'https://www.maxpreps.com/tx/anson/anson-tigers/football/',
    verificationMethod: 'manual-editorial-review',
  },
  {
    slug: 'ballinger', date: '2026-11-06', opponent: 'Ozona',
    pointsFor: 35, pointsAgainst: 36, verifiedAt: '2026-11-20',
    primarySourceUrl: 'https://ozonastockman.com/articles/1643/view/high-school-football-roundup-ozona-to-compete-in-post-season',
    secondarySourceUrl: 'https://www.maxpreps.com/tx/ozona/ozona-lions/football/',
    verificationMethod: 'manual-editorial-review',
  },
];
