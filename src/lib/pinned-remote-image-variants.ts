/**
 * Exact Wikimedia image identities with locally optimized 1200px WebP copies.
 * Only these two validated subjects may use these copies; never use a generic
 * substitute or map a filename substring to unrelated photographs.
 * Existing editorial source/creator/license attribution remains on the page.
 */
const TENTH_STREET_ORIGINAL =
  "/wikipedia/commons/4/40/Tenth_Street_Historic_District_Freedmen's_Town_TxHM_(29573143580).jpg";
const DALLAS_MUSEUM_ORIGINAL =
  "/wiki/Special:Redirect/file/Dallas_Holocaust_&_Human_Rights_Museum_Photo.png";

export const PINNED_PHOTO_PATHS = [
  "/images/editorial/optimized/freedmens-town-tenth-street-1200.webp",
  "/images/editorial/optimized/dallas-holocaust-human-rights-museum-1200.webp",
] as const;

export function pinnedRemoteImageVariant(original: URL): string | null {
  let sourcePath: string;
  try {
    sourcePath = decodeURIComponent(original.pathname);
  } catch {
    return null;
  }
  if (original.protocol !== "https:") return null;
  if (original.hostname === "upload.wikimedia.org" &&
      sourcePath === TENTH_STREET_ORIGINAL &&
      original.search === "") {
    return PINNED_PHOTO_PATHS[0];
  }
  if (original.hostname === "commons.wikimedia.org" &&
      sourcePath === DALLAS_MUSEUM_ORIGINAL &&
      (original.search === "" || /^\?width=\d{1,4}$/.test(original.search))) {
    return PINNED_PHOTO_PATHS[1];
  }
  return null;
}
