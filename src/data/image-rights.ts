export const imageRightsFor = (src: string) => src.endsWith("guadalupe-river-state-park.jpg")
  ? {
      license: "https://creativecommons.org/licenses/by/4.0/",
      creator: { "@type": "Person", name: "Larry D. Moore" },
      acquireLicensePage: "https://commons.wikimedia.org/wiki/File:Guadalupe_river_state_park_bluff.jpg",
      copyrightNotice: "© 2009 Larry D. Moore",
    } as const
  : null;
