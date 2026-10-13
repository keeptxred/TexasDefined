/**
 * Source-backed destination-to-specialist-guide relationships for existing,
 * fully public guide routes. Do not include staged comparison articles here.
 * Editorial links are topic-matched; a park merely being in Texas is not enough.
 */
export type SpecialistGuideDestinationLink = {
  href: string;
  label: string;
  context: string;
};
const SPECIALIST_LINKS: Record<string, SpecialistGuideDestinationLink[]> = {
  "eisenhower-state-park": [
    { href: "/texas-ohv-guide", label: "Texas OHV riding guide", context: "Check legal riding venues and Eisenhower's current OHV trail closure notice" },
  ],
  "big-bend-ranch-state-park": [
    { href: "/texas-horseback-riding-guide", label: "Texas horseback riding", context: "Backcountry permits, water, horse fitness and equestrian trail planning" },
    { href: "/texas-mountain-biking-guide", label: "Texas mountain biking", context: "Park trail access, desert conditions and riding routes" },
    { href: "/texas-stargazing-guide", label: "Texas stargazing", context: "Dark-sky designation and visitor night-sky planning" },
  ],
  "enchanted-rock-state-natural-area": [
    { href: "/texas-rock-climbing-bouldering-guide", label: "Texas climbing and bouldering", context: "Climbing stewardship, managed access and approved routes" },
    { href: "/texas-stargazing-guide", label: "Texas stargazing", context: "Night-sky access and park-specific dark-sky rules" },
  ],
  "caddo-lake-state-park": [
    { href: "/texas-paddling-guide", label: "Texas paddling guide", context: "Launch, water conditions and safe paddle-route planning" },
  ],
  "copper-breaks-state-park": [
    { href: "/texas-stargazing-guide", label: "Texas stargazing", context: "Night sky, moon phase and after-hours visitor rules" },
  ],
  "caprock-canyons-state-park": [
    { href: "/texas-stargazing-guide", label: "Texas stargazing", context: "International Dark Sky Park trip planning" },
    { href: "/texas-horseback-riding-guide", label: "Texas horseback riding", context: "Equestrian access and public park trail restrictions" },
  ],
  "south-llano-river-state-park": [
    { href: "/texas-stargazing-guide", label: "Texas stargazing", context: "International Dark Sky Park visits and dark-sky etiquette" },
  ],
  "franklin-mountains-state-park": [
    { href: "/texas-mountain-biking-guide", label: "Texas mountain biking", context: "El Paso desert biking trails and weather precautions" },
  ],
  "tyler-state-park": [
    { href: "/texas-mountain-biking-guide", label: "Texas mountain biking", context: "East Texas forest trail conditions and route selection" },
  ],
  "palo-duro-canyon-state-park": [
    { href: "/texas-horseback-riding-guide", label: "Texas horseback riding", context: "Equestrian routes and park visitor logistics" },
    { href: "/texas-mountain-biking-guide", label: "Texas mountain biking", context: "Canyon riding conditions and trails" },
  ],
  "lake-mineral-wells-state-park": [
    { href: "/texas-rock-climbing-bouldering-guide", label: "Texas climbing guide", context: "Mandatory registration and Penitentiary Hollow's no-bouldering rule" },
  ],
};
export function specialistGuidesForDestination(slug: string): SpecialistGuideDestinationLink[] {
  return SPECIALIST_LINKS[slug] ?? [];
}
