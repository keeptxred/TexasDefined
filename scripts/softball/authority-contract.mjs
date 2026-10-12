/**
 * TexasDefined UIL softball authority publication contract.
 *
 * Research drafts may be incomplete. Only explicitly approved, source-backed
 * profiles may enter the published manifest. The 1,192 UIL alignment entries
 * are a *directory*, not content from which this contract can be auto-filled.
 */
import { validateFirstReleaseResearch } from './complete-first-release-audit.mjs';

const SECTION_IDS = Object.freeze([
  'identityAndSchool', 'uilAlignmentAndDistrict', 'programHistory',
  'coachesAndLeadership', 'rosterAndPlayers', 'seasonScheduleAndResults',
  'homeFieldAndGameDay', 'championshipsAndHonors', 'districtOpponents',
  'recruitmentAndEligibility', 'communityAndTraditions', 'planningAndLocal',
  'methodologyAndCorrections',
]);
const APPROVED_IMAGE_RIGHTS = new Set(['owned-original', 'licensed', 'public-domain', 'creative-commons', 'written-permission']);
const OFFICIAL_SOURCE_TYPES = new Set(['school', 'uil', 'governing', 'government', 'official-athletics']);
const RESTRICTED_SLUGS = new Set(['schools', 'colleges', 'texas-volts', 'paris-junior-college', 'teams', 'archive', 'methodology']);
const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const wordCount = (s) => String(s ?? '').trim().split(/\s+/).filter(Boolean).length;
const isoDay = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s ?? '') && Number.isFinite(Date.parse(s + 'T00:00:00Z'));
const words = (s) => String(s ?? '').toLowerCase().match(/[a-z0-9]+/g) ?? [];

function domainOf(url) {
  try { const u = new URL(url); return u.protocol === 'https:' && !u.username && !u.password ? u.hostname.toLowerCase().replace(/^www\./, '') : ''; }
  catch { return ''; }
}

function overlap(a, b) {
  const x = new Set(words(a).filter((w) => w.length > 3));
  const y = new Set(words(b).filter((w) => w.length > 3));
  if (!x.size || !y.size) return 0;
  return [...x].filter((w) => y.has(w)).length / (x.size + y.size - [...x].filter((w) => y.has(w)).length);
}

function validateProfile(profile, registry, now = new Date()) {
  const errors = [];
  const fail = (message) => errors.push(message);
  if (!profile || typeof profile !== 'object' || Array.isArray(profile)) return ['Profile must be an object'];
  const slug = profile.slug ?? '(unknown)';
  if (!slugRe.test(profile.slug ?? '') || RESTRICTED_SLUGS.has(profile.slug)) fail(slug + ': invalid or reserved stable slug');
  if (profile.status !== 'published') fail(slug + ': published manifest only accepts explicitly published records');
  if (profile.ownerApproved !== true) fail(slug + ': owner editorial sign-off is required');
  if (typeof profile.editor !== 'string' || profile.editor.trim().length < 5) fail(slug + ': visible accountable editor required');
  if (typeof profile.title !== 'string' || profile.title.trim().length < 30 || profile.title.length > 135) fail(slug + ': distinctive editorial title required');
  const expectedPath = '/sports/softball/' + profile.slug;
  if (profile.canonicalPath !== expectedPath) fail(slug + ': canonical path must be ' + expectedPath);
  if (profile.sport !== 'girls-softball') fail(slug + ': sport must be girls-softball, never a football record');
  if (profile.season !== '2026-27') fail(slug + ': this manifest is specifically the 2026–27 UIL softball season');
  if (!isoDay(profile.reviewedAt) || new Date(profile.reviewedAt + 'T00:00:00Z') > now) fail(slug + ': invalid/future review date');
  else if (now.getTime() - Date.parse(profile.reviewedAt + 'T00:00:00Z') > 183 * 86400000) fail(slug + ': review is older than 183 days; recheck seasonal claims');
  if (typeof profile.uniqueThesis !== 'string' || wordCount(profile.uniqueThesis) < 45) fail(slug + ': unique, independently researched editorial thesis must have 45+ words');
  if (!Array.isArray(profile.sources) || profile.sources.length < 6) fail(slug + ': need at least six attributed source records');
  const sources = Array.isArray(profile.sources) ? profile.sources : [];
  const ids = new Set(), hosts = new Set(), officialKinds = new Set();
  for (const source of sources) {
    if (!source || !slugRe.test(source.id ?? '') || ids.has(source.id)) fail(slug + ': source IDs must be distinct stable slugs');
    ids.add(source?.id);
    if (!domainOf(source?.url)) fail(slug + ': source URL must be absolute HTTPS without credentials');
    else hosts.add(domainOf(source.url));
    if (typeof source?.title !== 'string' || source.title.trim().length < 12) fail(slug + ': each source needs an attributable document title');
    if (!isoDay(source?.checkedAt)) fail(slug + ': each source needs a valid checkedAt date');
    if (!['primary', 'secondary'].includes(source?.evidenceType)) fail(slug + ': each source needs a declared evidence type');
    if (source?.evidenceType === 'primary' && OFFICIAL_SOURCE_TYPES.has(source?.kind)) officialKinds.add(source.kind);
  }
  if (hosts.size < 3) fail(slug + ': require at least 3 independent source hosts');
  if (officialKinds.size < 2 || !officialKinds.has('uil')) fail(slug + ': require UIL primary evidence and another official primary source category');

  const identity = profile.identity ?? {};
  const key = [identity.uilName, identity.conference, identity.district, identity.region];
  if (key.some((x) => x === undefined || x === null)) fail(slug + ': missing season-specific school identity/district');
  const match = registry?.schools?.find((s) => s.name === identity.uilName && s.conference === identity.conference && s.district === identity.district && s.region === identity.region);
  if (!match) fail(slug + ': school identity/district is NOT an exact match to 2026–27 UIL softball alignments');
  if (match && !sources.some((source) => source.url === match.sourceUrl && source.kind === 'uil')) fail(slug + ': exact UIL original document must appear in cited sources');
  if (typeof identity.schoolOfficialUrl !== 'string' || !domainOf(identity.schoolOfficialUrl)) fail(slug + ': verified official school website URL required');
  if (typeof identity.city !== 'string' || identity.city.trim().length < 3) fail(slug + ': independently researched school city required');
  for (const field of ['schoolDistrict', 'mascot', 'county', 'softballTeamName']) {
    if (typeof identity[field] !== 'string' || identity[field].trim().length < 3) fail(slug + ': verified school identity requires ' + field + ' (do not infer it from football)');
  }

  if (!Array.isArray(profile.claims) || profile.claims.length < 18) fail(slug + ': at least 18 individually sourced, distinct school-specific claims required');
  const claims = Array.isArray(profile.claims) ? profile.claims : [];
  const claimTexts = new Set(), claimIds = new Set();
  for (const claim of claims) {
    if (!claim || !slugRe.test(claim.id ?? '') || claimIds.has(claim.id)) fail(slug + ': duplicate/invalid claim ID');
    claimIds.add(claim?.id);
    if (typeof claim?.text !== 'string' || wordCount(claim.text) < 7 || wordCount(claim.text) > 100) fail(slug + ': claims must be 7–100 useful words');
    const normalized = String(claim?.text ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
    if (claimTexts.has(normalized)) fail(slug + ': duplicate sourced fact');
    claimTexts.add(normalized);
    if (!Array.isArray(claim?.sourceIds) || !claim.sourceIds.length || claim.sourceIds.some((id) => !ids.has(id))) fail(slug + ': every fact needs valid source IDs');
    if (!isoDay(claim?.asOf)) fail(slug + ': every claim must be dated, including historical/season facts');
  }

  const sections = profile.sections ?? {};
  const prose = [];
  for (const sectionId of SECTION_IDS) {
    const section = sections[sectionId] ?? {};
    if (wordCount(section.text) < 65) fail(slug + ': ' + sectionId + ' requires 65+ researched words (not a placeholder)');
    if (!Array.isArray(section.sourceIds) || !section.sourceIds.length || section.sourceIds.some((id) => !ids.has(id))) fail(slug + ': ' + sectionId + ' must cite valid sources');
    if (typeof section.text === 'string') prose.push(section.text);
  }
  if (wordCount(prose.join(' ')) < 1050) fail(slug + ': total independently authored section content must contain 1,050+ words');
  if (prose.filter((s) => /\b(TODO|TBD|lorem ipsum|coming soon|information unavailable)\b/i.test(s)).length) fail(slug + ': placeholder content is not publishable');
  for (let i = 0; i < prose.length; i++) for (let j = i + 1; j < prose.length; j++) {
    if (overlap(prose[i], prose[j]) > 0.72) fail(slug + ': sections ' + SECTION_IDS[i] + ' and ' + SECTION_IDS[j] + ' repeat excessive wording');
  }

  if (!Array.isArray(profile.media) || profile.media.length < 1) fail(slug + ': an actual team-specific media asset with verified publishing rights is required');
  for (const asset of Array.isArray(profile.media) ? profile.media : []) {
    if (!APPROVED_IMAGE_RIGHTS.has(asset?.rights)) fail(slug + ': unknown/unlicensed media rights');
    if (!asset || !asset.path?.startsWith('/') || asset.path.includes('..')) fail(slug + ': media asset must have valid local public path');
    if (!domainOf(asset?.sourceUrl) || !domainOf(asset?.permissionEvidenceUrl)) fail(slug + ': image source and rights/permission evidence URLs required');
    if (typeof asset?.alt !== 'string' || asset.alt.trim().length < 20 || typeof asset?.credit !== 'string' || asset.credit.trim().length < 5) fail(slug + ': useful image alt text and credit required');
    if (asset?.identifiableMinor === true) fail(slug + ': do not publish identifiable minors in this automated profile pipeline');
  }
  const related = profile.relatedPaths ?? [];
  if (!Array.isArray(related) || !related.includes('/sports/softball') || !related.includes('/sports/softball/schools') || related.length < 3 || !related.every((x) => typeof x === 'string' && x.startsWith('/'))) fail(slug + ': require two hub backlinks and one researched relevant local/team link');
  if (typeof profile.correctionsPolicy !== 'string' || wordCount(profile.correctionsPolicy) < 20) fail(slug + ': corrections, last verified and source-dispute policy required');
  errors.push(...validateFirstReleaseResearch(profile, ids, now));
  return errors;
}
function validatePublishedManifest(manifest, registry, now = new Date()) {
  const errors = [];
  if (manifest?.version !== 1 || !Array.isArray(manifest.pages)) return ['Published softball manifest must have version:1 and pages array'];
  if (manifest.pages.length > 1200) errors.push('Unexpected mass publication: manifest exceeds 1,200; require explicit new rollout decision');
  const slugs = new Set(), schoolIds = new Set();
  for (const p of manifest.pages) {
    errors.push(...validateProfile(p, registry, now));
    if (slugs.has(p.slug)) errors.push('Duplicate canonical softball slug: ' + p.slug);
    slugs.add(p.slug);
    const id = [p.identity?.uilName, p.season].join('|');
    if (schoolIds.has(id)) errors.push('Same school-season published twice: ' + id);
    schoolIds.add(id);
  }
  // A page is never inferred from a league-alignment record or an import of
  // 1,192 names. Every published profile is deliberately in this manifest.
  for (let i = 0; i < manifest.pages.length; i++) for (let j = i + 1; j < manifest.pages.length; j++) {
    const a = manifest.pages[i], b = manifest.pages[j];
    const keys = SECTION_IDS.filter((s) => overlap(a.sections?.[s]?.text, b.sections?.[s]?.text) > 0.65);
    if (keys.length >= 3) errors.push(a.slug + ' vs ' + b.slug + ': boilerplate duplicate content in ' + keys.join(', '));
  }
  return errors;
}
export { SECTION_IDS, validateProfile, validatePublishedManifest };
