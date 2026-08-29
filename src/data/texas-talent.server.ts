import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { TEXAS_TALENT_EDITORIAL_STATUS_OVERRIDES } from "@/data/texas-talent-editorial-status";
import { TEXAS_TALENT_LAUNCH_DEPTH_WAVE1 } from "@/data/texas-talent-launch-depth-wave1";
import { TEXAS_TALENT_LAUNCH_DEPTH_WAVE2 } from "@/data/texas-talent-launch-depth-wave2";
import { TEXAS_TALENT_LAUNCH_DEPTH_WAVE3 } from "@/data/texas-talent-launch-depth-wave3";
import { TEXAS_TALENT_LAUNCH_DEPTH_WAVE4 } from "@/data/texas-talent-launch-depth-wave4";
import { TEXAS_TALENT_LAUNCH_DEPTH_WAVE4_REPAIR } from "@/data/texas-talent-launch-depth-wave4-repair";
import { TEXAS_TALENT_LAUNCH_DEPTH_WAVE5 } from "@/data/texas-talent-launch-depth-wave5";
import { TEXAS_TALENT_LAUNCH_DEPTH_WAVE5_REPAIR } from "@/data/texas-talent-launch-depth-wave5-repair";
import { TEXAS_TALENT_LAUNCH_DEPTH_WAVE6 } from "@/data/texas-talent-launch-depth-wave6";
import { TEXAS_TALENT_LAUNCH_DEPTH_WAVE6_REPAIR } from "@/data/texas-talent-launch-depth-wave6-repair";
import { buildTexasTalentLaunchMetadata } from "@/data/texas-talent-launch-metadata.server";
import { TEXAS_TALENT_PLACE_CONTEXT_OVERRIDES } from "@/data/texas-talent-place-context-overrides";
import { TEXAS_TALENT_PROFILES } from "@/data/texas-talent-profiles";
import { TEXAS_TALENT_MUSIC_EXPANSION } from "@/data/texas-talent-profiles-wave2-music";
import { TEXAS_TALENT_FILM_EXPANSION } from "@/data/texas-talent-profiles-wave2-film";
import { TEXAS_TALENT_ARTS_EXPANSION } from "@/data/texas-talent-profiles-wave2-arts";
import { TEXAS_TALENT_WAVE3 } from "@/data/texas-talent-profiles-wave3";
import { TEXAS_TALENT_PROFILE_CORRECTIONS } from "@/data/texas-talent-profile-corrections";
import {
  assessTexasTalentLaunchReadiness,
  assertTexasTalentPublishable,
  isTexasTalentPublishable,
} from "@/data/texas-talent-launch";
import {
  applyTexasTalentMechanicalLinkCertificationFromGraph,
  auditTexasTalentEntityLinksFromGraph,
  resolveTexasTalentEntityLinksFromGraph,
} from "@/data/texas-talent-links.server";
import { TEXAS_TALENT_READINESS } from "@/data/texas-talent-readiness";
import { TEXAS_TALENT_READINESS_BATCH3 } from "@/data/texas-talent-readiness-batch3";
import { TEXAS_TALENT_READINESS_BATCH4 } from "@/data/texas-talent-readiness-batch4";
import { TEXAS_TALENT_READINESS_BATCH5 } from "@/data/texas-talent-readiness-batch5";
import { TEXAS_TALENT_READINESS_BATCH6 } from "@/data/texas-talent-readiness-batch6";
import { TEXAS_TALENT_READINESS_BATCH7 } from "@/data/texas-talent-readiness-batch7";
import { TEXAS_TALENT_READINESS_BATCH8 } from "@/data/texas-talent-readiness-batch8";
import { TEXAS_TALENT_READINESS_BATCH9 } from "@/data/texas-talent-readiness-batch9";
import { TEXAS_TALENT_READINESS_BATCH10 } from "@/data/texas-talent-readiness-batch10";
import { TEXAS_TALENT_READINESS_BATCH11 } from "@/data/texas-talent-readiness-batch11";
import { TEXAS_TALENT_READINESS_BATCH12 } from "@/data/texas-talent-readiness-batch12";

const TEXAS_TALENT_ALL_PROFILES = [
  ...TEXAS_TALENT_PROFILES,
  ...TEXAS_TALENT_MUSIC_EXPANSION,
  ...TEXAS_TALENT_FILM_EXPANSION,
  ...TEXAS_TALENT_ARTS_EXPANSION,
  ...TEXAS_TALENT_WAVE3,
] as const;

const TEXAS_TALENT_ALL_READINESS = {
  ...TEXAS_TALENT_READINESS,
  ...TEXAS_TALENT_READINESS_BATCH3,
  ...TEXAS_TALENT_READINESS_BATCH4,
  ...TEXAS_TALENT_READINESS_BATCH5,
  ...TEXAS_TALENT_READINESS_BATCH6,
  ...TEXAS_TALENT_READINESS_BATCH7,
  ...TEXAS_TALENT_READINESS_BATCH8,
  ...TEXAS_TALENT_READINESS_BATCH9,
  ...TEXAS_TALENT_READINESS_BATCH10,
  ...TEXAS_TALENT_READINESS_BATCH11,
  ...TEXAS_TALENT_READINESS_BATCH12,
};

const profileSlugs = TEXAS_TALENT_ALL_PROFILES.map((profile) => profile.slug);
const duplicateProfileSlugs = profileSlugs.filter((slug, index) => profileSlugs.indexOf(slug) !== index);
const missingReadinessSlugs = profileSlugs.filter((slug) => !TEXAS_TALENT_ALL_READINESS[slug]);
const orphanCorrectionSlugs = Object.keys(TEXAS_TALENT_PROFILE_CORRECTIONS).filter(
  (slug) => !profileSlugs.includes(slug as (typeof profileSlugs)[number]),
);
const orphanDepthOverrideSlugs = [
  ...Object.keys(TEXAS_TALENT_LAUNCH_DEPTH_WAVE1),
  ...Object.keys(TEXAS_TALENT_LAUNCH_DEPTH_WAVE2),
  ...Object.keys(TEXAS_TALENT_LAUNCH_DEPTH_WAVE3),
  ...Object.keys(TEXAS_TALENT_LAUNCH_DEPTH_WAVE4),
  ...Object.keys(TEXAS_TALENT_LAUNCH_DEPTH_WAVE4_REPAIR),
  ...Object.keys(TEXAS_TALENT_LAUNCH_DEPTH_WAVE5),
  ...Object.keys(TEXAS_TALENT_LAUNCH_DEPTH_WAVE5_REPAIR),
  ...Object.keys(TEXAS_TALENT_LAUNCH_DEPTH_WAVE6),
  ...Object.keys(TEXAS_TALENT_LAUNCH_DEPTH_WAVE6_REPAIR),
].filter((slug) => !profileSlugs.includes(slug as (typeof profileSlugs)[number]));
const orphanEditorialStatusSlugs = Object.keys(TEXAS_TALENT_EDITORIAL_STATUS_OVERRIDES).filter(
  (slug) => !profileSlugs.includes(slug as (typeof profileSlugs)[number]),
);
const orphanPlaceContextKeys = Object.keys(TEXAS_TALENT_PLACE_CONTEXT_OVERRIDES).filter((key) => {
  const slug = key.split("::", 1)[0];
  return !profileSlugs.includes(slug as (typeof profileSlugs)[number]);
});

if (duplicateProfileSlugs.length > 0) {
  throw new Error(`Duplicate Texas Talent profile slugs: ${[...new Set(duplicateProfileSlugs)].join(", ")}`);
}

if (missingReadinessSlugs.length > 0) {
  throw new Error(`Texas Talent profiles missing readiness records: ${missingReadinessSlugs.join(", ")}`);
}

if (orphanCorrectionSlugs.length > 0) {
  throw new Error(`Texas Talent profile corrections target unknown slugs: ${orphanCorrectionSlugs.join(", ")}`);
}

if (orphanDepthOverrideSlugs.length > 0) {
  throw new Error(`Texas Talent launch-depth overrides target unknown slugs: ${orphanDepthOverrideSlugs.join(", ")}`);
}

if (orphanEditorialStatusSlugs.length > 0) {
  throw new Error(`Texas Talent editorial status overrides target unknown slugs: ${orphanEditorialStatusSlugs.join(", ")}`);
}

if (orphanPlaceContextKeys.length > 0) {
  throw new Error(`Texas Talent place-context overrides target unknown slugs: ${orphanPlaceContextKeys.join(", ")}`);
}

function withReadiness<T extends (typeof TEXAS_TALENT_ALL_PROFILES)[number]>(profile: T) {
  const launchDepthWave4Base = TEXAS_TALENT_LAUNCH_DEPTH_WAVE4[profile.slug];
  const launchDepthWave4Repair = TEXAS_TALENT_LAUNCH_DEPTH_WAVE4_REPAIR[profile.slug];
  const launchDepthWave4 = launchDepthWave4Base || launchDepthWave4Repair
    ? { ...launchDepthWave4Base, ...launchDepthWave4Repair }
    : undefined;
  const launchDepthWave5Base = TEXAS_TALENT_LAUNCH_DEPTH_WAVE5[profile.slug];
  const launchDepthWave5Repair = TEXAS_TALENT_LAUNCH_DEPTH_WAVE5_REPAIR[profile.slug];
  const launchDepthWave5 = launchDepthWave5Base || launchDepthWave5Repair
    ? { ...launchDepthWave5Base, ...launchDepthWave5Repair }
    : undefined;
  const launchDepthWave6Base = TEXAS_TALENT_LAUNCH_DEPTH_WAVE6[profile.slug];
  const launchDepthWave6Repair = TEXAS_TALENT_LAUNCH_DEPTH_WAVE6_REPAIR[profile.slug];
  const launchDepthWave6 = launchDepthWave6Base || launchDepthWave6Repair
    ? { ...launchDepthWave6Base, ...launchDepthWave6Repair }
    : undefined;

  const correctedProfile = {
    ...profile,
    ...(TEXAS_TALENT_PROFILE_CORRECTIONS[profile.slug] ?? {}),
    ...(TEXAS_TALENT_LAUNCH_DEPTH_WAVE1[profile.slug] ?? {}),
    ...(TEXAS_TALENT_LAUNCH_DEPTH_WAVE2[profile.slug] ?? {}),
    ...(TEXAS_TALENT_LAUNCH_DEPTH_WAVE3[profile.slug] ?? {}),
    ...launchDepthWave4,
    ...launchDepthWave5,
    ...launchDepthWave6,
    ...(TEXAS_TALENT_EDITORIAL_STATUS_OVERRIDES[profile.slug] ?? {}),
  };
  const texasPlaces = correctedProfile.texasPlaces.map((place) => ({
    ...place,
    context: TEXAS_TALENT_PLACE_CONTEXT_OVERRIDES[`${profile.slug}::${place.name}`] ?? place.context,
  }));

  return {
    ...correctedProfile,
    texasPlaces,
    readiness: TEXAS_TALENT_ALL_READINESS[profile.slug],
  };
}

export function loadTexasTalentProfilesServer() {
  return TEXAS_TALENT_ALL_PROFILES.map(withReadiness);
}

export function loadTexasTalentProfileServer(slug: string) {
  const profile = TEXAS_TALENT_ALL_PROFILES.find((candidate) => candidate.slug === slug);
  return profile ? withReadiness(profile) : null;
}

export async function loadTexasTalentProfileWithResolvedLinksServer(slug: string) {
  const storedProfile = loadTexasTalentProfileServer(slug);
  if (!storedProfile) return null;

  const graph = await loadTexasKnowledgeGraph();
  const resolvedInternalLinks = resolveTexasTalentEntityLinksFromGraph(storedProfile, graph);
  const certifiedProfile = applyTexasTalentMechanicalLinkCertificationFromGraph(storedProfile, graph);

  return {
    ...certifiedProfile,
    storedInternalLinkReview: storedProfile.readiness.internalLinkReview,
    resolvedInternalLinks,
    linkAudit: auditTexasTalentEntityLinksFromGraph(storedProfile, graph),
    launchMetadata: buildTexasTalentLaunchMetadata(storedProfile),
    launchAssessment: assessTexasTalentLaunchReadiness(certifiedProfile),
  };
}

export async function loadTexasTalentLaunchAuditServer() {
  const profiles = loadTexasTalentProfilesServer();
  const storedAssessments = profiles.map(assessTexasTalentLaunchReadiness);
  const graph = await loadTexasKnowledgeGraph();
  const linkAudits = profiles.map((profile) => auditTexasTalentEntityLinksFromGraph(profile, graph));
  const certifiedProfiles = profiles.map((profile) =>
    applyTexasTalentMechanicalLinkCertificationFromGraph(profile, graph));
  const assessments = certifiedProfiles.map(assessTexasTalentLaunchReadiness);

  return {
    totalProfiles: profiles.length,
    contentReady: profiles.filter((profile) => profile.profileStatus === "ready").length,
    storedMechanicallyReady: storedAssessments.filter((assessment) => assessment.mechanicalReady).length,
    mechanicallyReady: assessments.filter((assessment) => assessment.mechanicalReady).length,
    editorialApproved: storedAssessments.filter((assessment) => assessment.editorialApproved).length,
    publishable: storedAssessments.filter((assessment) => assessment.publishable).length,
    mechanicallyLinkCertified: linkAudits.filter((audit) => audit.mechanicallyCertified).length,
    linkCertificationCandidates: linkAudits.filter((audit) => audit.certificationCandidate).length,
    profilesWithUnsafeRecordedLinks: linkAudits.filter((audit) => audit.unsafeRecordedLinkCount > 0).length,
    profilesWithNoSafeLinks: linkAudits.filter((audit) => audit.safeResolvedLinkCount === 0).length,
    storedAssessments,
    assessments,
    linkAudits,
  };
}

// Publication remains intentionally conservative. These functions use the
// stored readiness records, not editorial profile status or derived mechanical
// link certification. A content-ready profile can never turn public by itself.
export function loadTexasTalentPublishableProfilesServer() {
  return loadTexasTalentProfilesServer().filter(isTexasTalentPublishable);
}

export function loadTexasTalentProfileForPublicationServer(slug: string) {
  const profile = loadTexasTalentProfileServer(slug);
  if (!profile) return null;
  return assertTexasTalentPublishable(profile);
}
