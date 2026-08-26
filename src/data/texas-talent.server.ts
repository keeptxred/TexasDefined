import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
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

if (duplicateProfileSlugs.length > 0) {
  throw new Error(`Duplicate Texas Talent profile slugs: ${[...new Set(duplicateProfileSlugs)].join(", ")}`);
}

if (missingReadinessSlugs.length > 0) {
  throw new Error(`Texas Talent profiles missing readiness records: ${missingReadinessSlugs.join(", ")}`);
}

if (orphanCorrectionSlugs.length > 0) {
  throw new Error(`Texas Talent profile corrections target unknown slugs: ${orphanCorrectionSlugs.join(", ")}`);
}

function withReadiness<T extends (typeof TEXAS_TALENT_ALL_PROFILES)[number]>(profile: T) {
  const correctedProfile = {
    ...profile,
    ...(TEXAS_TALENT_PROFILE_CORRECTIONS[profile.slug] ?? {}),
  };

  return {
    ...correctedProfile,
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
// stored readiness records, not the derived mechanical link certification.
// A mechanically clean graph can never turn a profile public by itself.
export function loadTexasTalentPublishableProfilesServer() {
  return loadTexasTalentProfilesServer().filter(isTexasTalentPublishable);
}

export function loadTexasTalentProfileForPublicationServer(slug: string) {
  const profile = loadTexasTalentProfileServer(slug);
  if (!profile) return null;
  return assertTexasTalentPublishable(profile);
}
