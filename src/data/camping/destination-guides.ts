export const CAMPING_DESTINATION_GUIDE_SLUGS = [
  "enchanted-rock-state-natural-area",
  "palo-duro-canyon-state-park",
  "garner-state-park",
  "mckinney-falls-state-park",
  "caddo-lake",
  "mustang-island-state-park",
  "sea-rim-state-park",
  "brazos-bend-state-park",
  "big-bend-national-park",
  "guadalupe-mountains-national-park",
  "inks-lake-state-park",
  "colorado-bend-state-park",
  "caprock-canyons-state-park",
  "dinosaur-valley-state-park",
  "pedernales-falls-state-park",
  "lake-whitney-state-park",
  "lake-tawakoni-state-park",
  "matagorda-bay-nature-park",
] as const;

export const CAMPING_DESTINATION_GUIDE_SET = new Set<string>(CAMPING_DESTINATION_GUIDE_SLUGS);

export function hasCampingDestinationGuide(slug: string) {
  return CAMPING_DESTINATION_GUIDE_SET.has(slug);
}
