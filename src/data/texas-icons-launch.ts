export type TexasIconLaunchCertification = {
  slug: string;
  approvedAt: string;
  ownerPublicationApprovedAt: string;
  sourceReviewCertified: true;
  internalLinksCertified: true;
  imagePolicy: "text-only-no-profile-image";
};

type LaunchableTexasIcon = {
  slug: string;
  reuseKind: string;
  indexableAtOwnRoute: boolean;
};

const approvedAt = "2026-08-29";

// Publication is additive and fail-closed: the underlying research records remain
// `researched-staged`. Only slugs explicitly certified here may be presented as
// indexable research profiles after canonical/Talent/hold resolution has run.
export const TEXAS_ICON_LAUNCH_CERTIFICATIONS: readonly TexasIconLaunchCertification[] = [
  {
    slug: "lyndon-b-johnson",
    approvedAt,
    ownerPublicationApprovedAt: approvedAt,
    sourceReviewCertified: true,
    internalLinksCertified: true,
    imagePolicy: "text-only-no-profile-image",
  },
  {
    slug: "george-w-bush",
    approvedAt,
    ownerPublicationApprovedAt: approvedAt,
    sourceReviewCertified: true,
    internalLinksCertified: true,
    imagePolicy: "text-only-no-profile-image",
  },
  {
    slug: "barbara-jordan",
    approvedAt,
    ownerPublicationApprovedAt: approvedAt,
    sourceReviewCertified: true,
    internalLinksCertified: true,
    imagePolicy: "text-only-no-profile-image",
  },
  {
    slug: "george-h-w-bush",
    approvedAt,
    ownerPublicationApprovedAt: approvedAt,
    sourceReviewCertified: true,
    internalLinksCertified: true,
    imagePolicy: "text-only-no-profile-image",
  },
  {
    slug: "ann-richards",
    approvedAt,
    ownerPublicationApprovedAt: approvedAt,
    sourceReviewCertified: true,
    internalLinksCertified: true,
    imagePolicy: "text-only-no-profile-image",
  },
  {
    slug: "nolan-ryan",
    approvedAt,
    ownerPublicationApprovedAt: approvedAt,
    sourceReviewCertified: true,
    internalLinksCertified: true,
    imagePolicy: "text-only-no-profile-image",
  },
  {
    slug: "simone-biles",
    approvedAt,
    ownerPublicationApprovedAt: approvedAt,
    sourceReviewCertified: true,
    internalLinksCertified: true,
    imagePolicy: "text-only-no-profile-image",
  },
  {
    slug: "tom-landry",
    approvedAt,
    ownerPublicationApprovedAt: approvedAt,
    sourceReviewCertified: true,
    internalLinksCertified: true,
    imagePolicy: "text-only-no-profile-image",
  },
  {
    slug: "earl-campbell",
    approvedAt,
    ownerPublicationApprovedAt: approvedAt,
    sourceReviewCertified: true,
    internalLinksCertified: true,
    imagePolicy: "text-only-no-profile-image",
  },
  {
    slug: "george-foreman",
    approvedAt,
    ownerPublicationApprovedAt: approvedAt,
    sourceReviewCertified: true,
    internalLinksCertified: true,
    imagePolicy: "text-only-no-profile-image",
  },
] as const;

const TEXAS_ICON_LAUNCH_SLUG_SET = new Set(TEXAS_ICON_LAUNCH_CERTIFICATIONS.map((entry) => entry.slug));

export const TEXAS_ICON_LAUNCH_SLUGS = TEXAS_ICON_LAUNCH_CERTIFICATIONS.map((entry) => entry.slug);

export function isTexasIconResearchLaunchApproved(slug: string) {
  return TEXAS_ICON_LAUNCH_SLUG_SET.has(slug);
}

export function applyTexasIconLaunchCertification<T extends LaunchableTexasIcon>(icon: T) {
  if (icon.reuseKind !== "icon-research-staged" || !isTexasIconResearchLaunchApproved(icon.slug)) {
    return icon;
  }

  return {
    ...icon,
    reuseKind: "icon-research-ready" as const,
    indexableAtOwnRoute: true as const,
  };
}
