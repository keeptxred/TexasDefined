import type { UilFootballProgram } from './uil-football-alignments-2026.server';
import type { FootballProgramDirectoryResult } from './football-directory.server';

/**
 * Four exact 2026 UIL football schools lost their TEA/AskTED school→district
 * association in the rendered ISD directory (historical GSC 404 issue #7097).
 *
 * Never infer district ownership from a town name or an approximate text match.
 * Both the UIL 2026–28 alignment and a separate official TEA campus record
 * establish every pair below. No wildcard, no novel schools, no change to
 * UIL classification, district/standing, team pages or source enrollment.
 *
 * Re-verify when UIL realigns, campuses consolidate, or TEA changes district.
 */
export const VERIFIED_GSC_FOOTBALL_ISD_BRIDGES = [
  {
    sourceSchoolName: 'Brookesmith',
    classification: '1A',
    division: 2,
    footballType: '6-Man',
    districtName: 'Brookesmith ISD',
    schoolName: 'BROOKESMITH SCHOOL',
    campusId: '025908001',
    countyName: 'Brown',
    city: 'Brookesmith',
    uilSource: 'https://realignment.uiltexas.org/alignments/2026/1AD2FB2026.pdf',
    teaSource: 'https://rptsvr1.tea.texas.gov/cgi/sas/broker?_debug=0&_program=perfrept.perfmast.sas&_service=marykay&ccyy=2026&id=025908001&lev=C&prgopt=reports%2Facct%2Fcomparison_group.sas',
  },
  {
    sourceSchoolName: 'Morgan',
    classification: '1A',
    division: 2,
    footballType: '6-Man',
    districtName: 'Morgan ISD',
    schoolName: 'MORGAN SCHOOL',
    campusId: '018903001',
    countyName: 'Bosque',
    city: 'Morgan',
    uilSource: 'https://realignment.uiltexas.org/alignments/2026/1AD2FB2026.pdf',
    teaSource: 'https://rptsvr1.tea.texas.gov/cgi/sas/broker?_debug=0&_program=perfrept.perfmast.sas&_service=marykay&ccyy=2025&id=018903001&lev=C&prgopt=reports%2Facct%2Fcomparison_group.sas',
  },
  {
    sourceSchoolName: 'Walnut Springs',
    classification: '1A',
    division: 2,
    footballType: '6-Man',
    districtName: 'Walnut Springs ISD',
    schoolName: 'WALNUT SPRINGS SCHOOL',
    campusId: '018905003',
    countyName: 'Bosque',
    city: 'Walnut Springs',
    uilSource: 'https://realignment.uiltexas.org/alignments/2026/1AD2FB2026.pdf',
    teaSource: 'https://rptsvr1.tea.texas.gov/cgi/sas/broker?_debug=0&_program=perfrept.perfmast.sas&_service=marykay&ccyy=2026&id=018905003&lev=C&prgopt=reports%2Facct%2Fcomparison_group.sas',
  },
  {
    sourceSchoolName: 'Three Rivers',
    classification: '2A',
    division: 2,
    footballType: '11-Man',
    districtName: 'Three Rivers ISD',
    schoolName: 'THREE RIVERS JR/SR H S',
    campusId: '149902001',
    countyName: 'Live Oak',
    city: 'Three Rivers',
    uilSource: 'https://realignment.uiltexas.org/alignments/2026/2AD2FB2026.pdf',
    teaSource: 'https://rptsvr1.tea.texas.gov/cgi/sas/broker?_debug=0&_program=perfrept.perfmast.sas&_service=marykay&ccyy=2026&id=149902001&lev=C&prgopt=reports%2Facct%2Fdistinctions.sas',
  },
] as const;

type Bridge = (typeof VERIFIED_GSC_FOOTBALL_ISD_BRIDGES)[number];

export function verifiedFootballIsdBridge(program: UilFootballProgram): Bridge | null {
  return VERIFIED_GSC_FOOTBALL_ISD_BRIDGES.find((bridge) =>
    program.alignmentCycle === '2026-28'
    && program.sourceSchoolName === bridge.sourceSchoolName
    && program.classification === bridge.classification
    && program.division === bridge.division
    && program.footballType === bridge.footballType
    && program.sourceUrl === bridge.uilSource
  ) ?? null;
}

/** Correct only four separately confirmed district-school pairs, not guesses.
 * If the general TEA string matcher assigned a different campus, the verified
 * TEA ID wins, preventing an accidentally inferred third-party district page.
 */
export function reconcileVerifiedFootballIsdBridge(
  program: FootballProgramDirectoryResult,
): FootballProgramDirectoryResult {
  const bridge = verifiedFootballIsdBridge(program);
  if (!bridge) return program;
  const districtId = bridge.campusId.slice(0, 6);
  return {
    ...program,
    officialSchoolName: bridge.schoolName,
    districtName: bridge.districtName,
    isdProfilePath: `/texas-high-school-football-isds/${bridge.districtName.toLowerCase().replaceAll(' ', '-')}`,
    countyName: bridge.countyName,
    city: bridge.city,
    teaSchoolNumber: bridge.campusId,
    teaDistrictNumber: districtId,
    teaSchoolProfileUrl: `https://txschools.gov/?id=${bridge.campusId}&view=school`,
    teaDistrictProfileUrl: `https://txschools.gov/?id=${districtId}&view=district`,
    schoolWebsite: undefined,
    districtWebsite: undefined,
  };
}
