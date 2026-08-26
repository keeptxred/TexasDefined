import type { TexasTalentProfile } from "@/data/texas-talent";
import type {
  TexasTalentReadinessRecord,
  TexasTalentVerifiedInternalLink,
} from "@/data/texas-talent-readiness";

export type LoadedTexasTalentProfile = TexasTalentProfile & {
  readiness: TexasTalentReadinessRecord;
};

export type TexasTalentLaunchBlocker =
  | "source-review"
  | "hero-image"
  | "internal-links"
  | "biography-depth"
  | "defining-work-depth"
  | "timeline-depth"
  | "legacy-depth"
  | "texas-place-depth"
  | "source-depth";

export type TexasTalentLaunchAssessment = {
  slug: string;
  name: string;
  mechanicalReady: boolean;
  editorialApproved: boolean;
  publishable: boolean;
  blockers: readonly TexasTalentLaunchBlocker[];
  verifiedInternalLinks: readonly TexasTalentVerifiedInternalLink[];
};

export const TEXAS_TALENT_LAUNCH_DEPTH = {
  minOverviewParagraphs: 3,
  minOverviewWords: 300,
  minDefiningWorks: 5,
  minTimelineMilestones: 5,
  minLegacyPoints: 3,
  minLegacyWords: 100,
  minTexasPlaces: 2,
  minTexasPlaceContextWords: 18,
  minSources: 2,
} as const;

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function totalWords(values: readonly string[]) {
  return values.reduce((sum, value) => sum + wordCount(value), 0);
}

export function assessTexasTalentLaunchReadiness(
  profile: LoadedTexasTalentProfile,
): TexasTalentLaunchAssessment {
  const blockers: TexasTalentLaunchBlocker[] = [];

  if (profile.readiness.sourceReview.status !== "reviewed") blockers.push("source-review");
  if (
    profile.readiness.imageReview.status !== "verified" ||
    !profile.readiness.imageReview.heroImage
  ) {
    blockers.push("hero-image");
  }
  if (
    profile.readiness.internalLinkReview.status !== "verified" ||
    profile.readiness.internalLinkReview.links.length === 0
  ) {
    blockers.push("internal-links");
  }

  const overviewWords = totalWords(profile.overview);
  if (
    profile.overview.length < TEXAS_TALENT_LAUNCH_DEPTH.minOverviewParagraphs ||
    overviewWords < TEXAS_TALENT_LAUNCH_DEPTH.minOverviewWords
  ) {
    blockers.push("biography-depth");
  }

  if (profile.definingWorks.length < TEXAS_TALENT_LAUNCH_DEPTH.minDefiningWorks) {
    blockers.push("defining-work-depth");
  }
  if (profile.timeline.length < TEXAS_TALENT_LAUNCH_DEPTH.minTimelineMilestones) {
    blockers.push("timeline-depth");
  }

  const legacyWords = totalWords(profile.legacy);
  if (
    profile.legacy.length < TEXAS_TALENT_LAUNCH_DEPTH.minLegacyPoints ||
    legacyWords < TEXAS_TALENT_LAUNCH_DEPTH.minLegacyWords
  ) {
    blockers.push("legacy-depth");
  }

  if (
    profile.texasPlaces.length < TEXAS_TALENT_LAUNCH_DEPTH.minTexasPlaces ||
    profile.texasPlaces.some(
      (place) => wordCount(place.context) < TEXAS_TALENT_LAUNCH_DEPTH.minTexasPlaceContextWords,
    )
  ) {
    blockers.push("texas-place-depth");
  }

  if (profile.sources.length < TEXAS_TALENT_LAUNCH_DEPTH.minSources) blockers.push("source-depth");

  const mechanicalReady = blockers.length === 0;
  const editorialApproved = profile.readiness.launchStatus === "launch-ready";

  return {
    slug: profile.slug,
    name: profile.name,
    mechanicalReady,
    editorialApproved,
    publishable: mechanicalReady && editorialApproved,
    blockers,
    verifiedInternalLinks: profile.readiness.internalLinkReview.links,
  };
}

export function isTexasTalentMechanicallyLaunchReady(profile: LoadedTexasTalentProfile) {
  return assessTexasTalentLaunchReadiness(profile).mechanicalReady;
}

export function isTexasTalentPublishable(profile: LoadedTexasTalentProfile) {
  return assessTexasTalentLaunchReadiness(profile).publishable;
}

export function assertTexasTalentPublishable(profile: LoadedTexasTalentProfile) {
  const assessment = assessTexasTalentLaunchReadiness(profile);
  if (!assessment.publishable) {
    const details = [
      ...assessment.blockers,
      ...(assessment.editorialApproved ? [] : ["editorial-approval"]),
    ].join(", ");
    throw new Error(`Texas Talent profile ${profile.slug} is not publishable: ${details}`);
  }
  return profile;
}
