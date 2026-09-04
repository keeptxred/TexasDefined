export const imageRightsFor = (src: string) => src.endsWith("guadalupe-river-state-park.jpg")
  ? { license: "https://creativecommons.org/licenses/by/4.0/" } as const
  : null;
