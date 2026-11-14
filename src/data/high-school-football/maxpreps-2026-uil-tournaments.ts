import type { TexasFootballBracketKey } from './maxpreps-bracket-embeds';

/**
 * Official UIL 2026 postseason tournaments, individually confirmed from
 * https://www.uiltexas.org/football/playoff-brackets and each MaxPreps
 * "Add to My Site" link on October 19, 2026.
 *
 * This is PUBLIC navigation metadata, NOT provider-issued embed code.
 * Provider sign-in is still necessary to generate an allowed embed snippet.
 * Never interpret the widget creation URL as an iframe src or a score feed.
 */
export const officialMaxPrepsTournaments2026: Record<TexasFootballBracketKey, {
  tournamentUrl: string;
  widgetCreationUrl: string;
}> = {
  '1AD1': {
    tournamentUrl: 'https://www.maxpreps.com/tournament/T9IzeuJN60OqN3mH1cM0qw/IuzmvSjJGUCgEey9bxuuZw/football-26/2026-uil-texas-football-state-championships-2026-football-6-man-1a-d1.htm',
    widgetCreationUrl: 'https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=bde6ec22-c928-4019-a011-ecbd6f1bae67&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab',
  },
  '1AD2': {
    tournamentUrl: 'https://www.maxpreps.com/tournament/T9IzeuJN60OqN3mH1cM0qw/KSf9AtzHO0qdGcxJLZzj2w/football-26/2026-uil-texas-football-state-championships-2026-football-6-man-1a-d2.htm',
    widgetCreationUrl: 'https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=02fd2729-c7dc-4a3b-9d19-cc492d9ce3db&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab',
  },
  '2AD1': {
    tournamentUrl: 'https://www.maxpreps.com/tournament/T9IzeuJN60OqN3mH1cM0qw/rLBY1SGZOka6yqc8JiA-OA/football-26/2026-uil-texas-football-state-championships-2026-football-conference-2a-d1.htm',
    widgetCreationUrl: 'https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=d558b0ac-9921-463a-baca-a73c26203e38&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab',
  },
  '2AD2': {
    tournamentUrl: 'https://www.maxpreps.com/tournament/T9IzeuJN60OqN3mH1cM0qw/XZGmaAD6qk-NrhqmU1Ar5A/football-26/2026-uil-texas-football-state-championships-2026-football-conference-2a-d2.htm',
    widgetCreationUrl: 'https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=68a6915d-fa00-4faa-8dae-1aa653502be4&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab',
  },
  '3AD1': {
    tournamentUrl: 'https://www.maxpreps.com/tournament/T9IzeuJN60OqN3mH1cM0qw/il2A4x778EusgRk6t5UYDQ/football-26/2026-uil-texas-football-state-championships-2026-football-conference-3a-d1.htm',
    widgetCreationUrl: 'https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=e3805d8a-fb1e-4bf0-ac81-193ab795180d&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab',
  },
  '3AD2': {
    tournamentUrl: 'https://www.maxpreps.com/tournament/T9IzeuJN60OqN3mH1cM0qw/49_sTsweqEqmuXEnk5KIrg/football-26/2026-uil-texas-football-state-championships-2026-football-conference-3a-d2.htm',
    widgetCreationUrl: 'https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=4eecdfe3-1ecc-4aa8-a6b9-7127939288ae&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab',
  },
  '4AD1': {
    tournamentUrl: 'https://www.maxpreps.com/tournament/T9IzeuJN60OqN3mH1cM0qw/JKMjB4e-2kmUYUBjwilOkA/football-26/2026-uil-texas-football-state-championships-2026-football-conference-4a-d1.htm',
    widgetCreationUrl: 'https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=0723a324-be87-49da-9461-4063c2294e90&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab',
  },
  '4AD2': {
    tournamentUrl: 'https://www.maxpreps.com/tournament/T9IzeuJN60OqN3mH1cM0qw/Qa_WshJMxEaACBr4Xd5zQQ/football-26/2026-uil-texas-football-state-championships-2026-football-conference-4a-d2.htm',
    widgetCreationUrl: 'https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=b2d6af41-4c12-46c4-8008-1af85dde7341&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab',
  },
  '5AD1': {
    tournamentUrl: 'https://www.maxpreps.com/tournament/T9IzeuJN60OqN3mH1cM0qw/UtLETD3SrUG3BnYdZc3-WA/football-26/2026-uil-texas-football-state-championships-2026-football-conference-5a-d1.htm',
    widgetCreationUrl: 'https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=4cc4d252-d23d-41ad-b706-761d65cdfe58&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab',
  },
  '5AD2': {
    tournamentUrl: 'https://www.maxpreps.com/tournament/T9IzeuJN60OqN3mH1cM0qw/tLjwFS0ZCEKCjE8m85zmqA/football-26/2026-uil-texas-football-state-championships-2026-football-conference-5a-d2.htm',
    widgetCreationUrl: 'https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=15f0b8b4-192d-4208-828c-4f26f39ce6a8&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab',
  },
  '6AD1': {
    tournamentUrl: 'https://www.maxpreps.com/tournament/T9IzeuJN60OqN3mH1cM0qw/0yrnrWIP70KiyxQ79CWUKw/football-26/2026-uil-texas-football-state-championships-2026-football-conference-6a-d1.htm',
    widgetCreationUrl: 'https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=ade72ad3-0f62-42ef-a2cb-143bf425942b&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab',
  },
  '6AD2': {
    tournamentUrl: 'https://www.maxpreps.com/tournament/T9IzeuJN60OqN3mH1cM0qw/6_8tQbSNWkCQ2Ng1s6bKIw/football-26/2026-uil-texas-football-state-championships-2026-football-conference-6a-d2.htm',
    widgetCreationUrl: 'https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=412dffeb-8db4-405a-90d8-d835b3a6ca23&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab',
  },
};

export function officialMaxPrepsTournament2026(classification: string, division: 1 | 2) {
  const key = `${classification}D${division}` as TexasFootballBracketKey;
  return Object.prototype.hasOwnProperty.call(officialMaxPrepsTournaments2026, key)
    ? officialMaxPrepsTournaments2026[key]
    : null;
}
