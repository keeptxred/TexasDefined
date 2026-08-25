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
  if (profile.overview.length < 2) blockers.push("biography-depth");
  if (profile.definingWorks.length < 4) blockers.push("defining-work-depth");
  if (profile.timeline.length < 4) blockers.push("timeline-depth");
  if (profile.legacy.length < 2) blockers.push("legacy-depth");
  if (profile.texasPlaces.length < 1) blockers.push("texas-place-depth");
  if (profile.sources.length < 2) blockers.push("source-depth");

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
