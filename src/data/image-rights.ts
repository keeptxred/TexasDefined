/** Rights data is pinned to the *exact* source image, never inferred from a topic or publisher.
 * All five CC BY-SA photographs have individual Wikimedia Commons file records.
 * The Ray Roberts local image is the USACE public-domain work documented in
 * src/data/fishing/lake-photo-governance.ts and on its Wikimedia file page.
 */
const COMMONS_CC_BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const commonsRights = [
  { file: "Celina_High_School,_Friday_Night_Football.jpg", creator: "Heidi Knapp" },
  { file: "Bart_Coan_Field_from_west.jpg", creator: "Fortguy" },
  { file: "Panna_Maria_(1_of_1).jpg", creator: "Renelibrary" },
  { file: "Houston_texas_usa_skyline.jpg", creator: "Leeannoneal" },
  { file: "South_Padre_Island_beach_panorama.jpg", creator: "Spheroidite" },
] as const;

function decodedImageSource(src: string): string {
  // The delivery proxy /remote?url=... and Wikimedia redirects may encode
  // filenames once or twice (%252C, %2528, etc). Decode without inventing a URL.
  let value = src;
  for (let i = 0; i < 3; i += 1) {
    try {
      const next = decodeURIComponent(value);
      if (next === value) break;
      value = next;
    } catch {
      break;
    }
  }
  return value;
}

/** Wikimedia attribution for historically verified seasonal photos and Guadalupe River. */
export const imageRightsFor = (src: string) => {
  const source = decodedImageSource(src);
  // Do not reuse Commons ownership or rights for an unrelated similarly named
  // local image. Both the source host and original Commons filename must match.
  if (/\b(?:upload|thumb|commons)\.wikimedia\.org\b/i.test(source)) {
    const photoRights = commonsRights.find(({ file }) => source.includes(file));
    if (photoRights) {
      return {
        license: COMMONS_CC_BY_SA_4,
        creator: { "@type": "Person", name: photoRights.creator },
        acquireLicensePage: `https://commons.wikimedia.org/wiki/File:${photoRights.file}`,
        copyrightNotice: `© ${photoRights.creator}`,
      } as const;
    }
  }

  // Exact, source-authenticated Commons photo used on the Blue Bell history article.
  // Its 2008 copyright, photographer, and CC BY 4.0 license are verified on
  // https://commons.wikimedia.org/wiki/File:Modern_Blue_Bell_Creameries_factory_located_in_Brenham,_Texas.jpg
  // A new image must never inherit this photograph's rights from an article slug.
  const blueBellFile = "Modern_Blue_Bell_Creameries_factory_located_in_Brenham,_Texas.jpg";
  let original = source;
  for (let i = 0; i < 3; i += 1) {
    let parsed: URL;
    try { parsed = new URL(original, "https://texasdefined.com"); }
    catch { break; }
    if (parsed.hostname === "commons.wikimedia.org") {
      // The precise Britten USA photograph used on the unusual-businesses guide.
      // Commons File:Britten_USA.jpg credits Dustin Moore, Flickr-confirmed
      // CC BY 2.0 (https://commons.wikimedia.org/wiki/File:Britten_USA.jpg).
      // Never attach these rights to other photos, even from the same creator.
      if (decodeURIComponent(parsed.pathname) === "/wiki/Special:Redirect/file/Britten USA.jpg") {
        return {
          license: "https://creativecommons.org/licenses/by/2.0/",
          creator: { "@type": "Person", name: "Dustin Moore" },
          copyrightNotice: "© Dustin Moore",
          acquireLicensePage: "https://commons.wikimedia.org/wiki/File:Britten_USA.jpg",
        } as const;
      }
      if (parsed.pathname === `/wiki/Special:Redirect/file/${blueBellFile}`) {
        return {
          license: "https://creativecommons.org/licenses/by/4.0/",
          creator: { "@type": "Person", name: "Larry D. Moore" },
          copyrightNotice: "© 2008 Larry D. Moore",
          acquireLicensePage: `https://commons.wikimedia.org/wiki/File:${blueBellFile}`,
        } as const;
      }
      break;
    }
    if (parsed.hostname !== "texasdefined.com" || !/^\/(?:media\/)?remote$/.test(parsed.pathname)) break;
    const nested = parsed.searchParams.get("url");
    if (!nested) break;
    original = nested;
  }

  // The image is a federal work in the public domain, not a Texas Defined
  // copyrighted photograph. The copyrightNotice accurately states this status.
  // Source record: https://commons.wikimedia.org/wiki/File:USACE_Ray_Roberts_Lake_and_Dam.jpg
  const rayRobertsPath = "/images/explore/lakes-rivers/ray-roberts-lake-isle-du-bois-unit.jpg";
  if (source === rayRobertsPath || source === `https://texasdefined.com${rayRobertsPath}`) {
    const filePage = "https://commons.wikimedia.org/wiki/File:USACE_Ray_Roberts_Lake_and_Dam.jpg";
    return {
      license: filePage,
      creator: { "@type": "Organization", name: "U.S. Army Corps of Engineers" },
      acquireLicensePage: filePage,
      copyrightNotice: "Public domain — official U.S. Army Corps of Engineers federal government work; no copyright claim",
    } as const;
  }

  const photo = src.includes("29567585500") ? 1
    : src.includes("Daingerfield_sp_reflection") ? 2
    : src.endsWith("guadalupe-river-state-park.jpg") ? 3 : 0;
  if (!photo) return null;
  const name = photo === 1 ? "G. Lamar" : "Larry D. Moore";
  // Article images may be proxied as /remote?url=... after hydration.
  // Resolve the original Commons file identity, never a proxy path or query.
  const filename = photo === 1
    ? "The_Lost_Maples_State_Park_-_Fall_Colors_in_Texas_(29567585500).jpg"
    : photo === 2
      ? "Daingerfield_sp_reflection.jpg"
      : "Guadalupe_river_state_park_bluff.jpg";
  return {
    license: `https://creativecommons.org/licenses/by/${photo === 1 ? 2 : 4}.0/`,
    creator: { "@type": "Person", name },
    acquireLicensePage: `https://commons.wikimedia.org/wiki/File:${filename}`,
    copyrightNotice: `© ${photo === 1 ? 2012 : photo === 2 ? 2014 : 2009} ${name}`,
  } as const;
};
