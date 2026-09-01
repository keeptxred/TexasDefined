export type AquariumMarineCountyLink = {
  slug: string;
  name: string;
};

const aquariumMarineCountyLinks: Record<string, AquariumMarineCountyLink[]> = {
  bexar: [
    { slug: "sea-life-san-antonio-aquarium", name: "SEA LIFE San Antonio Aquarium" },
    { slug: "san-antonio-aquarium", name: "San Antonio Aquarium" },
    { slug: "san-antonio-zoo", name: "San Antonio Zoo" },
  ],
  brazoria: [
    { slug: "sea-center-texas", name: "Sea Center Texas" },
  ],
  cameron: [
    { slug: "sea-turtle-inc", name: "Sea Turtle, Inc." },
  ],
  dallas: [
    { slug: "dallas-world-aquarium", name: "The Dallas World Aquarium" },
    { slug: "childrens-aquarium-dallas-fair-park", name: "Children's Aquarium Dallas at Fair Park" },
  ],
  galveston: [
    { slug: "moody-gardens", name: "Moody Gardens" },
  ],
  harris: [
    { slug: "downtown-aquarium-houston", name: "Downtown Aquarium Houston" },
    { slug: "houston-interactive-aquarium-animal-preserve", name: "Houston Interactive Aquarium & Animal Preserve" },
    { slug: "houston-zoo", name: "Houston Zoo" },
  ],
  lubbock: [
    { slug: "science-spectrum-museum-aquarium", name: "Science Spectrum Museum & Aquarium" },
  ],
  nueces: [
    { slug: "texas-state-aquarium", name: "Texas State Aquarium" },
    { slug: "ut-marine-science-institute-patton-center", name: "UT Marine Science Institute Patton Center" },
  ],
  tarrant: [
    { slug: "sea-life-grapevine-aquarium", name: "SEA LIFE Grapevine Aquarium" },
    { slug: "fort-worth-zoo", name: "Fort Worth Zoo" },
  ],
  williamson: [
    { slug: "austin-aquarium", name: "Austin Aquarium" },
  ],
};

export function aquariumMarineLinksForCounty(countySlug: string): AquariumMarineCountyLink[] {
  return aquariumMarineCountyLinks[countySlug.trim().toLowerCase()] ?? [];
}
