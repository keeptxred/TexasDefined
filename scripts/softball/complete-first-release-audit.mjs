/**
 * The research-completeness matrix is NOT an outline to fill with generic copy.
 * Every topic is researched before the school's FIRST public release.
 * "No official record" is a documented finding after reviewing a primary archive,
 * not permission to omit a topic or invent history. Critical topics require a
 * positive official verification. This contract applies to individually approved
 * UIL girls-softball pages, not to the source-linked UIL alignment directory.
 */
export const SOFTBALL_RESEARCH_TOPICS = Object.freeze([
  { id: 'campusIdentity', critical: true, note: 'Official campus, correct school and ID distinct from similar campuses' },
  { id: 'districtAndSchoolSystem', critical: true, note: 'Correct ISD or school operator plus official campus website' },
  { id: 'mascotAndTeamName', critical: true, note: 'Girls softball team identity, name and mascot verified from school' },
  { id: 'countyAndGeography', critical: true, note: 'Campus county and city verified, not inferred from ISD boundaries' },
  { id: 'softballClassification', critical: true, note: 'Correct UIL softball conference for this specific season' },
  { id: 'softballDistrict', critical: true, note: 'Correct numbered district and region; original UIL softball PDF' },
  { id: 'schoolAthleticsSource', critical: true, note: 'Official school/athletics home and softball-specific resource' },
  { id: 'coachAndStaffVerification', critical: true, note: 'Current staff verified and season-labelled; source if not publicly named' },
  { id: 'homeFieldIdentity', critical: true, note: 'Official venue or source-backed current designated playing facility' },
  { id: 'homeFieldLocation', critical: true, note: 'Actual facility address and campus/venue distinction, independently checked' },
  { id: 'districtOpponents', critical: true, note: 'All official softball district peers for the correct conference and year' },
  { id: 'eligibilityAndRecruiting', critical: true, note: 'Official UIL participation/transfer rules and school athletics contact path' },
  { id: 'publicRosterAndPrivacy', critical: true, note: 'School-controlled roster link if available; minors never profiled through inferred identity' },
  { id: 'currentScheduleSource', critical: true, note: 'Live official schedule source, with exact published season and future status' },
  { id: 'knownSeasonResults', critical: false, note: 'Documented past and current complete-season results, no unsourced scores' },
  { id: 'programOrigins', critical: false, note: 'Earliest independently documentable softball program history' },
  { id: 'programMilestones', critical: false, note: 'Important school-specific eras, changes and turning points' },
  { id: 'postseasonHistory', critical: false, note: 'Regional and state playoff appearances from date-stamped brackets' },
  { id: 'championships', critical: false, note: 'Verified titles by sport/year/level/division, including evidence of none found' },
  { id: 'recordsAndStatistics', critical: false, note: 'Authenticated program, coach, season and individual records where available' },
  { id: 'notableAlumni', critical: false, note: 'Source-confirmed graduates and college/pro advancement; no invented outcomes' },
  { id: 'coachingHistory', critical: false, note: 'Historic coaches with dated records, avoid conflating with current staff' },
  { id: 'honorsAndAwards', critical: false, note: 'Awards credited to exact person/team and correct governing body level' },
  { id: 'localPressArchives', critical: false, note: 'Independent community reporting examined to supplement official accounts' },
  { id: 'facilitiesHistory', critical: false, note: 'Park/field changes, naming history, upgrades and verified context' },
  { id: 'venueAccessibility', critical: true, note: 'Source for access and visitor accommodations; do not invent parking or ADA facilities' },
  { id: 'gameDayPlanning', critical: true, note: 'Verified admissions, schedules and visitor policies, or official verification route' },
  { id: 'uniformAndBrandRights', critical: true, note: 'Authorized images/logos, ownership and school identity; avoid imitation' },
  { id: 'schoolEnrollment', critical: false, note: 'School-specific independently dated enrollment where published, not football eligibility band' },
  { id: 'districtRivalries', critical: false, note: 'Historically substantiated rivalry or important fixtures, not stereotypes' },
  { id: 'communityTraditions', critical: false, note: 'Verifiable community role, boosters and documented local history' },
  { id: 'localConnections', critical: true, note: 'Correct TexasDefined city/county/nearby/venue internal links actually resolving' },
  { id: 'visitorAndFamilyQuestions', critical: true, note: 'Original useful planning FAQ about access, sources, seasons and game day' },
  { id: 'sourceConflictsAndCorrections', critical: true, note: 'Conflicts resolved or explicitly attributed, source dates and visible correction path' },
  { id: 'seoAndSchema', critical: true, note: 'Unique title, canonical, SportsTeam/Article markup and source-specific citations' },
  { id: 'imageAndMediaLicense', critical: true, note: 'Relevant original or licensed media, attribution, permission and alt text' },
  { id: 'mobileAndAccessibility', critical: true, note: 'Rendered mobile/tablet/desktop, contrast, keyboard navigation and readable layout' },
  { id: 'liveAndWorkerQA', critical: true, note: 'Pre-release built Worker SSR, links, sitemap and 200/404; separately require post-deploy live Worker/canonical verification' },
]);

const MIN_NOTE_WORDS = 14;
const wordCount = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).length;
const isoDate = (date) => typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(Date.parse(date + 'T00:00:00Z'));

export function validateFirstReleaseResearch(profile, sourceIds, now = new Date()) {
  const errors = [];
  const slug = profile?.slug ?? '(unknown)';
  const entries = profile?.researchAudit;
  if (!entries || typeof entries !== 'object' || Array.isArray(entries)) {
    return [slug + ': missing full first-release softball research audit'];
  }
  const allowed = new Set(SOFTBALL_RESEARCH_TOPICS.map(t => t.id));
  for (const item of SOFTBALL_RESEARCH_TOPICS) {
    const record = entries[item.id];
    if (!record || typeof record !== 'object' || Array.isArray(record)) {
      errors.push(slug + ': missing pre-publication research topic: ' + item.id);
      continue;
    }
    const state = record.finding;
    if (!['verified', 'documented-no-record', 'not-applicable'].includes(state)) {
      errors.push(slug + ': ' + item.id + ' must have a final researched finding, never pending');
    }
    if (item.critical && state !== 'verified') {
      errors.push(slug + ': critical first-release topic ' + item.id + ' must be verified from evidence');
    }
    if (wordCount(record.summary) < MIN_NOTE_WORDS) {
      errors.push(slug + ': ' + item.id + ' requires a useful unique research conclusion');
    }
    if (!Array.isArray(record.sourceIds) || !record.sourceIds.length || record.sourceIds.some(id => !sourceIds.has(id))) {
      errors.push(slug + ': ' + item.id + ' must cite verified source IDs even when no record was found');
    }
    if (!isoDate(record.checkedAt) || Date.parse(record.checkedAt + 'T00:00:00Z') > now.getTime() ||
        now.getTime() - Date.parse(record.checkedAt + 'T00:00:00Z') > 183 * 86400000) {
      errors.push(slug + ': ' + item.id + ' must be season-current and date-stamped');
    }
    if (state !== 'verified' && wordCount(record.recordsSearched) < 12) {
      errors.push(slug + ': ' + item.id + ' requires documented search effort before claiming no record or not applicable');
    }
  }
  const unexpected = Object.keys(entries).filter(key => !allowed.has(key));
  if (unexpected.length) errors.push(slug + ': nonstandard research audit topic(s): ' + unexpected.join(', '));
  return errors;
}
