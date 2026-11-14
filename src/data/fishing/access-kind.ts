/**
 * Classify source-reviewed water access, never by name or generic park type alone.
 * Explicit researcher-confirmed categories override incidental words in facility
 * notes (for example, "NO ramp" and a paddling-only gravel put-in).
 */
export type ReviewedFacilityKind = "public-ramp" | "marina" | "park" | "resort" | "shore" | "pier" | "kayak-launch";
export type DirectoryAccessKind = "boat-ramp" | "marina" | "shore" | "pier" | "kayak-launch";

export function classifySourceReviewedAccessKind(facility: {
  kind: ReviewedFacilityKind;
  launch: string;
}): DirectoryAccessKind {
  if (facility.kind === "marina") return "marina";
  if (facility.kind === "shore" || facility.kind === "pier" || facility.kind === "kayak-launch") return facility.kind;
  if (facility.kind === "public-ramp") return "boat-ramp";
  const words = facility.launch;
  if (/\b(?:no (?:boat )?ramp|no launch lane|not (?:an? )?(?:motorboat|boat|standard improved).*ramp|not a motorboat launch)\b/i.test(words)) return "shore";
  return /\b(?:ramps?|launch(?:es)?|boat lanes?)\b/i.test(words) ? "boat-ramp" : "shore";
}
