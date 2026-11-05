import type { CampingDiscoveryProfile } from "./discovery";
import operatorSourceReviews from "./operator-source-reviews.json";

/** A small independently reviewed operator-notice layer.
 * These date-stamped conditions must not change any campground's facility
 * verification date, or claim live/open-now status after source changes.
 */
export function withCampingOperatorNotice(profile: CampingDiscoveryProfile): CampingDiscoveryProfile {
  const entry = operatorSourceReviews.find((row) => row.destinationSlug === profile.destinationSlug);
  return entry ? {
    ...profile,
    operatorNotice: entry.notice,
    operatorNoticeSourceUrl: entry.sourceUrl,
    operatorNoticeReviewedAt: entry.reviewedAt,
  } : profile;
}
