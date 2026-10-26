/**
 * These are Viator attraction *overview* URLs supplied for editorial
 * context. They are NOT product-level ticket offers. Use shared attribution
 * and clear descriptive labels, never promise entry or a guided tour.
 */
export const WACO_VIATOR_ATTRACTIONS = [
  { slug: "dr-pepper-museum-waco", name: "Dr Pepper Museum", href: "/destination/dr-pepper-museum-waco", viatorUrl: "https://www.viator.com/Waco-attractions/Dr-Pepper-Museum/d50076-a113793" },
  { slug: "cottonland-castle", name: "Cottonland Castle", href: "/destination/cottonland-castle", viatorUrl: "https://www.viator.com/Waco-attractions/Cottonland-Castle/d50076-a101062" },
  { slug: "waco-suspension-bridge", name: "Waco Suspension Bridge", href: "/destination/waco-suspension-bridge", viatorUrl: "https://www.viator.com/Waco-attractions/Waco-Suspension-Bridge/d50076-a102733" },
  { slug: "cameron-park-waco", name: "Cameron Park", href: "/destination/cameron-park-waco", viatorUrl: "https://www.viator.com/Waco-attractions/Cameron-Park/d50076-a100158" },
  { slug: "texas-ranger-hall-of-fame-museum-waco", name: "Texas Ranger Hall of Fame and Museum", href: "/destination/texas-ranger-hall-of-fame-museum-waco", viatorUrl: "https://www.viator.com/Waco-attractions/Texas-Ranger-Hall-of-Fame-and-Museum/d50076-a101949" },
  { slug: "mclane-stadium", name: "McLane Stadium", href: "/sports-venue/mclane-stadium", viatorUrl: "https://www.viator.com/Waco-attractions/McLane-Stadium/d50076-a101061" },
  { slug: "cameron-park-zoo", name: "Cameron Park Zoo", href: "/destination/cameron-park-zoo", viatorUrl: "https://www.viator.com/Waco-attractions/Cameron-Park-Zoo/d50076-a100862" },
] as const;

export function wacoViatorAttractionForSlug(slug: string) {
  return WACO_VIATOR_ATTRACTIONS.find((entry) => entry.slug === slug);
}
