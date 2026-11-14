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
    authoritySummary: "TEA identifies one combined PK–12 campus, Brookesmith School (025908001), in Brown County. The 2026 UIL alignment places Brookesmith in Region II, District 8 of Class 1A Division II six-man football. A football district groups competing schools; it is not the same administrative unit as Brookesmith ISD. This page identifies the one verified school and links to the current UIL competition and TEA record rather than pretending Brookesmith operates several high-school programs.",
    sourceDistinction: "The campus and the school district share the Brookesmith name, but the primary-source identifiers make their roles different: 025908001 is a school campus and 025908 is its LEA. Verify high-school eligibility and address enrollment with the district directly. The UIL division refers to six-player football, so an 11-player classification or invented full district standings would mislead families.",
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
    authoritySummary: "The Morgan listed in the official 2026 UIL Class 1A Division II six-man alignment is Morgan School in Bosque County, TEA campus 018903001, operated by Morgan ISD. Its football competition is in Region III, District 13, alongside other small-school programs such as Walnut Springs. Morgan ISD is not Morgan Mill ISD; their similar names do not authorize combining student, campus or football information.",
    sourceDistinction: "Morgan's campus record spans prekindergarten through grade 12, while football eligibility depends on UIL and district rules rather than simply being a resident of Bosque County. This school district page points to the separate Morgan team profile and preserves the distinction between the district's administrative boundary and the multi-district six-man league.",
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
    authoritySummary: "Walnut Springs School is the TEA-recognized combined PK–12 campus 018905003 within Walnut Springs ISD in Bosque County. The official 2026 UIL football realignment places Walnut Springs in Class 1A Division II six-man, Region III District 13, also containing Morgan and other area schools. Neither the shared UIL competition district nor the county is a school attendance boundary.",
    sourceDistinction: "This is one verified school program, not several Walnut Springs high schools. The public school record, official 2026 UIL realignment and linked team profile cover different questions: which district operates the campus, whom the football program competes against and how the current team is classified. A relocation decision still requires a district-provided address check.",
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
    authoritySummary: "Three Rivers JR/SR High School is the Texas Education Agency campus 149902001 in Three Rivers ISD, Live Oak County. It serves grades 7–12 and is the school behind the UIL's 'Three Rivers' football listing. For the 2026–28 cycle the school plays Class 2A Division II 11-man football in District 15, which is a competition alignment rather than a separate school-system boundary.",
    sourceDistinction: "This administrative district should not be confused with Three Way School, a different 1A six-man UIL team, or with similarly named Three Rivers schools in other states. Families need the real Live Oak County school record and the linked Three Rivers team profile, with current classification, district and eligibility checked separately. Do not infer attendance from a city name or ZIP code.",
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

/** The four evidence cards are never shared with non-UIL source records. */
export function verifiedFootballIsdAuthority(slug: string) {
  return VERIFIED_GSC_FOOTBALL_ISD_BRIDGES.find((bridge) =>
    bridge.districtName.toLowerCase().replaceAll(' ', '-') === slug
  ) ?? null;
}
