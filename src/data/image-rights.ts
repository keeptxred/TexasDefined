export const imageRightsFor = (src: string) => src.includes("/Aerial_View_of_Autumn_Forest_Colors.jpg")
  ? {
      license: "https://creativecommons.org/licenses/by-sa/2.5/",
      creator: { "@type": "Person", name: "Wing-Chi Poon" },
      acquireLicensePage: "https://commons.wikimedia.org/wiki/File:Aerial_View_of_Autumn_Forest_Colors.jpg",
      copyrightNotice: "© 2005 Wing-Chi Poon · CC BY-SA 2.5 · cropped for page layout",
    } as const
  : src.endsWith("guadalupe-river-state-park.jpg")
  ? {
      license: "https://creativecommons.org/licenses/by/4.0/",
      creator: { "@type": "Person", name: "Larry D. Moore" },
      acquireLicensePage: "https://commons.wikimedia.org/wiki/File:Guadalupe_river_state_park_bluff.jpg",
      copyrightNotice: "© 2009 Larry D. Moore",
    } as const
  : null;
