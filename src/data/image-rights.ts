export const imageRightsFor = (src: string) => src.includes("/img_2330-1664867645.jpg")
  ? {
      license: "https://creativecommons.org/licenses/by/2.0/",
      creator: { "@type": "Person", name: "A Yee" },
      acquireLicensePage: "https://www.flickr.com/photos/57412095@N05/10611367506/",
      copyrightNotice: "© A Yee · 2013 · CC BY 2.0",
    } as const
  : src.endsWith("guadalupe-river-state-park.jpg")
  ? {
      license: "https://creativecommons.org/licenses/by/4.0/",
      creator: { "@type": "Person", name: "Larry D. Moore" },
      acquireLicensePage: "https://commons.wikimedia.org/wiki/File:Guadalupe_river_state_park_bluff.jpg",
      copyrightNotice: "© 2009 Larry D. Moore",
    } as const
  : null;
