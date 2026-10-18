/** Fully source-matched local state-park photo reuses. Do not guess a Commons
 * filename from an artist credit; new entries require the original file page,
 * matching subject, license and dimensions to be individually checked.
 */
export const verifiedStateParkPhotoCredits: Readonly<Record<string, {
  author: string;
  license: string;
  fileUrl: string;
  licenseUrl: string;
}>> = {
  // The live Explore/caverns exact-park hero wins in the current resolver.
  "/images/explore/caverns/kickapoo-cavern-state-park.jpg": {
    author: "Mark Gustafson",
    license: "CC BY-SA 4.0",
    fileUrl: "https://commons.wikimedia.org/wiki/File:Kickapoo_Cavern_State_Park,_landscape.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "/images/state-parks/kickapoo-cavern-state-park.jpg": {
    author: "Mark Gustafson",
    license: "CC BY-SA 4.0",
    fileUrl: "https://commons.wikimedia.org/wiki/File:Kickapoo_Cavern_State_Park,_landscape.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "/images/state-parks/lake-casa-blanca-international-state-park.jpg": {
    author: "Billy Hathorn",
    license: "CC BY-SA 3.0",
    fileUrl: "https://commons.wikimedia.org/wiki/File:Entrance_to_Lake_Casa_Blanca,_Laredo,_TX_IMG_2013.JPG",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
};

export function verifiedLocalParkCredit(hero: { src: string; credit?: string }) {
  const photo = verifiedStateParkPhotoCredits[hero.src];
  // If a future hero replaces the asset or attribution changes, do not attach
  // the old original-file proof to a potentially unrelated photograph.
  if (!photo || !hero.credit?.includes(photo.author) || !hero.credit.includes(photo.license)) return null;
  return {
    credit: hero.credit,
    fileUrl: photo.fileUrl,
    licenseUrl: photo.licenseUrl,
    licenseCode: photo.license,
    note: "Locally resized for display",
  };
}
