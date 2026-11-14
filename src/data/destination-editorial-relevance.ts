import type { DestinationEditorialDisplay } from "./types";

/** Answer seasonal questions only when timing actually changes this visit.
 * Accepts card-sized projections, not only the full destination record.
 */
export function showSeasonDecision(destination: { name: string; bestSeason: string; editorialDisplay?: DestinationEditorialDisplay }): boolean {
  const override = destination.editorialDisplay?.showSeason;
  if (typeof override === "boolean") return override;
  const note = destination.bestSeason.trim();
  if (!note || /^check current conditions before visiting$/i.test(note)
      || /^(?:anytime|any time|year.round|all year|open year.round)[.! ]*$/i.test(note)) return false;
  const indoor = /\b(museum|art gallery|aquarium|science center|planetarium|indoor exhibition)\b/i.test(destination.name);
  if (indoor) return /\b(seasonal|festival|holiday|special exhibition|temporary exhibit|limited dates|school break|peak crowds|outdoor\s+(?:program|area|portion|exhibit|activity))\b/i.test(note);
  return true;
}

/** Do not print an entry-planning FAQ for a generic placeholder. */
export function showAdvancePlanningDecision(destination: { entryNote: string; editorialDisplay?: DestinationEditorialDisplay }): boolean {
  const override = destination.editorialDisplay?.showEntryPlanning;
  if (typeof override === "boolean") return override;
  const note = destination.entryNote.trim();
  return note.length >= 30 && !/^confirm current hours, fees, reservations, and access with the official source/i.test(note);
}
