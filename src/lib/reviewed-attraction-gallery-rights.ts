/**
 * These are exact, independently verified Commons file descriptions, not
 * generic topic-based image grants. Keep each license paired with its source.
 */
const galleryRights = {
  "https://commons.wikimedia.org/wiki/File:Bridge_to_the_Falls.jpg": {
    creator: "Corey Leopold", license: "https://creativecommons.org/licenses/by/2.0/", licenseLabel: "CC BY 2.0",
  },
  "https://commons.wikimedia.org/wiki/File:Fort_Worth_Water_Gardens_June_2016_2_(Quiet_Pool).jpg": {
    creator: "Michael Barera", license: "https://creativecommons.org/licenses/by-sa/4.0/", licenseLabel: "CC BY-SA 4.0",
  },
  "https://commons.wikimedia.org/wiki/File:Fort_Worth_Water_Gardens_June_2016_4_(Aerated_Pool).jpg": {
    creator: "Michael Barera", license: "https://creativecommons.org/licenses/by-sa/4.0/", licenseLabel: "CC BY-SA 4.0",
  },
} as const;

export function verifiedReviewedAttractionGalleryRights(sourceUrl: string) {
  return galleryRights[sourceUrl as keyof typeof galleryRights] ?? null;
}
