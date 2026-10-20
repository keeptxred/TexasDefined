/** Creative Commons provenance for the authenticated state-park photographs.
 * Keep exact source URLs and authors in structured ImageObject metadata.
 */
export const imageRightsFor = (src: string) => {
  const lost = src.includes("The_Lost_Maples_State_Park_-_Fall_Colors_in_Texas_");
  const daingerfield = src.includes("Daingerfield_sp_reflection.jpg");
  if (!lost && !daingerfield && !src.endsWith("guadalupe-river-state-park.jpg")) return null;

  const creator = lost ? "G. Lamar" : "Larry D. Moore";
  const filename = lost ? "The_Lost_Maples_State_Park_-_Fall_Colors_in_Texas_(29567585500).jpg"
    : daingerfield ? "Daingerfield_sp_reflection.jpg" : "Guadalupe_river_state_park_bluff.jpg";
  return {
    license: lost ? "https://creativecommons.org/licenses/by/2.0/" : "https://creativecommons.org/licenses/by/4.0/",
    creator: { "@type": "Person", name: creator },
    acquireLicensePage: `https://commons.wikimedia.org/wiki/File:${filename}`,
    copyrightNotice: lost ? "© 2012 G. Lamar" : daingerfield ? "© 2014 Larry D. Moore" : "© 2009 Larry D. Moore",
  } as const;
};
