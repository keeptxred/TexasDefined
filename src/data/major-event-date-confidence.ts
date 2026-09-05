export const recurrenceDerivedMajorEventSlugs = new Set([
  "dallas-holiday-parade",
  "schulenburg-festival",
  "westfest",
  "luling-watermelon-thump",
  "national-polka-festival",
  "sweetwater-rattlesnake-roundup",
  "granbury-founders-day-jubilee",
  "come-and-take-it-celebration",
  "hopkins-county-stew-contest",
  "texas-state-championship-fiddlers-frolics",
]);

export function isRecurrenceDerivedMajorEventSlug(slug: string) {
  return recurrenceDerivedMajorEventSlugs.has(slug);
}
