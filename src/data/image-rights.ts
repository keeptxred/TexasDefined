/** Wikimedia attribution for historically verified seasonal photos and Guadalupe River. */
export const imageRightsFor = (src: string) => {
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
