/**
 * Small, destination-specific set of directly checked Viator bookable products.
 * This is NOT the broad editorial seed registry and makes no guarantee of
 * prices, departure slots, ratings or live inventory.
 *
 * Product pages reviewed 2026-10-20. Confirm product code, departure location,
 * actual included admissions and cancellation terms at the supplier checkout.
 */
export type WacoBookableExperience = {
  id: string;
  name: string;
  url: string;
  kind: "live-ghost-walk" | "self-guided-ghost-walk" | "dallas-day-trip";
  duration: string;
  shortDescription: string;
  meetingNote: string;
  criticalNote: string;
  campaign: string;
};
export const WACO_BOOKABLE_EXPERIENCES: readonly WacoBookableExperience[] = [
  {
    id: "455209P1",
    name: "Waco Ghost Tour: Wild Whispers of the Wicked",
    url: "https://www.viator.com/tours/Waco/Waco-Ghosts/d50076-455209P1",
    kind: "live-ghost-walk",
    duration: "Approximately 1 hour",
    shortDescription: "Walk Waco's historic downtown with a human guide as the group hears local legends near the Dr Pepper Museum, Hippodrome and other downtown landmarks.",
    meetingNote: "Meet the guide outside the Dr Pepper Museum at 300 S. 5th Street, Waco.",
    criticalNote: "This outdoor storytelling walk does not include admission to the Dr Pepper Museum or the other historic interiors. The guide, dates and cancellation policy are controlled by the tour operator.",
    campaign: "texasdefined-waco-ghost-guided-455209P1",
  },
  {
    id: "222222P107",
    name: "Haunted Private App-Guided Ghost Walking Tour in Waco",
    url: "https://www.viator.com/tours/Waco/Haunted-Private-App-Guided-Ghost-Walking-Tour-in-Waco/d50076-222222P107",
    kind: "self-guided-ghost-walk",
    duration: "Approximately 70–90 minutes",
    shortDescription: "Explore at your own pace with a smartphone audio/walking-tour app on an outdoor route from Magnolia Market to the Waco Suspension Bridge.",
    meetingNote: "Start the app route at Magnolia Market at the Silos, 601 Webster Avenue. No human guide meets the group.",
    criticalNote: "This is a self-guided phone experience, even though the supplier calls it a private tour; bring a charged phone and check its current download/access instructions. Museum entry is not included.",
    campaign: "texasdefined-waco-ghost-app-222222P107",
  },
  {
    id: "5555414P1",
    name: "From Dallas: Waco and Magnolia Market AdvenTOUR",
    url: "https://www.viator.com/tours/Dallas/The-Magnolia-Adventour-Waco-Highlights/d918-5555414P1",
    kind: "dallas-day-trip",
    duration: "Approximately 8 hours",
    shortDescription: "A driver-guided Dallas-to-Waco sightseeing day with Magnolia Market, the riverfront and additional Waco landmarks on the supplier's itinerary.",
    meetingNote: "Departs from DART Market Center Station Park & Ride, 2214 Wycliff Avenue, Dallas, not from Waco.",
    criticalNote: "The supplier currently lists the tour as non-refundable; verify before booking. Dr Pepper Museum admission is listed as not included, and seeing Cottonland Castle does not mean a ticketed interior Castle Tour is included.",
    campaign: "texasdefined-dallas-waco-adventour-5555414P1",
  },
] as const;

export function wacoBookableExperiencesFor(kind: "ghost" | "dallas") {
  return WACO_BOOKABLE_EXPERIENCES.filter((item) =>
    kind === "ghost" ? item.kind !== "dallas-day-trip" : item.kind === "dallas-day-trip"
  );
}
