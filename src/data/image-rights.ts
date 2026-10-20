export const imageRightsFor = (src: string) => src.includes("The_Lost_Maples_State_Park_-_Fall_Colors_in_Texas_")
  ? {
      license: "https://creativecommons.org/licenses/by/2.0/",
      creator: { "@type": "Person", name: "G. Lamar" },
      acquireLicensePage: "https://commons.wikimedia.org/wiki/File:The_Lost_Maples_State_Park_-_Fall_Colors_in_Texas_(29567585500).jpg",
      copyrightNotice: "© G. Lamar · photographed November 24, 2012 · CC BY 2.0; cover-cropped for presentation",
    } as const
  : src.includes("Daingerfield_sp_reflection.jpg")
  ? {
      license: "https://creativecommons.org/licenses/by/4.0/",
      creator: { "@type": "Person", name: "Larry D. Moore" },
      acquireLicensePage: "https://commons.wikimedia.org/wiki/File:Daingerfield_sp_reflection.jpg",
      copyrightNotice: "© 2014 Larry D. Moore · CC BY 4.0; cover-cropped for presentation",
    } as const
  : src.endsWith("guadalupe-river-state-park.jpg")
  ? {
      license: "https://creativecommons.org/licenses/by/4.0/",
      creator: { "@type": "Person", name: "Larry D. Moore" },
      acquireLicensePage: "https://commons.wikimedia.org/wiki/File:Guadalupe_river_state_park_bluff.jpg",
      copyrightNotice: "© 2009 Larry D. Moore",
    } as const
  : null;
