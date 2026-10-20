import { useEffect, useState } from 'react';

import { trackTexasDefinedOutcome } from '@/platform/analytics';
import { FootballFanOffers } from '@/components/sports/FootballFanOffers';

type FootballGame = {
  date: string;
  opponent: string;
  site: 'Home' | 'Away' | 'Neutral';
  result?: string;
  district?: boolean;
  kickoff?: string;
};

type FootballSeason = {
  record?: string;
  verifiedAt: string;
  sourceUrl: string;
  sourceLabel: string;
  games: FootballGame[];
};

type FootballSource = {
  ticketUrl?: string;
  officialScheduleUrl?: string;
  sourceUrl: string;
  sourceLabel: string;
  verifiedAt: string;
};

type FootballVenue = {
  policyUrl?: string;
  name: string;
  address?: string;
  sourceUrl: string;
  verifiedAt: string;
};

type FootballVenueLink = {
  venueName: string;
  venuePath: string;
  relationshipLabel: string;
};

export type FootballGameNightGuideProps = {
  slug: string;
  footballName: string;
  schoolWebsite?: string | null;
  schedule?: FootballSource | null;
  season?: FootballSeason | null;
  venue?: FootballVenue | null;
  venueLink?: FootballVenueLink | null;
  hasSeasonSection?: boolean;
  // The profile header already shows record, latest result and next listed fixture.
  // Avoid repeating those large panels in the game-night planning box.
  summaryAlreadyShown?: boolean;
};

/** Use the Texas calendar day; game dates are date-only editorial snapshots, not kickoff times. */
function texasToday() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const value = (part: string) => parts.find((item) => item.type === part)?.value || '';
  return [value('year'), value('month'), value('day')].join('-');
}

function nextListedGame(games: FootballGame[], today: string): FootballGame | null {
  return games.find((game) => /^\d{4}-\d{2}-\d{2}$/.test(game.date) && game.date >= today && !game.result) ?? null;
}

function recordAction(slug: string, step: string, destination: string) {
  trackTexasDefinedOutcome('next_step_selected', {
    resourceId: `football:${slug}:${step}`,
    entityKind: 'high-school-football-game-night',
    destination,
  });
}

export function FootballGameNightGuide({
  slug,
  footballName,
  schoolWebsite,
  schedule,
  season,
  venue,
  venueLink,
  hasSeasonSection = false,
  summaryAlreadyShown = false,
}: FootballGameNightGuideProps) {
  // Keep server and initial client markup identical; the date-sensitive card appears after hydration.
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(texasToday()), []);

  const upcoming = today && season ? nextListedGame(season.games, today) : null;
  const hasUpcomingAwayTravel = Boolean(today && season?.games.some((game) =>
    /^\d{4}-\d{2}-\d{2}$/.test(game.date) && game.date >= today && !game.result && (game.site === 'Away' || game.site === 'Neutral')));
  const officialUrl = schoolWebsite?.startsWith('https://') ? schoolWebsite : null;
  const scheduleUrl = schedule?.sourceUrl?.startsWith('https://')
    ? schedule.sourceUrl
    : season?.sourceUrl?.startsWith('https://') ? season.sourceUrl : null;
  const venueUrl = venueLink?.venuePath?.startsWith('/sports-venue/') ? venueLink.venuePath : null;
  const ticketUrl = schedule?.ticketUrl?.startsWith('https://') ? schedule.ticketUrl : null;
  const schoolScheduleUrl = schedule?.officialScheduleUrl?.startsWith('https://') ? schedule.officialScheduleUrl : null;
  const stadiumRulesUrl = venue?.policyUrl?.startsWith('https://') ? venue.policyUrl : null;

  return (
    <aside aria-label={`${footballName} game-night planning`} className="border-b border-border bg-surface px-4 py-6 sm:px-8 sm:py-9">
      <p className="eyebrow text-primary">Plan your Friday night</p>
      <h2 className="mt-2 font-display text-2xl leading-tight sm:text-4xl">Game-night essentials</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
        {footballName}: confirm the current schedule, actual game venue and admission directly before you travel.
        TexasDefined is an independent guide, not a school or ticket seller.
      </p>

      {!summaryAlreadyShown && season?.record && (
        <div className="mt-5 flex flex-wrap items-center border-b border-border" style={{ columnGap: 24, rowGap: 8, paddingBlock: 16 }}>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Verified season snapshot</p>
            <p className="mt-2 font-display text-2xl font-semibold">{season.record}</p>
          </div>
          <p className="text-xs leading-6 text-muted-foreground">Checked {season.verifiedAt}. Results and standings are not live.</p>
        </div>
      )}
      {!summaryAlreadyShown && upcoming && season && (
        <div className="mt-5 border-l-4 border-primary bg-background p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Next game listed in our dated schedule</p>
          <p className="mt-2 font-display text-2xl">{upcoming.date} · {upcoming.opponent}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Listed as {upcoming.site.toLowerCase()}{upcoming.district ? ' · district matchup' : ''}{upcoming.kickoff ? ` · Listed kickoff ${upcoming.kickoff}` : ''}. Confirm stadium, tickets and any changes with the host.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Schedule snapshot checked {season.verifiedAt}; not a live game feed.</p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        {scheduleUrl && (
          <a href={scheduleUrl} target="_blank" rel="noopener noreferrer"
            onClick={() => recordAction(slug, 'schedule', scheduleUrl)}
            className="inline-flex min-h-11 items-center justify-center border border-primary bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Verify schedule and results ↗
          </a>
        )}
        {ticketUrl && (
          <a href={ticketUrl} target="_blank" rel="noopener noreferrer"
            onClick={() => recordAction(slug, 'official-home-tickets', ticketUrl)}
            className="inline-flex min-h-11 items-center justify-center border border-border bg-background px-4 py-3 text-sm font-semibold hover:border-primary hover:text-primary">
            Official home tickets ↗
          </a>
        )}
        {schoolScheduleUrl && (
          <a href={schoolScheduleUrl} target="_blank" rel="noopener noreferrer"
            onClick={() => recordAction(slug, 'official-school-schedule', schoolScheduleUrl)}
            className="inline-flex min-h-11 items-center justify-center border border-border bg-background px-4 py-3 text-sm font-semibold hover:border-primary hover:text-primary">
            School's published schedule ↗
          </a>
        )}
        {stadiumRulesUrl && (
          <a href={stadiumRulesUrl} target="_blank" rel="noopener noreferrer"
            onClick={() => recordAction(slug, 'official-stadium-rules', stadiumRulesUrl)}
            className="inline-flex min-h-11 items-center justify-center border border-border bg-background px-4 py-3 text-sm font-semibold hover:border-primary hover:text-primary">
            Stadium entry rules ↗
          </a>
        )}
        {officialUrl && (
          <a href={officialUrl} target="_blank" rel="noopener noreferrer"
            onClick={() => recordAction(slug, 'school-website', officialUrl)}
            className="inline-flex min-h-11 items-center justify-center border border-border bg-background px-4 py-3 text-sm font-semibold hover:border-primary hover:text-primary">
            School information ↗
          </a>
        )}
        {hasSeasonSection && (
          <a href="#football-current-season"
            onClick={() => recordAction(slug, 'season-section', '#football-current-season')}
            className="inline-flex min-h-11 items-center justify-center border border-border bg-background px-4 py-3 text-sm font-semibold hover:border-primary hover:text-primary">
            2026 results &amp; schedule ↓
          </a>
        )}
        {venueUrl && (
          <a href={venueUrl} onClick={() => recordAction(slug, 'venue-guide', venueUrl)}
            className="inline-flex min-h-11 items-center justify-center border border-border bg-background px-4 py-3 text-sm font-semibold hover:border-primary hover:text-primary">
            Stadium guide →
          </a>
        )}
      </div>
      {venue && (
        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          <strong className="text-foreground">Sourced venue relationship:</strong> {venue.name}{venue.address ? <> — {venue.address}</> : null}.
          Confirm the actual game's host, entrance and parking before leaving.
          {' '}<a href={venue.sourceUrl} onClick={() => recordAction(slug, 'venue-source', venue.sourceUrl)}
            target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">
            Venue source ↗
          </a>
        </p>
      )}
      {!venue && venueLink && (
        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          <strong className="text-foreground">Related football venue:</strong> {venueLink.venueName} ({venueLink.relationshipLabel}).
          This does not establish the location of the next game.
        </p>
      )}

      <FootballFanOffers slug={slug} hasUpcomingAwayTravel={hasUpcomingAwayTravel} />

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-5 text-sm">
        {slug !== 'aubrey' && <><span className="text-muted-foreground">Looking for Texas gear?</span>
        <a href="/shop" onClick={() => recordAction(slug, 'texas-gear', '/shop')}
          className="font-semibold text-primary underline underline-offset-4">
          Browse the TexasDefined shop →
        </a>
        <span className="text-xs text-muted-foreground">Independent designs, not official school merchandise.</span></>}
        <a href="/texas-high-school-football-matchups" className="font-semibold text-primary underline underline-offset-4">Scores &amp; matchups →</a>
        <a href="/texas-high-school-football-playoff-brackets" className="font-semibold text-primary underline underline-offset-4">Playoff brackets →</a>
      </div>
    </aside>
  );
}
