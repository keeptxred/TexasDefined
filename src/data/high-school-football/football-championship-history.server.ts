import { allTimeFootballHistoryFromLoaded, loadUilAllTimeFootballHistory } from './uil-football-all-time-history.server';
import { loadUilRecentFootballHistory, recentFootballHistoryFromLoaded } from './uil-football-recent-history.server';
import { footballClassificationRank, footballProgramProfilePath } from './program-slugs';
import { UIL_FOOTBALL_PROGRAMS_2026 } from './uil-football-alignments-2026.server';

export type FootballChampionshipHistoryRow = {
  schoolName: string;
  profilePath: string;
  classification: string;
  division: 1 | 2 | null;
  district: number;
  footballType: '6-Man' | '11-Man';
  stateTitles: number;
  stateFinalAppearances: number;
  appearanceYears: string;
  publishedThroughYear: number;
  supplementedFinals: number;
};

export type FootballChampionshipHistoryPage = {
  alignmentCycle: '2026-28';
  currentProgramCount: number;
  matchedPrograms: number;
  titleWinningPrograms: number;
  finalAppearingPrograms: number;
  publishedThroughYear: number;
  sourceUrl: string;
  recentArchiveSourceUrl: string;
  historyAvailable: boolean;
  recentArchiveAvailable: boolean;
  rows: FootballChampionshipHistoryRow[];
};

export async function loadFootballChampionshipHistory(): Promise<FootballChampionshipHistoryPage> {
  const [allTimeResult, recentResult] = await Promise.allSettled([
    loadUilAllTimeFootballHistory(),
    loadUilRecentFootballHistory(),
  ]);

  const sourceUrl = 'https://www.uiltexas.org/football/all-time-appearances';
  const recentArchiveSourceUrl = 'https://www.uiltexas.org/football/archives';
  const recentArchiveAvailable = recentResult.status === 'fulfilled';

  if (allTimeResult.status !== 'fulfilled') {
    return {
      alignmentCycle: '2026-28',
      currentProgramCount: UIL_FOOTBALL_PROGRAMS_2026.length,
      matchedPrograms: 0,
      titleWinningPrograms: 0,
      finalAppearingPrograms: 0,
      publishedThroughYear: 0,
      sourceUrl,
      recentArchiveSourceUrl,
      historyAvailable: false,
      recentArchiveAvailable,
      rows: [],
    };
  }

  const allTime = allTimeResult.value;
  const recent = recentArchiveAvailable ? recentResult.value : null;

  const rows = UIL_FOOTBALL_PROGRAMS_2026.flatMap((program) => {
    const recentHistory = recent ? recentFootballHistoryFromLoaded(recent, program.schoolName) : null;
    const history = allTimeFootballHistoryFromLoaded(allTime, recentHistory, program.schoolName);
    if (!history || history.stateFinalAppearances < 1) return [];

    return [{
      schoolName: program.schoolName,
      profilePath: footballProgramProfilePath(program.schoolName),
      classification: program.classification,
      division: program.division,
      district: program.district,
      footballType: program.footballType,
      stateTitles: history.stateTitles,
      stateFinalAppearances: history.stateFinalAppearances,
      appearanceYears: history.appearanceYears,
      publishedThroughYear: history.publishedThroughYear,
      supplementedFinals: history.supplementedFinals.length,
    }];
  }).sort((left, right) =>
    right.stateTitles - left.stateTitles
    || right.stateFinalAppearances - left.stateFinalAppearances
    || footballClassificationRank(right.classification) - footballClassificationRank(left.classification)
    || left.schoolName.localeCompare(right.schoolName),
  );

  const publishedThroughYear = rows.reduce((latest, row) => Math.max(latest, row.publishedThroughYear), 0);

  return {
    alignmentCycle: '2026-28',
    currentProgramCount: UIL_FOOTBALL_PROGRAMS_2026.length,
    matchedPrograms: rows.length,
    titleWinningPrograms: rows.filter((row) => row.stateTitles > 0).length,
    finalAppearingPrograms: rows.length,
    publishedThroughYear,
    sourceUrl,
    recentArchiveSourceUrl,
    historyAvailable: true,
    recentArchiveAvailable,
    rows,
  };
}
