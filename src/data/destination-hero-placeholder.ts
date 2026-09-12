export const DESTINATION_PHOTO_PLACEHOLDER = "/images/texasdefined-destination-placeholder.svg";

export function isDestinationPhotoPlaceholder(src?: string) {
  if (!src) return true;
  return src.includes("texasdefined-destination-placeholder") || src.includes("texasdefined-placeholder");
}
